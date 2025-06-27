
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Phone, PhoneCall } from "lucide-react";

interface CallSectionProps {
  suggestions: string;
  onCall: () => void;
}

const CallSection = ({ suggestions, onCall }: CallSectionProps) => {
  return (
    <Card className="border-blue-200 bg-gradient-to-br from-blue-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-blue-800">
          <Phone className="w-6 h-6" />
          <div>
            <div className="text-sm text-orange-600">कॉल करें</div>
            <div>Call for Expert Advice</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-blue-50 p-4 rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1556745757-8d76bdb6984b?w=400&h=200&fit=crop"
            alt="Agricultural expert consultation"
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-700">
            कृषि विशेषज्ञों से सीधे बात करें और अपनी फसल के लिए व्यक्तिगत सुझाव प्राप्त करें
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Get personalized advice from agricultural experts for your crop protection
          </p>
        </div>
        <Button 
          onClick={onCall}
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center gap-2"
          size="lg"
        >
          <PhoneCall className="w-5 h-5" />
          <span>विशेषज्ञ से बात करें - Call Expert</span>
        </Button>
        <div className="text-xs text-gray-500 text-center">
          24/7 हेल्पलाइन उपलब्ध - Available 24/7
        </div>
      </CardContent>
    </Card>
  );
};

export default CallSection;
