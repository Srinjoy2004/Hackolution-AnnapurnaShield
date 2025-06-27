
import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, Sprout, Leaf } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Hero = () => {
  const { t } = useLanguage();
  
  const scrollToDashboard = () => {
    const element = document.getElementById('dashboard');
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="home" className="pt-16 bg-gradient-to-br from-green-50 via-orange-50 to-yellow-50 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20">
        <div className="grid lg:grid-cols-2 gap-8 md:gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-6 md:space-y-8 text-center lg:text-left">
            <div className="flex items-center justify-center lg:justify-start space-x-2 text-green-600">
              <Shield className="w-6 h-6" />
              <span className="font-semibold text-sm md:text-base">{t('smartAgriculture')}</span>
            </div>
            
            <div className="space-y-4">
              <h1 className="text-3xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                <span className="text-orange-600 block text-2xl md:text-3xl lg:text-4xl mb-2">{t('annapurnaShield')}</span>
                {t('protectingCrops')}
                <span className="text-green-600 block">{t('cropsWithAI')}</span>
              </h1>
              
              <div className="flex justify-center lg:justify-start space-x-2 md:space-x-4">
                <div className="bg-orange-100 px-3 py-1 rounded-full text-orange-700 text-sm font-medium">
                  {t('grainProtection')}
                </div>
                <div className="bg-green-100 px-3 py-1 rounded-full text-green-700 text-sm font-medium">
                  {t('aiTechnology')}
                </div>
              </div>
            </div>
            
            <p className="text-lg md:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0">
              {t('heroDescription')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start pt-4">
              <Button 
                size="lg" 
                className="bg-green-600 hover:bg-green-700 text-white font-semibold text-base md:text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
                onClick={scrollToDashboard}
              >
                {t('startMonitoring')}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button 
                size="lg" 
                variant="outline" 
                className="border-2 border-green-600 text-green-600 hover:bg-green-50 font-semibold text-base md:text-lg px-8 py-4 shadow-lg hover:shadow-xl transition-all transform hover:scale-105"
              >
                {t('learnMore')}
              </Button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 md:gap-6 pt-6 md:pt-8">
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">24/7</div>
                <div className="text-xs md:text-sm text-gray-600">{t('monitoring')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">95%</div>
                <div className="text-xs md:text-sm text-gray-600">{t('accuracy')}</div>
              </div>
              <div className="text-center">
                <div className="text-xl md:text-2xl font-bold text-green-600">50%</div>
                <div className="text-xs md:text-sm text-gray-600">{t('costSavings')}</div>
              </div>
            </div>
          </div>
          
          {/* Right Content - 3D-like Hero Image */}
          <div className="relative">
            <div className="relative z-10 transform hover:scale-105 transition-transform duration-500">
              <div className="bg-gradient-to-br from-green-400 to-blue-600 rounded-3xl p-2 shadow-2xl">
                <img 
                  src="https://images.unsplash.com/photo-1574323347407-f5e1ad6d020b?w=600&h=600&fit=crop" 
                  alt="Indian farmer using smart agriculture technology"
                  className="rounded-2xl shadow-xl w-full h-64 md:h-80 lg:h-96 object-cover"
                />
              </div>
            </div>
            
            {/* Floating 3D-like Cards */}
            <div className="absolute -top-4 -left-4 bg-white p-3 md:p-4 rounded-xl shadow-lg z-20 animate-bounce">
              <div className="flex items-center space-x-2 md:space-x-3">
                <div className="w-6 h-6 md:w-8 md:h-8 bg-green-100 rounded-full flex items-center justify-center">
                  <Sprout className="w-3 h-3 md:w-4 md:h-4 text-green-600" />
                </div>
                <div>
                  <div className="text-xs md:text-sm font-semibold">{t('soilHealth')}</div>
                </div>
              </div>
            </div>
            
            <div className="absolute -bottom-4 -right-4 bg-white p-3 md:p-4 rounded-xl shadow-lg z-20 animate-pulse">
              <div className="text-center">
                <div className="text-lg md:text-2xl font-bold text-green-600">₹45,000</div>
                <div className="text-xs text-gray-500">{t('predictedPrice')}</div>
              </div>
            </div>

            <div className="absolute top-1/2 -right-8 bg-gradient-to-r from-orange-500 to-red-500 p-3 rounded-full shadow-lg z-20 animate-spin-slow">
              <Leaf className="w-6 h-6 text-white" />
            </div>

            {/* Background decoration */}
            <div className="absolute inset-0 bg-gradient-to-br from-green-200/20 to-blue-200/20 rounded-3xl transform rotate-6 scale-105 -z-10"></div>
            <div className="absolute inset-0 bg-gradient-to-tr from-orange-200/20 to-yellow-200/20 rounded-3xl transform -rotate-3 scale-110 -z-20"></div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
