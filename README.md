
# 🌾 Annapurna Shield - Smart Agriculture Monitoring & Hindi Voice Assistant

## 🚀 Overview
**Annapurna Shield** is a smart agriculture and post-harvest grain management system powered by **IoT sensors**, **AI-based spoilage prediction**, and a **real-time Hindi-speaking voice assistant**. Built for Indian farmers, it enables proactive monitoring of storage conditions and provides actionable recommendations to reduce spoilage, optimize crop planning, and utilize agricultural waste effectively.

---

## 🔧 Key Features

- 📡 **Real-Time IoT Monitoring**: Tracks **soil moisture**, **humidity**, and **temperature** from inside grain storage.
- 📈 **AI Spoilage Prediction**: Uses time-series forecasting to predict spoilage before it occurs.
- 🗣️ **Hindi Voice Assistant** (via VAPI): Handles user queries in Hindi about crops, storage, irrigation, price, and dashboard usage.
- 📊 **Farmer Dashboard**:
  - Crop protection and weekly suggestions
  - Price prediction based on location and yield
  - Waste analysis with management tips
  - Micro loan recommendations
- ♻️ **Waste Reuse Guidance**: Suggests composting, mulching, or biogas applications based on spoilage level.
- 🌐 **Bilingual Interface**: Available in both **English and Hindi**.

---

## ❓ Problem Statement

> Post-harvest grain losses in India account for **thousands of crores** annually due to undetected moisture and temperature rise in silos. Manual checks are reactive and inefficient.  
> **Annapurna Shield** transforms grain storage into a **proactive**, **AI-driven**, and **farmer-friendly** process.

---

## ⚙️ Tech Stack

### 💡 Hardware
- **ESP32** (controller)
- **JXBS-3001-TR** sensor for grain core conditions
- **DHT22** for ambient air
- **Capacitive Moisture Sensor** for validation
- **MAX485** for RS485 communication
- **SSD1306 OLED** display

### 💻 Software & AI
- **Arduino (C++)** for embedded firmware
- **Python** for data prediction
- **FastAPI** for backend
- **ThingSpeak** for sensor data visualization
- **VAPI.ai + Gemini** for the Hindi voice interface

---

## 🧠 Voice Assistant Capabilities

Your Hindi voice agent can:

- Answer agriculture questions related to:
  - Storage, harvesting, pest control, crop rotation
  - How to use the Annapurna Shield dashboard
  - Price predictions, spoilage interpretation, loan suggestions
- Guide users through:
  - फसल चयन, सुरक्षा सुझाव, सिंचाई योजना, मूल्य पूर्वानुमान
  - स्थान आधारित सिफारिशें और अपशिष्ट प्रबंधन
- Refuse off-topic questions politely (e.g., politics, jokes, weather)

---

## 🖼️ UI Preview

> *(Insert screenshots here with correct file/image links)*

- **Protection Suggestions & Advisory**  
  ![Crop UI](link-to-image)

- **Location + Price Prediction**  
  ![Location UI](link-to-image)

- **Waste & Loan Suggestions**  
  ![Waste UI](link-to-image)

- **Real-time Monitoring Dashboard**  
  ![Dashboard UI](link-to-image)

---

## 📌 How It Works

1. 📥 Sensors collect environmental data
2. 📊 AI model predicts spoilage in advance
3. 📞 Farmer uses dashboard or voice call (Hindi)
4. 🧾 Assistant gives prevention steps or reuse options
5. 🔄 Dashboard updates with live recommendations

---

## 🧪 Getting Started

```bash
# Backend
cd backend
pip install -r requirements.txt
uvicorn main:app --reload

# Hardware (ESP32)
Upload firmware using Arduino IDE

# Frontend
cd frontend
npm install
npm run dev

# Voice Agent
Configure in VAPI using the system prompt (Hindi version in /agent-config)
```

---

## 👨‍🌾 Team Members

**Team: DEBUGGERS**

- **Srinjoy Pramanik** – Backend & Integration  
- **Rudrasish Dutta** – Machine Learning, Hardware & AI Forecasting  
- **Syed Md Musharraf** – Grain Storage & Waste Strategy  
- **Subhabilash Das** – Voice Assistant Design & Dashboard UI  

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).
