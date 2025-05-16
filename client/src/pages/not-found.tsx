import { Card, CardContent } from "@/components/ui/card";
import { AlertCircle, Home, ArrowLeft } from "lucide-react";
import { Helmet } from "react-helmet";
import { Button } from "@/components/ui/button";
import { useLocation } from "wouter";

export default function NotFound() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-gray-50">
      <Helmet>
        <title>Page Not Found | Veronica Vignoni | Product Manager & Designer</title>
        <meta name="description" content="The page you are looking for might have been removed or is temporarily unavailable." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>
      
      <Card className="w-full max-w-md mx-4">
        <CardContent className="pt-6">
          <div className="flex mb-4 gap-2">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <h1 className="text-2xl font-bold text-gray-900">404 Page Not Found</h1>
          </div>

          <p className="mt-4 text-gray-600">
            Sorry, the page you are looking for doesn't exist or has been moved.
          </p>
          
          <div className="mt-6 flex gap-4">
            <Button 
              onClick={() => setLocation("/")}
              className="flex items-center gap-2"
            >
              <Home size={16} />
              Return to Home
            </Button>
            
            <Button 
              variant="outline"
              onClick={() => window.history.back()}
              className="flex items-center gap-2"
            >
              <ArrowLeft size={16} />
              Go Back
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
