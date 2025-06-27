
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Thermometer, Droplets, DollarSign, Recycle, CreditCard, Phone } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Features = () => {
  const { t } = useLanguage();
  
  const features = [
    {
      icon: <Thermometer className="w-8 h-8 text-green-600" />,
      title: t('soilTemperature'),
      description: "Real-time tracking of soil temperature to optimize planting and irrigation schedules."
    },
    {
      icon: <Droplets className="w-8 h-8 text-green-600" />,
      title: t('humidityAnalysis'),
      description: "Monitor soil moisture levels to prevent over or under-watering of crops."
    },
    {
      icon: <DollarSign className="w-8 h-8 text-green-600" />,
      title: t('pricePrediction'),
      description: "AI-powered market analysis provides accurate crop price forecasts."
    },
    {
      icon: <Recycle className="w-8 h-8 text-green-600" />,
      title: t('wasteManagementFeature'),
      description: "Smart recommendations for reducing agricultural waste and improving sustainability."
    },
    {
      icon: <CreditCard className="w-8 h-8 text-green-600" />,
      title: t('microLoanFeature'),
      description: "Connect with financial institutions for agricultural loans and funding opportunities."
    },
    {
      icon: <Phone className="w-8 h-8 text-green-600" />,
      title: t('expertConsultation'),
      description: "Direct access to agricultural experts through call and messaging services."
    }
  ];

  return (
    <section id="features" className="py-20 bg-gradient-to-br from-green-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('comprehensiveTitle')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            {t('comprehensiveDesc')}
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-green-200 hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
              <CardHeader>
                <div className="flex items-center space-x-4">
                  <div className="p-3 bg-green-100 rounded-lg">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-green-800">
                    {feature.title}
                  </CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="inline-flex items-center space-x-2 bg-green-100 px-6 py-3 rounded-full">
            <span className="text-green-800 font-semibold">
              Join thousands of farmers already using Annapurna Shield
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Features;
