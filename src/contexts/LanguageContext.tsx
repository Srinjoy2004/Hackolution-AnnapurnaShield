import React, { createContext, useContext, useState, ReactNode } from 'react';

interface LanguageContextType {
  language: string;
  setLanguage: (lang: string) => void;
  t: (key: string) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

const translations = {
  en: {
    // Navbar
    home: "Home",
    about: "About",
    features: "Features",
    dashboard: "Dashboard",
    getStarted: "Get Started",
    
    // Hero
    smartAgriculture: "Smart Agriculture Protection",
    annapurnaShield: "Annapurna Shield",
    protectingCrops: "Protecting Your",
    cropsWithAI: "Crops with AI",
    grainProtection: "🌾 Grain Protection",
    aiTechnology: "🤖 AI Technology",
    heroDescription: "Advanced IoT sensors and machine learning for soil monitoring, crop disease prediction, and agricultural yield optimization with real-time insights for Indian farmers.",
    startMonitoring: "Start Monitoring",
    learnMore: "Learn More",
    monitoring: "Monitoring",
    accuracy: "Accuracy",
    costSavings: "Cost Savings",
    soilHealth: "Soil Health: Excellent",
    predictedPrice: "Predicted Price/ton",
    
    // Dashboard
    farmerDashboard: "Farmer Dashboard",
    hardwareConnection: "Hardware Connection",
    selectYourCrop: "Select Your Crop",
    currentSuggestions: "Current Protection Suggestions",
    weeklySuggestions: "Next 7 Days Suggestions",
    currentYield: "Current Yield (kg/acre)",
    locationServices: "Location Services",
    priceAnalysis: "Price Analysis & Predictions",
    wasteManagement: "Waste Management Solutions",
    microLoanAssistance: "Micro Loan Assistance",
    sendMessage: "Send Message",
    callExpert: "Call for Expert Advice",
    
    // Problem Statement
    problemsInAgriculture: "Problems in Indian Agriculture",
    coreIssue: "Core Issue",
    rootCause: "Root Cause",
    currentMethodFailure: "Current Method Failure",
    wasteInefficiency: "Waste Inefficiency",
    needForSolution: "Need for Solution",
    
    // Solution
    ourSolution: "Our Solution",
    theConcept: "The Concept",
    dualGoal: "The Dual Goal",
    theImpact: "The Impact",
    aiIntelligence: "AI-Powered Intelligence",
    smartSolutions: "Smart Solutions for Farmers",
    
    // Features
    comprehensiveTitle: "Comprehensive Agricultural Solutions",
    comprehensiveDesc: "From soil monitoring to financial assistance, Annapurna Shield provides everything you need for successful modern farming.",
    soilTemperature: "Soil Temperature Monitoring",
    humidityAnalysis: "Humidity Analysis",
    pricePrediction: "Price Prediction",
    wasteManagementFeature: "Waste Management",
    microLoanFeature: "Micro Loan Assistance",
    expertConsultation: "Expert Consultation",
    
    // About
    aboutTitle: "About Annapurna Shield",
    aboutDescription: "Our mission is to revolutionize agriculture through technology, helping farmers make informed decisions and achieve sustainable, profitable farming practices.",
    cropProtection: "Crop Protection",
    mlPredictions: "ML Predictions",
    iotMonitoring: "IoT Monitoring",
    yieldOptimization: "Yield Optimization",
    empoweringFarmers: "Empowering Farmers with Smart Technology",
    realTimeMonitoring: "Real-time soil monitoring",
    aiRecommendations: "AI-powered crop recommendations",
    priceInsights: "Price prediction and market insights",
    wasteSolutions: "Waste management solutions",
    
    // Footer
    footerDescription: "Empowering Indian farmers with smart technology for better crop management, waste reduction, and increased profitability through AI-powered solutions.",
    quickLinks: "Quick Links",
    contactUs: "Contact Us",
    addressIndia: "New Delhi, India",
    allRightsReserved: "All rights reserved",
  },
  hi: {
    // Navbar
    home: "होम",
    about: "हमारे बारे में",
    features: "सुविधाएं",
    dashboard: "डैशबोर्ड",
    getStarted: "शुरू करें",
    
    // Hero
    smartAgriculture: "स्मार्ट कृषि सुरक्षा",
    annapurnaShield: "अन्नपूर्णा शील्ड",
    protectingCrops: "आपकी फसलों की",
    cropsWithAI: "AI से सुरक्षा",
    grainProtection: "🌾 अन्न संरक्षण",
    aiTechnology: "🤖 AI तकनीक",
    heroDescription: "भारतीय किसानों के लिए IoT सेंसर और मशीन लर्निंग के साथ मिट्टी की निगरानी, फसल रोग की भविष्यवाणी और कृषि उत्पादन अनुकूलन।",
    startMonitoring: "निगरानी शुरू करें",
    learnMore: "और जानें",
    monitoring: "निगरानी",
    accuracy: "सटीकता",
    costSavings: "लागत बचत",
    soilHealth: "मिट्टी स्वास्थ्य: उत्कृष्ट",
    predictedPrice: "प्रति टन भविष्यवाणी",
    
    // Dashboard
    farmerDashboard: "किसान डैशबोर्ड",
    hardwareConnection: "हार्डवेयर कनेक्शन",
    selectYourCrop: "अपनी फसल चुनें",
    currentSuggestions: "वर्तमान सुरक्षा सुझाव",
    weeklySuggestions: "अगले 7 दिनों के सुझाव",
    currentYield: "वर्तमान उत्पादन (किलो/एकड़)",
    locationServices: "स्थान सेवाएं",
    priceAnalysis: "मूल्य विश्लेषण और भविष्यवाणी",
    wasteManagement: "अपशिष्ट प्रबंधन समाधान",
    microLoanAssistance: "माइक्रो लोन सहायता",
    sendMessage: "संदेश भेजें",
    callExpert: "विशेषज्ञ से बात करें",
    
    // Problem Statement
    problemsInAgriculture: "भारतीय कृषि की समस्याएं",
    coreIssue: "मुख्य समस्या",
    rootCause: "मूल कारण",
    currentMethodFailure: "वर्तमान पद्धति की विफलता",
    wasteInefficiency: "अपशिष्ट अक्षमता",
    needForSolution: "समाधान की आवश्यकता",
    
    // Solution
    ourSolution: "हमारा समाधान",
    theConcept: "अवधारणा",
    dualGoal: "दोहरा लक्ष्य",
    theImpact: "प्रभाव",
    aiIntelligence: "AI बुद्धिमत्ता",
    smartSolutions: "किसानों के लिए स्मार्ट समाधान",
    
    // Features
    comprehensiveTitle: "व्यापक कृषि समाधान",
    comprehensiveDesc: "मिट्टी की निगरानी से लेकर वित्तीय सहायता तक, अन्नपूर्णा शील्ड सफल आधुनिक कृषि के लिए आवश्यक सब कुछ प्रदान करता है।",
    soilTemperature: "मिट्टी तापमान निगरानी",
    humidityAnalysis: "आर्द्रता विश्लेषण",
    pricePrediction: "मूल्य भविष्यवाणी",
    wasteManagementFeature: "अपशिष्ट प्रबंधन",
    microLoanFeature: "माइक्रो लोन सहायता",
    expertConsultation: "विशेषज्ञ परामर्श",
    
    // About
    aboutTitle: "अन्नपूर्णा शील्ड के बारे में",
    aboutDescription: "हमारा मिशन प्रौद्योगिकी के माध्यम से कृषि में क्रांति लाना है, किसानों को सूचित निर्णय लेने और टिकाऊ, लाभकारी कृषि प्रथाओं को प्राप्त करने में मदद करना।",
    cropProtection: "फसल सुरक्षा",
    mlPredictions: "ML भविष्यवाणियां",
    iotMonitoring: "IoT निगरानी",
    yieldOptimization: "उत्पादन अनुकूलन",
    empoweringFarmers: "स्मार्ट तकनीक से किसानों को सशक्त बनाना",
    realTimeMonitoring: "वास्तविक समय मिट्टी निगरानी",
    aiRecommendations: "AI-संचालित फसल सिफारिशें",
    priceInsights: "मूल्य भविष्यवाणी और बाजार अंतर्दृष्टि",
    wasteSolutions: "अपशिष्ट प्रबंधन समाधान",
    
    // Footer
    footerDescription: "AI-संचालित समाधानों के माध्यम से बेहतर फसल प्रबंधन, अपशिष्ट कमी और बढ़ी हुई लाभप्रदता के लिए भारतीय किसानों को स्मार्ट तकनीक से सशक्त बनाना।",
    quickLinks: "त्वरित लिंक",
    contactUs: "संपर्क करें",
    addressIndia: "नई दिल्ली, भारत",
    allRightsReserved: "सभी अधिकार सुरक्षित",
  }
};

export const LanguageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState('en');

  const t = (key: string): string => {
    return translations[language as keyof typeof translations]?.[key as keyof typeof translations.en] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
