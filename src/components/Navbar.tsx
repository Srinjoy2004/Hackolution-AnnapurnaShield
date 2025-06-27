
import { useState } from "react";
import { Menu, X, Leaf, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { language, setLanguage, t } = useLanguage();

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
    setIsOpen(false);
  };

  return (
    <nav className="bg-white shadow-lg fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <h3 className="text-2xl font-bold mb-4 text-green-900">
              🌾 {t('annapurnaShield')}
            </h3>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <button 
              onClick={() => scrollToSection('home')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {t('home')}
            </button>
            <button 
              onClick={() => scrollToSection('about')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {t('about')}
            </button>
            <button 
              onClick={() => scrollToSection('features')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {t('features')}
            </button>
            <button 
              onClick={() => scrollToSection('dashboard')}
              className="text-gray-700 hover:text-green-600 transition-colors"
            >
              {t('dashboard')}
            </button>
            
            {/* Language Switcher */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline" size="sm" className="flex items-center gap-2">
                  <Globe className="w-4 h-4" />
                  {language === 'en' ? 'EN' : 'हिं'}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="bg-white border shadow-lg">
                <DropdownMenuItem onClick={() => setLanguage('en')}>
                  🇺🇸 English
                </DropdownMenuItem>
                <DropdownMenuItem onClick={() => setLanguage('hi')}>
                  🇮🇳 हिंदी
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
            
            <Button
              className="bg-green-600 hover:bg-green-700"
              onClick={() => scrollToSection('dashboard')}
            >
              {t('getStarted')}
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsOpen(!isOpen)}
            >
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t">
              <button 
                onClick={() => scrollToSection('home')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
              >
                {t('home')}
              </button>
              <button 
                onClick={() => scrollToSection('about')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
              >
                {t('about')}
              </button>
              <button 
                onClick={() => scrollToSection('features')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
              >
                {t('features')}
              </button>
              <button 
                onClick={() => scrollToSection('dashboard')}
                className="block w-full text-left px-3 py-2 text-gray-700 hover:text-green-600"
              >
                {t('dashboard')}
              </button>
              
              {/* Mobile Language Switcher */}
              <div className="px-3 py-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="flex items-center gap-2 w-full">
                      <Globe className="w-4 h-4" />
                      {language === 'en' ? 'English' : 'हिंदी'}
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="bg-white border shadow-lg">
                    <DropdownMenuItem onClick={() => setLanguage('en')}>
                      🇺🇸 English
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={() => setLanguage('hi')}>
                      🇮🇳 हिंदी
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
              
              <Button className="w-full mt-2 bg-green-600 hover:bg-green-700">
                {t('getStarted')}
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
