
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Brain, Wifi, TrendingUp } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const About = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Shield className="w-12 h-12 text-green-600" />,
      title: t('cropProtection'),
      description: "Advanced AI algorithms monitor your crops 24/7 and provide early warning systems for potential threats."
    },
    {
      icon: <Brain className="w-12 h-12 text-green-600" />,
      title: t('mlPredictions'),
      description: "Machine learning models analyze weather patterns, soil data, and historical trends to predict optimal farming strategies."
    },
    {
      icon: <Wifi className="w-12 h-12 text-green-600" />,
      title: t('iotMonitoring'),
      description: "Real-time soil sensors provide continuous data on temperature, humidity, and nutrient levels."
    },
    {
      icon: <TrendingUp className="w-12 h-12 text-green-600" />,
      title: t('yieldOptimization'),
      description: "Data-driven insights help maximize your crop yield while minimizing waste and resource consumption."
    }
  ];

  return (
    <section id="about" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('aboutTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('aboutDescription')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-green-100 hover:shadow-lg transition-shadow">
              <CardContent className="p-6 text-center">
                <div className="flex justify-center mb-4">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-3">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-900">
              {t('empoweringFarmers')}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              Annapurna Shield combines the power of Internet of Things (IoT) sensors, 
              artificial intelligence, and machine learning to create a comprehensive 
              agricultural monitoring and management system.
            </p>
            <p className="text-gray-600 leading-relaxed">
              Our platform helps farmers reduce crop losses, optimize resource usage, 
              and increase profitability through data-driven insights and predictive analytics.
            </p>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">{t('realTimeMonitoring')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">{t('aiRecommendations')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">{t('priceInsights')}</span>
              </div>
              <div className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-green-600 rounded-full"></div>
                <span className="text-gray-700">{t('wasteSolutions')}</span>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <img 
              src="src\Images\istockphoto-1316735334-612x612 (1).jpg" 
              alt="Modern farming with technology"
              className="rounded-2xl shadow-xl w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
