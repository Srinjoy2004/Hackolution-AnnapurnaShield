
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { AlertTriangle, TrendingDown, Shield, Recycle } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ProblemStatement = () => {
  const { t } = useLanguage();
  
  const problems = [
    {
      icon: <AlertTriangle className="w-8 h-8 text-red-600" />,
      title: t('coreIssue'),
      description: "A significant portion of India's food grain production is lost post-harvest within storage facilities, amounting to thousands of crores in economic loss.",
      stats: "20-40% grain loss annually"
    },
    {
      icon: <TrendingDown className="w-8 h-8 text-orange-600" />,
      title: t('rootCause'),
      description: "The primary cause is the undetected rise of temperature and moisture deep inside grain silos, creating ideal conditions for spoilage agents like mold, fungus, and pests.",
      stats: "Moisture & Temperature fluctuations"
    },
    {
      icon: <Shield className="w-8 h-8 text-yellow-600" />,
      title: t('currentMethodFailure'),
      description: "Existing procedures rely on manual, surface-level inspections that are fundamentally reactive. They only identify spoilage after it has begun.",
      stats: "Too late detection"
    },
    {
      icon: <Recycle className="w-8 h-8 text-blue-600" />,
      title: t('wasteInefficiency'),
      description: "When spoilage occurs, the compromised grain is typically discarded, resulting in complete financial loss and creating an environmental burden.",
      stats: "100% waste of spoiled grain"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-orange-50 to-yellow-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('problemsInAgriculture')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Understanding the critical challenges faced by Indian farmers in grain storage and management
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          {problems.map((problem, index) => (
            <Card key={index} className="border-orange-200 hover:shadow-xl transition-all duration-300 bg-gradient-to-br from-white to-orange-50">
              <CardHeader>
                <div className="flex items-start space-x-4">
                  <div className="p-3 bg-white rounded-lg shadow-sm">
                    {problem.icon}
                  </div>
                  <div className="flex-1">
                    <CardTitle className="text-orange-800 mb-2">
                      {problem.title}
                    </CardTitle>
                    <div className="text-sm font-semibold text-orange-600 bg-orange-100 px-3 py-1 rounded-full inline-block">
                      {problem.stats}
                    </div>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {problem.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-orange-100 to-yellow-100 rounded-2xl p-8">
            <img 
              src="src\Images\ai-in-agriculture.jpg" 
              alt="Indian farmers working in fields"
              className="w-full h-64 object-cover rounded-xl mb-6"
            />
            <h4 className="text-2xl font-bold text-orange-800 mb-4">
              {t('needForSolution')}
            </h4>
            <p className="text-gray-700 text-lg">
              Annapurna Shield addresses these critical issues with smart IoT monitoring and AI-powered predictions
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemStatement;
