
import { useLanguage } from "@/contexts/LanguageContext";
import { Facebook, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-gradient-to-r from-green-800 to-blue-800 text-white py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid md:grid-cols-4 gap-8">
          {/* Brand Section */}
          <div className="col-span-1 md:col-span-2">
            <h3 className="text-2xl font-bold mb-4 text-yellow-300">
              🌾 {t('annapurnaShield')}
            </h3>
            <p className="text-green-100 mb-4 leading-relaxed">
              {t('footerDescription')}
            </p>
            <div className="flex space-x-4">
              <Facebook className="w-6 h-6 text-blue-300 hover:text-white cursor-pointer transition-colors" />
              <Twitter className="w-6 h-6 text-blue-300 hover:text-white cursor-pointer transition-colors" />
              <Instagram className="w-6 h-6 text-pink-300 hover:text-white cursor-pointer transition-colors" />
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">
              {t('quickLinks')}
            </h4>
            <ul className="space-y-2">
              <li><a href="#home" className="text-green-100 hover:text-white transition-colors">{t('home')}</a></li>
              <li><a href="#about" className="text-green-100 hover:text-white transition-colors">{t('about')}</a></li>
              <li><a href="#features" className="text-green-100 hover:text-white transition-colors">{t('features')}</a></li>
              <li><a href="#dashboard" className="text-green-100 hover:text-white transition-colors">{t('dashboard')}</a></li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="text-lg font-semibold mb-4 text-yellow-300">
              {t('contactUs')}
            </h4>
            <div className="space-y-3">
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-green-300" />
                <span className="text-green-100">+91 8777240684</span>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-green-300" />
                <span className="text-green-100">info@annapurnashield.com</span>
              </div>
              <div className="flex items-center space-x-3">
                <MapPin className="w-5 h-5 text-green-300" />
                <span className="text-green-100">{t('addressIndia')}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-green-600 mt-8 pt-6 text-center">
          <p className="text-green-100">
            © 2025 {t('annapurnaShield')}. {t('allRightsReserved')}
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
