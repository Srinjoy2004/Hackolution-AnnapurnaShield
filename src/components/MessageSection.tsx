
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageSquare, Send } from "lucide-react";

interface MessageSectionProps {
  suggestions: string;
  onMessage: () => void;
}

const MessageSection = ({ suggestions, onMessage }: MessageSectionProps) => {
  return (
    <Card className="border-green-200 bg-gradient-to-br from-green-50 to-white">
      <CardHeader>
        <CardTitle className="flex items-center gap-3 text-green-800">
          <MessageSquare className="w-6 h-6" />
          <div>
            <div className="text-sm text-orange-600">संदेश भेजें</div>
            <div>Send Message</div>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="bg-green-50 p-4 rounded-lg">
          <img 
            src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=200&fit=crop"
            alt="WhatsApp messaging service"
            className="w-full h-32 object-cover rounded-lg mb-3"
          />
          <p className="text-sm text-gray-700">
            व्हाट्सऐप या SMS के माध्यम से विस्तृत सुझाव प्राप्त करें
          </p>
          <p className="text-sm text-gray-600 mt-2">
            Get detailed suggestions via WhatsApp or SMS for easy reference
          </p>
        </div>
        <Button 
          onClick={onMessage}
          className="w-full bg-green-600 hover:bg-green-700 flex items-center gap-2"
          size="lg"
        >
          <Send className="w-5 h-5" />
          <span>सुझाव भेजें - Send Suggestions</span>
        </Button>
        <div className="text-xs text-gray-500 text-center">
          तुरंत सुझाव प्राप्त करें - Get instant suggestions
        </div>
      </CardContent>
    </Card>
  );
};

export default MessageSection;
