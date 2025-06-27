
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Target, TrendingUp, Lightbulb } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const Solution = () => {
  const { t } = useLanguage();
  
  const solutions = [
    {
      icon: <Lightbulb className="w-8 h-8 text-green-600" />,
      title: t('theConcept'),
      description: "An intelligent, non-invasive IoT system that moves grain storage management from a reactive to a proactive, circular model.",
      image: "src/Images/0_gEVwqjvCgEMz7Ooa.jpg"
    },
    {
      icon: <Target className="w-8 h-8 text-blue-600" />,  
      title: t('dualGoal'),
      description: "First predict the onset of spoilage-conducive conditions to enable preventative action. Second, provide data to guide the repurposing of compromised grain into valuable secondary products.",
      image: "src/Images/top-ai-powered-projects-indian-agriculture-startuptalky.jpg"
    },
    {
      icon: <TrendingUp className="w-8 h-8 text-purple-600" />,
      title: t('theImpact'),
      description: "This approach safeguards food security, protects farmer incomes, and creates new value streams from waste, fostering a sustainable agricultural economy.",
      image: "src/Images/indian-farmer-using-drone-spraying-260nw-2116655078.webp"
    },
    {
      icon: <Brain className="w-8 h-8 text-indigo-600" />,
      title: t('aiIntelligence'),
      description: "Machine learning algorithms analyze patterns and predict outcomes, helping farmers make informed decisions for better crop management.",
      image: "src/Images/smart-agriculture.avif"
    }
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-green-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            {t('ourSolution')}
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Annapurna Shield's comprehensive approach to solving India's agricultural challenges
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {solutions.map((solution, index) => (
            <Card key={index} className="border-green-200 hover:shadow-xl transition-all duration-300 bg-white overflow-hidden">
              <div className="relative">
                <img 
                  src={solution.image}
                  alt={solution.title}
                  className="w-full h-48 object-cover"
                />
                <div className="absolute top-4 left-4 p-3 bg-white rounded-lg shadow-lg">
                  {solution.icon}
                </div>
              </div>
              <CardHeader>
                <CardTitle className="text-green-800">
                  {solution.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">
                  {solution.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-2xl p-8 text-white text-center">
          <h4 className="text-2xl md:text-3xl font-bold mb-4">
            {t('smartSolutions')}
          </h4>
          <p className="text-lg opacity-90 max-w-2xl mx-auto">
            Empowering Indian agriculture with technology that understands our unique challenges and provides practical solutions
          </p>
        </div>
      </div>
    </section>
  );
};

export default Solution;
