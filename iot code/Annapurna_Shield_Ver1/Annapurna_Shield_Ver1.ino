/*********************************************************************************
 * Annapurna Shield - Final Firmware with Cloud Connectivity
 *
 * This code reads sensor data, displays it locally on an OLED with an
 * improved, larger font, and pushes it to ThingSpeak using a direct
 * HTTPS GET request.
 *
 * FINAL WIRING DIAGRAM:
 *
 * -- JXBS-3001-TR Sensor (via MAX485 on Serial2) --
 * ESP32 Pin D17 (TX2)    -> MAX485 DI (Driver Input)
 * ESP32 Pin D16 (RX2)    -> MAX485 RO (Receiver Output)
 * ESP32 Pin D15 (GPIO15) -> MAX485 DE & RE (Jumpered Together)
 *
 * -- DHT22 Sensor --
 * ESP32 Pin D23 (GPIO23) -> DHT22 Data Pin
 *
 * -- OLED Display (I2C) --
 * ESP32 Pin D21 (SDA)    -> OLED SDA
 * ESP32 Pin D22 (SCL)    -> OLED SCL
 *
 *********************************************************************************/

// --- LIBRARIES ---
#include <WiFi.h>               // For WiFi connectivity
#include <WiFiClientSecure.h>   // For HTTPS communication
#include <Wire.h>               // For I2C communication (OLED)
#include <Adafruit_GFX.h>       // Core graphics library for OLED
#include <Adafruit_SSD1306.h>   // Hardware-specific library for OLED
#include <DHT.h>                // For the DHT22 sensor
#include <ModbusMaster.h>       // For RS485 communication

// --- WiFi & ThingSpeak Configuration ---
const char* ssid = "OPPO Reno8 5G";
const char* password = "subhabilash";
const char* myWriteAPIKey = "I6UE7PAE4YMKVM3A";
const char* host = "api.thingspeak.com";
const int httpsPort = 443;
unsigned long myChannelNumber = 0; // IMPORTANT: REPLACE 0 WITH YOUR CHANNEL ID

// --- PIN DEFINITIONS ---
#define RS485_TX_PIN 17
#define RS485_RX_PIN 16
#define RS485_CTRL_PIN 15
#define DHT_PIN 23
#define DHT_TYPE DHT22
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64

// --- OBJECT INITIALIZATION ---
DHT dht(DHT_PIN, DHT_TYPE);
Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, -1);
ModbusMaster node;

// --- Global variables for sensor readings ---
float grainTemp = 0.0;
float grainMoisture = 0.0;
float airHumidity = 0.0;

// --- FUNCTION PROTOTYPES ---
void setup_wifi();
void sendToCloud();
void preTransmission();
void postTransmission();

void setup() {
  Serial.begin(115200);
  Serial.println("--- Annapurna Shield Initializing ---");

  // Initialize hardware
  dht.begin();
  if (!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
    for (;;);
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0, 0);
  display.println("Annapurna Shield");
  display.println("Initializing...");
  display.display();
  delay(2000);
  
  pinMode(RS485_CTRL_PIN, OUTPUT);
  digitalWrite(RS485_CTRL_PIN, LOW);
  Serial2.begin(9600, SERIAL_8N1, RS485_RX_PIN, RS485_TX_PIN);
  node.begin(1, Serial2);
  node.preTransmission(preTransmission);
  node.postTransmission(postTransmission);

  // Connect to WiFi
  setup_wifi();

  Serial.println("Initialization Complete. Starting measurements.");
}

void loop() {
  // --- 1. READ SENSORS ---

  // Read from JXBS-3001-TR
  uint8_t result = node.readHoldingRegisters(0x0012, 2); 
  if (result == node.ku8MBSuccess) {
    grainMoisture = node.getResponseBuffer(0) / 10.0;
    grainTemp = node.getResponseBuffer(1) / 10.0;
  } else {
    Serial.println("Failed to read from JXBS-3001-TR sensor!");
  }

  // Read from DHT22
  airHumidity = dht.readHumidity();
  if (isnan(airHumidity)) {
    Serial.println("Failed to read from DHT sensor!");
    airHumidity = 0.0;
  }

  // --- 2. DISPLAY DATA ON SERIAL MONITOR ---
  Serial.println("--------------------------");
  Serial.print("Grain Temp:  "); Serial.print(grainTemp, 1); Serial.println(" *C");
  Serial.print("Grain Moist: "); Serial.print(grainMoisture, 1); Serial.println(" %");
  Serial.print("Air Humidity:"); Serial.print(airHumidity, 1); Serial.println(" %");

  // --- 3. DISPLAY DATA ON OLED SCREEN WITH LARGER FONT ---
  display.clearDisplay();
  display.setTextColor(SSD1306_WHITE);
  
  // Use a larger font size (2) for better visibility
  display.setTextSize(2);
  
  // Set cursor position and print each value on a new line.
  // We use short labels (T, M, H) to fit the values on the screen.
  // The %c prints the degree symbol (ASCII 247)
  display.setCursor(0, 0);
  display.printf("T: %.1f%cC", grainTemp, (char)247);
  
  display.setCursor(0, 22);
  display.printf("M: %.1f %%", grainMoisture);
  
  display.setCursor(0, 44);
  display.printf("H: %.1f %%", airHumidity);
  
  display.display();


  // --- 4. SEND DATA TO THINGSPEAK ---
  sendToCloud();
  
  // Wait 20 seconds before the next cycle to respect ThingSpeak's free plan limit
  delay(20000);
}

// --- HELPER FUNCTIONS ---

void sendToCloud() {
  if (WiFi.status() == WL_CONNECTED) {
    WiFiClientSecure client;
    client.setInsecure(); // Skip certificate validation

    if (!client.connect(host, httpsPort)) {
      Serial.println("Connection to ThingSpeak failed!");
      return;
    }
    
    // Construct the URL with sensor data
    String url = "/update?api_key=" + String(myWriteAPIKey);
    url += "&field1=" + String(grainMoisture, 1);
    url += "&field2=" + String(grainTemp, 1);
    url += "&field3=" + String(airHumidity, 1);

    // Send the GET request
    client.print(String("GET ") + url + " HTTP/1.1\r\n" +
                 "Host: " + host + "\r\n" +
                 "Connection: close\r\n\r\n");

    // Wait for a response, with a timeout
    unsigned long timeout = millis();
    while (client.available() == 0) {
      if (millis() - timeout > 5000) {
        Serial.println(">>> ThingSpeak Response Timeout!");
        client.stop();
        return;
      }
    }
    
    Serial.println("ThingSpeak update sent.");
    // You can optionally read the response from the client here
    client.stop();
  } else {
    Serial.println("WiFi Disconnected. Cannot send to cloud.");
  }
}

void setup_wifi() {
  delay(10);
  Serial.println();
  Serial.print("Connecting to ");
  Serial.println(ssid);
  display.clearDisplay();
  display.setCursor(0,0);
  display.println("Connecting to WiFi...");
  display.display();

  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }
  Serial.println("\nWiFi connected");
  display.println("WiFi Connected!");
  display.display();
  delay(1000);
}

void preTransmission() {
  digitalWrite(RS485_CTRL_PIN, HIGH);
}

void postTransmission() {
  digitalWrite(RS485_CTRL_PIN, LOW);
}
