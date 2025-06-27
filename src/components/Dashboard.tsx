import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Loader } from '@/components/ui/loader';
import CallSection from '@/components/CallSection';
import MessageSection from '@/components/MessageSection';
import { Wifi, WifiOff, Thermometer, Droplets, MapPin, Zap, DollarSign, TrendingUp } from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

// ThingSpeak configuration
const channelId = "2998470";
const apiKey = "5DZHDT3SGKHE5BKN";
const thingSpeakUrl = `https://api.thingspeak.com/channels/${channelId}/feeds/last.json?api_key=${apiKey}`;
const analysisApiUrl = "https://rudra2003-live-recommend.hf.space/analyze";
const sevenDaysApiUrl = "https://rudra2003-seven-days-recommend.hf.space/predict";
const wasteApiUrl = "https://rudra2003-waste.hf.space/calculate-waste";
const googleMapsApiKey = "YOUR_GOOGLE_MAPS_API_KEY"; // Replace with actual Google Maps API key
const geminiApiKey = "AIzaSyDrPnuKNCWqY7n2HqDVlyl8B-JQNitiod0";

const Dashboard = () => {
  const { t } = useLanguage();
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [selectedCrop, setSelectedCrop] = useState('');
  const [yieldAmount, setYieldAmount] = useState('');
  const [yieldUnit, setYieldUnit] = useState('kg');
  const [location, setLocation] = useState({ lat: '', lng: '', state: '' });
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [isLoadingPredictions, setIsLoadingPredictions] = useState(false);
  const [showSensorData, setShowSensorData] = useState(false);
  const [sensorData, setSensorData] = useState({
    temperature: null,
    humidity: null,
    soilMoisture: null
  });
  const [apiSuggestions, setApiSuggestions] = useState([]);
  const [sevenDaysSuggestions, setSevenDaysSuggestions] = useState([]);
  const [pricePrediction, setPricePrediction] = useState<string | null>(null);
  const [wasteData, setWasteData] = useState({
    wasted_tons: 0,
    spoilage_percent: 0,
    recommended_pathway: ''
  });

  // Predictions object defined before use
  const predictions = {
    currentSuggestions: [
      "Apply organic compost to improve soil structure - मिट्टी की संरचना सुधारने के लिए जैविक खाद डालें",
      "Monitor for early signs of pest infestation - कीट संक्रमण के प्रारंभिक संकेतों की निगरानी करें",
      "Ensure adequate water drainage - पानी की उचित निकासी सुनिश्चित करें"
    ],
    weeklySuggestions: [],
    predictedPrice: pricePrediction || "₹45,000 per ton",
    wasteCalculation: `${wasteData.wasted_tons} tons (${wasteData.spoilage_percent}%)`,
    wasteManagement: [
      `Recommended pathway: ${wasteData.recommended_pathway}`,
      "Compost organic waste for soil enrichment - मिट्टी समृद्धि के लिए जैविक कचरे को खाद बनाएं",
      "Use crop residue for mulching - गीली घास के लिए फसल अवशेष का उपयोग करें",
      "Partner with local biogas plants - स्थानीय बायोगैस प्लांटों के साथ साझेदारी करें"
    ],
    loanSuggestions: [
      {
        bankName: "State Bank of India - भारतीय स्टेट बैंक",
        loanAmount: "₹2,50,000",
        approval: "85%",
        link: "https://sbi.co.in/agriculture-loan"
      },
      {
        bankName: "HDFC Bank - HDFC बैंक",
        loanAmount: "₹3,00,000",
        approval: "75%",
        link: "https://hdfc.com/agriculture"
      }
    ]
  };

  const getStateFromGoogle = async (lat, lon) => {
    try {
      const response = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${googleMapsApiKey}`);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      const components = data.results[0].address_components;
      const stateObj = components.find(c => c.types.includes("administrative_area_level_1"));
      const state = stateObj ? stateObj.long_name : null;
      console.log("State:", state);
      return state;
    } catch (err) {
      console.error("Error fetching state:", err);
      return null;
    }
  };

  const fetchCropPrice = async (crop, state) => {
    try {
     const prompt = `Roughly estimate the current market price per ton (in INR) for ${crop} in ${state}, India. 
Just give an approximate numeric value like "48000". No explanation or extra text—only the number.`;



      const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${geminiApiKey}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: prompt }] }]
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data);

      let priceText = data.candidates?.[0]?.content?.parts?.[0]?.text || 
                      data.candidates?.[0]?.output || 
                      '';

      console.log("Extracted Price Text:", priceText);

      priceText = priceText.trim()
        .replace(/[^\d.-]/g, '')
        .replace(/^0+(\d)/, '$1');

      const price = parseFloat(priceText);

      if (isNaN(price) || price <= 0) {
        throw new Error("Invalid price format or non-positive value");
      }

      console.log(`Predicted price for ${crop} in ${state}: ₹${price} per ton`);
      return price;
    } catch (err) {
      console.error("Error fetching crop price:", err.message, err.stack);
      return 45000; // Fallback price
    }
  };

  const fetchWasteCalculation = async (crop, totalProductionTons) => {
    try {
      const response = await fetch(wasteApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop,
          total_production_tons: totalProductionTons
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Waste Calculation Response:", data);
      return data;
    } catch (err) {
      console.error("Error fetching waste calculation:", err);
      return {
        wasted_tons: 0,
        spoilage_percent: 0,
        recommended_pathway: 'retain'
      };
    }
  };

  const fetchAnalysis = async (crop, temp, humidity, moisture) => {
    try {
      const response = await fetch(analysisApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop,
          temp,
          humidity,
          moisture
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Analysis API Response:", data);
      return data.message;
    } catch (err) {
      console.error("Error fetching analysis:", err);
      return null;
    }
  };

  const fetchSevenDaysPrediction = async (crop, temperature, humidity) => {
    try {
      const response = await fetch(sevenDaysApiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          crop,
          temperature,
          humidity
        })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Seven Days Prediction API Response:", data);
      return data.recommendation;
    } catch (err) {
      console.error("Error fetching seven days prediction:", err);
      return null;
    }
  };

  const handleConnect = () => {
    if (isConnected) {
      setIsConnected(false);
      setShowSensorData(false);
      setSensorData({ temperature: null, humidity: null, soilMoisture: null });
      setApiSuggestions([]);
      setSevenDaysSuggestions([]);
    } else {
      setIsConnecting(true);
      fetch(thingSpeakUrl)
        .then(response => {
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          return response.json();
        })
        .then(async (data) => {
          console.log("Latest Feed Data:");
          console.log(`Created at: ${data.created_at}`);
          console.log(`Entry ID: ${data.entry_id}`);
          console.log(`Grain's Moisture (field1): ${data.field1}`);
          console.log(`Grain's Temp (field2): ${data.field2}`);
          console.log(`Air Humidity (field3): ${data.field3}`);

          const newSensorData = {
            temperature: parseFloat(data.field2) || null,
            humidity: parseFloat(data.field3) || null,
            soilMoisture: parseFloat(data.field1) || null
          };

          setSensorData(newSensorData);

          if (selectedCrop) {
            const analysisMessage = await fetchAnalysis(
              selectedCrop.split(' - ')[0],
              newSensorData.temperature,
              newSensorData.humidity,
              newSensorData.soilMoisture
            );
            if (analysisMessage) {
              setApiSuggestions([analysisMessage]);
            }

            const sevenDaysMessage = await fetchSevenDaysPrediction(
              selectedCrop.split(' - ')[0],
              newSensorData.temperature,
              newSensorData.humidity
            );
            if (sevenDaysMessage) {
              setSevenDaysSuggestions([sevenDaysMessage]);
            }
          }

          setIsConnected(true);
          setIsConnecting(false);

          setTimeout(() => {
            setShowSensorData(true);
          }, 1000);
        })
        .catch(err => {
          console.error("Error fetching data:", err);
          setIsConnecting(false);
          setSensorData({ temperature: null, humidity: null, soilMoisture: null });
          setApiSuggestions([]);
          setSevenDaysSuggestions([]);
        });
    }
  };

  const handleLocationRequest = () => {
    setIsLoadingLocation(true);
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const lat = position.coords.latitude.toFixed(6);
          const lng = position.coords.longitude.toFixed(6);
          const state = await getStateFromGoogle(lat, lng);
          setLocation({
            lat,
            lng,
            state: state || 'Unknown'
          });
          setIsLoadingLocation(false);
        },
        (error) => {
          console.error('Error getting location:', error);
          setIsLoadingLocation(false);
        }
      );
    }
  };

  const handleSendSuggestions = (method: 'call' | 'message') => {
    const suggestions = `
Annapurna Shield Recommendations - अन्नपूर्णा शील्ड सुझाव:

Current Protection: ${apiSuggestions.length > 0 ? apiSuggestions.join('; ') : predictions.currentSuggestions.join('; ')}
Weekly Protection: ${sevenDaysSuggestions.length > 0 ? sevenDaysSuggestions.join('; ') : predictions.weeklySuggestions.join('; ')}
Predicted Price: ${pricePrediction || predictions.predictedPrice}
Waste: ${wasteData.wasted_tons} tons (${wasteData.spoilage_percent}%)
Location: ${location.state} (${location.lat}, ${location.lng})
    `.trim();

    if (method === 'call') {
      window.open(`tel:+919876543210`);
    } else {
      window.open(`sms:+919876543210?body=${encodeURIComponent(suggestions)}`);
    }
  };

  const crops = [
    'wheat - गेहूं',
    'rice - चावल',
    'maize - मक्का',
    'barley - जौ',
    'sorghum - ज्वार',
    'oats - जई'
  ];

  // Calculate price and waste when crop, yield, and location are available
  useEffect(() => {
    if (selectedCrop && yieldAmount && location.state) {
      setIsLoadingPredictions(true);
      const totalProductionTons = yieldUnit === 'kg' ? parseFloat(yieldAmount) / 1000 : parseFloat(yieldAmount);
      
      Promise.all([
        fetchCropPrice(selectedCrop.split(' - ')[0], location.state),
        fetchWasteCalculation(selectedCrop.split(' - ')[0], totalProductionTons)
      ]).then(([price, waste]) => {
        setPricePrediction(`₹${price.toLocaleString('en-IN')} per ton`);
        setWasteData(waste);
        
        const effectiveYieldTons = totalProductionTons - waste.wasted_tons;
        const totalValue = effectiveYieldTons * price;
        console.log(`Effective yield after waste: ${effectiveYieldTons.toFixed(2)} tons`);
        console.log(`Total crop value: ₹${totalValue.toLocaleString('en-IN')}`);
        
        setIsLoadingPredictions(false);
      }).catch(err => {
        console.error("Error in predictions:", err);
        setPricePrediction(predictions.predictedPrice);
        setIsLoadingPredictions(false);
      });
    }
  }, [selectedCrop, yieldAmount, yieldUnit, location.state]);

  // Fetch analysis and seven days prediction when crop changes while connected
  useEffect(() => {
    if (isConnected && selectedCrop && sensorData.temperature !== null) {
      fetchAnalysis(
        selectedCrop.split(' - ')[0],
        sensorData.temperature,
        sensorData.humidity,
        sensorData.soilMoisture
      ).then(analysisMessage => {
        if (analysisMessage) {
          setApiSuggestions([analysisMessage]);
        }
      });

      fetchSevenDaysPrediction(
        selectedCrop.split(' - ')[0],
        sensorData.temperature,
        sensorData.humidity
      ).then(sevenDaysMessage => {
        if (sevenDaysMessage) {
          setSevenDaysSuggestions([sevenDaysMessage]);
        }
      });
    }
  }, [selectedCrop]);

  return (
    <section id="dashboard" className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Header */}
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-green-800 mb-2">
            Annapurna Shield Dashboard
          </h2>
          <h3 className="text-2xl md:text-3xl font-semibold text-blue-700 mb-4">
            {t('annapurnaShield')} {t('dashboard')}
          </h3>
          <p className="text-green-600 text-lg">Smart Agriculture Monitoring & Management</p>
          <div className="mt-4 bg-gradient-to-r from-orange-100 to-yellow-100 rounded-full px-6 py-2 inline-block">
            <span className="text-orange-700 font-semibold">🌾 Digital Partner for Indian Farmers</span>
          </div>
        </div>

        {/* Hardware Connection */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-blue-50">
          <CardHeader>
            <CardTitle className="flex items-center gap-2 text-green-800">
              {isConnected ? <Wifi className="w-5 h-5" /> : <WifiOff className="w-5 h-5" />}
              <div>
                <span className="text-orange-600 text-sm block">Hardware Connection</span>
                <span>{t('hardwareConnection')}</span>
              </div>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button 
              onClick={handleConnect}
              disabled={isConnecting}
              className={`w-full text-lg py-6 ${isConnected ? 'bg-red-600 hover:bg-red-700' : 'bg-green-600 hover:bg-green-700'}`}
            >
              {isConnecting ? (
                <>
                  <Loader size="sm" className="mr-2" />
                  Connecting Hardware...
                </>
              ) : isConnected ? (
                '🔌 Disconnect Hardware'
              ) : (
                '🔗 Connect Hardware'
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Real-time Sensor Data */}
        {isConnected && (
          <div className="grid md:grid-cols-3 gap-4">
            <Card className="border-orange-200 bg-gradient-to-br from-orange-50 to-red-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-orange-800">
                  <Thermometer className="w-5 h-5" />
                  <div>
                    <span className="text-sm text-orange-600 block">Soil Temperature</span>
                    <span>{t('soilTemperature')}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showSensorData ? (
                  <div className="space-y-4">
                    <Loader className="my-8" />
                    <p className="text-center text-gray-600">Loading sensor data...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-orange-600 mb-2">
                      {sensorData.temperature !== null ? `${sensorData.temperature}°C` : 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Live Data</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-cyan-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-blue-800">
                  <Droplets className="w-5 h-5" />
                  <div>
                    <span className="text-sm text-blue-600 block">Soil Humidity</span>
                    <span>{t('humidityAnalysis')}</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showSensorData ? (
                  <div className="space-y-4">
                    <Loader className="my-8" />
                    <p className="text-center text-gray-600">Loading sensor data...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-blue-600 mb-2">
                      {sensorData.humidity !== null ? `${sensorData.humidity}%` : 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Live Data</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>

            <Card className="border-teal-200 bg-gradient-to-br from-teal-50 to-green-50">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-teal-800">
                  <Zap className="w-5 h-5" />
                  <div>
                    <span className="text-sm text-teal-600 block">मिट्टी की नमी</span>
                    <span>Soil Moisture Analysis</span>
                  </div>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {!showSensorData ? (
                  <div className="space-y-4">
                    <Loader className="my-8" />
                    <p className="text-center text-gray-600">Loading sensor data...</p>
                  </div>
                ) : (
                  <>
                    <div className="text-3xl font-bold text-teal-600 mb-2">
                      {sensorData.soilMoisture !== null ? `${sensorData.soilMoisture}%` : 'N/A'}
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 bg-teal-500 rounded-full animate-pulse"></div>
                      <span className="text-sm text-gray-600">Live Data</span>
                    </div>
                  </>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Crop Selection */}
        <Card className="border-green-200 bg-gradient-to-r from-green-50 to-yellow-50">
          <CardHeader>
            <CardTitle className="text-green-800">
              <span className="text-orange-600 text-sm block">फसल चयन</span>
              <span>Crop Selection</span>
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Select value={selectedCrop} onValueChange={setSelectedCrop}>
              <SelectTrigger className="text-lg py-6">
                <SelectValue placeholder="अपनी फसल चुनें - Select your crop" />
              </SelectTrigger>
              <SelectContent>
                {crops.map((crop) => (
                  <SelectItem key={crop} value={crop.toLowerCase()}>
                    {crop}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </CardContent>
        </Card>

        {/* Crop Protection Suggestions */}
        {selectedCrop && (
          <div className="grid md:grid-cols-2 gap-4">
            <Card className="border-green-200 bg-gradient-to-br from-green-50 to-emerald-50">
              <CardHeader>
                <CardTitle className="text-green-800">
                  <span className="text-orange-600 text-sm block">वर्तमान सुरक्षा सुझाव</span>
                  <span>Current Protection Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingSuggestions ? (
                  <div className="space-y-4">
                    <Loader className="my-8" />
                    <p className="text-center text-gray-600">सुझाव लोड हो रहे हैं...</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {apiSuggestions.length > 0 ? (
                      apiSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-3 h-3 rounded-full bg-green-500 mt-2 flex-shrink-0 animate-pulse"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                        </li>
                      ))
                    ) : (
                      predictions.currentSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-3 h-3 rounded-full bg-green-500 mt-2 flex-shrink-0 animate-pulse"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </CardContent>
            </Card>

            <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-indigo-50">
              <CardHeader>
                <CardTitle className="text-blue-800">
                  <span className="text-orange-600 text-sm block">अगले 7 दिन के सुझाव</span>
                  <span>Next 7 Days Suggestions</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {isLoadingSuggestions ? (
                  <div className="space-y-4">
                    <Loader className="my-8" />
                    <p className="text-center text-gray-600">साप्ताहिक योजना तैयार की जा रही है...</p>
                  </div>
                ) : (
                  <ul className="space-y-3">
                    {sevenDaysSuggestions.length > 0 ? (
                      sevenDaysSuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 flex-shrink-0 animate-pulse"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                        </li>
                      ))
                    ) : (
                      predictions.weeklySuggestions.map((suggestion, index) => (
                        <li key={index} className="flex items-start gap-3 p-3 bg-white rounded-lg shadow-sm">
                          <div className="w-3 h-3 rounded-full bg-blue-500 mt-2 flex-shrink-0 animate-pulse"></div>
                          <span className="text-sm text-gray-700 leading-relaxed">{suggestion}</span>
                        </li>
                      ))
                    )}
                  </ul>
                )}
              </CardContent>
            </Card>
          </div>
        )}

        {/* Yield Input and Location */}
        <div className="grid md:grid-cols-2 gap-4">
          <Card className="border-purple-200 bg-gradient-to-br from-purple-50 to-pink-50">
            <CardHeader>
              <CardTitle className="text-purple-800">
                <span className="text-orange-600 text-sm block">उत्पादन जानकारी</span>
                <span>Yield Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex gap-2">
                <Input 
                  type="number" 
                  placeholder="उत्पादन मात्रा दर्ज करें - Enter yield amount"
                  value={yieldAmount}
                  onChange={(e) => setYieldAmount(e.target.value)}
                  className="flex-1 text-lg py-3"
                />
                <Select value={yieldUnit} onValueChange={setYieldUnit}>
                  <SelectTrigger className="w-32">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="kg">kg - किग्रा</SelectItem>
                    <SelectItem value="ton">ton - टन</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </CardContent>
          </Card>

          <Card className="border-indigo-200 bg-gradient-to-br from-indigo-50 to-blue-50">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-indigo-800">
                <MapPin className="w-5 h-5" />
                <div>
                  <span className="text-orange-600 text-sm block">स्थान</span>
                  <span>Location</span>
                </div>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button 
                onClick={handleLocationRequest}
                disabled={isLoadingLocation}
                className="w-full bg-indigo-600 hover:bg-indigo-700 text-lg py-3"
              >
                {isLoadingLocation ? (
                  <>
                    <Loader size="sm" className="mr-2" />
                    स्थान प्राप्त कर रहे हैं...
                  </>
                ) : (
                  '📍 वर्तमान स्थान प्राप्त करें - Get Current Location'
                )}
              </Button>
              {location.lat && (
                <div className="text-sm text-gray-600 bg-white p-3 rounded-lg">
                  <p><strong>राज्य/State:</strong> {location.state}</p>
                  <p><strong>अक्षांश/Latitude:</strong> {location.lat}</p>
                  <p><strong>देशांतर/Longitude:</strong> {location.lng}</p>
                </div>
              )}
            </CardContent>
          </Card>
        </div>

        {/* ML Predictions */}
        {yieldAmount && location.state && (
          <div className="space-y-4">
            {isLoadingPredictions ? (
              <Card className="border-yellow-200 bg-gradient-to-r from-yellow-50 to-orange-50">
                <CardContent className="py-12">
                  <div className="text-center space-y-4">
                    <Loader size="lg" />
                    <h3 className="text-xl font-semibold text-yellow-700">
                      AI मॉडल विश्लेषण कर रहा है...
                    </h3>
                    <p className="text-gray-600">
                      ML predictions being generated...
                    </p>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <>
                <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
                  <CardHeader>
                    <CardTitle className="flex items-center gap-2 text-green-800">
                      <DollarSign className="w-5 h-5" />
                      <div>
                        <span className="text-orange-600 text-sm block">मूल्य पूर्वानुमान</span>
                        <span>Price Prediction</span>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl md:text-3xl font-bold text-green-600 mb-2">
                      {pricePrediction || predictions.predictedPrice}
                    </div>
                    <div className="flex items-center gap-2">
                      <TrendingUp className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600">बाजार की स्थिति के आधार पर - Based on market conditions</span>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-red-200 bg-gradient-to-r from-red-50 to-orange-50">
                  <CardHeader>
                    <CardTitle className="text-red-800">
                      <span className="text-orange-600 text-sm block">अपशिष्ट विश्लेषण</span>
                      <span>Waste Analysis</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="text-lg font-semibold text-red-600 bg-red-100 p-3 rounded-lg">
                      {predictions.wasteCalculation}
                    </div>
                    <div>
                      <h4 className="font-semibold text-red-800 mb-3">
                        प्रबंधन सुझाव - Management Suggestions:
                      </h4>
                      <ul className="space-y-2">
                        {predictions.wasteManagement.map((suggestion, index) => (
                          <li key={index} className="flex items-start gap-3 p-2 bg-white rounded-lg">
                            <div className="w-2 h-2 rounded-full bg-red-500 mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-gray-700">{suggestion}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-blue-800">
                      <span className="text-orange-600 text-sm block">माइक्रो लोन सुझाव</span>
                      <span>Micro Loan Suggestions</span>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {predictions.loanSuggestions.map((loan, index) => (
                        <div key={index} className="border border-blue-200 rounded-lg p-4 bg-white">
                          <h4 className="font-semibold text-blue-800 mb-2">{loan.bankName}</h4>
                          <div className="space-y-1 text-sm text-gray-600 mb-3">
                            <p><strong>राशि:</strong> {loan.loanAmount}</p>
                            <p><strong>स्वीकृति की संभावना:</strong> {loan.approval}</p>
                          </div>
                          <Button 
                            size="sm" 
                            className="bg-blue-600 hover:bg-blue-700"
                            onClick={() => window.open(loan.link, '_blank')}
                          >
                            💰 अभी आवेदन करें - Apply Now
                          </Button>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </>
            )}
          </div>
        )}

        {/* Communication Sections */}
        <div className="grid md:grid-cols-2 gap-6 mt-12">
          <CallSection 
            suggestions={`Annapurna Shield Recommendations: ${apiSuggestions.length > 0 ? apiSuggestions.join(', ') : predictions.currentSuggestions.join(', ')}`}
            onCall={() => handleSendSuggestions('call')}
          />
          <MessageSection 
            suggestions={`Annapurna Shield Recommendations: ${apiSuggestions.length > 0 ? apiSuggestions.join(', ') : predictions.currentSuggestions.join(', ')}`}
            onMessage={() => handleSendSuggestions('message')}
          />
        </div>
      </div>
    </section>
  );
};

export default Dashboard;