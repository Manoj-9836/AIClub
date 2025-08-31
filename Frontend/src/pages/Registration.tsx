import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, User, Mail, Phone, GraduationCap, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const Registration = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const { type, title } = useParams();
  const eventName = decodeURIComponent(title || "");

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    year: "",
    major: "",
    experience: "",
    comments: "",
    conditions: false,
    terms: false,
    eventName: eventName || "",
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!formData.terms) {
      toast({
        title: "Terms Required",
        description: "Please accept the terms and conditions to continue.",
        variant: "destructive",
      });
      return;
    }

    setIsSubmitting(true);

    try {
      const scriptURL = "https://script.google.com/macros/s/AKfycbyakO0j0mMoEWER_Fh_E817fXmGQ3dXfpFXXRRZUmDIo3-IRAiRWga8CEHP3H7EirZu/exec";

      // Convert formData object → FormData for Google Sheets
      const body = new FormData();
      Object.entries(formData).forEach(([key, value]) => {
        body.append(key, String(value));
      });

      const response = await fetch(scriptURL, {
        method: "POST",
        body,
      });

      if (response.ok) {
        setIsSuccess(true);
        toast({
          title: "Registration Successful!",
          description: `You've been registered for this ${type}.`,
        });
      } else {
        throw new Error("Failed to submit");
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "There was an issue submitting your registration.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };


  if (isSuccess) {
    return (
      <div className="min-h-screen bg-background pt-20 flex items-center justify-center">
        <Card className="max-w-md w-full mx-4">
          <CardContent className="p-8 text-center space-y-6">
            <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-500" />
            </div>
            <div className="space-y-2">
              <h2 className="text-2xl font-bold">Registration Complete!</h2>
              <p className="text-muted-foreground">
                Thank you for registering. You'll receive a confirmation email shortly.
              </p>
            </div>
            <div className="space-y-3">
              <Button
                onClick={() => navigate(type === 'event' ? '/events' : '/workshops')}
                variant="hero"
                className="w-full"
              >
                Back to {type === 'event' ? 'Events' : 'Workshops'}
              </Button>
              <Button
                onClick={() => navigate('/')}
                variant="outline"
                className="w-full"
              >
                Return Home
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Header */}
      <section className="py-8">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center space-x-4 mb-6">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => navigate(-1)}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Back</span>
            </Button>
          </div>
          <div className="text-center space-y-2">
            <h1 className="text-3xl md:text-4xl font-bold">
              Register for {type === 'event' ? 'Event' : 'Workshop'}
            </h1>
            <p className="text-muted-foreground">
              Complete the form below to secure your spot
            </p>
          </div>
        </div>
      </section>

      {/* Registration Form */}
      <section className="pb-20">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <Card className="shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <User className="w-5 h-5 text-primary" />
                <span>Registration Information</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="firstName">First Name *</Label>
                    <Input
                      id="firstName"
                      value={formData.firstName}
                      name="firstName"
                      onChange={(e) => handleInputChange('firstName', e.target.value)}
                      required
                      placeholder="Enter your first name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="lastName">Last Name *</Label>
                    <Input
                      id="lastName"
                      value={formData.lastName}
                      name="lastName"
                      onChange={(e) => handleInputChange('lastName', e.target.value)}
                      required
                      placeholder="Enter your last name"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="email">Email Address *</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        name="email"
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        required
                        placeholder="your_email@lendi.edu.in"
                        className="pl-10"
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        name="phone"
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        placeholder="(+91)1234567890"
                        className="pl-10"
                      />
                    </div>
                  </div>
                </div>

                {/* Academic Information */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="year">Academic Year *</Label>
                    <Select value={formData.year} name="year" onValueChange={(value) => handleInputChange('year', value)}>
                      <SelectTrigger>
                        <div className="flex items-center space-x-2">
                          <GraduationCap className="w-4 h-4 text-muted-foreground" />
                          <SelectValue placeholder="Select your year" />
                        </div>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="1">1ST</SelectItem>
                        <SelectItem value="2">2ND</SelectItem>
                        <SelectItem value="3">3RD</SelectItem>
                        <SelectItem value="4">4TH</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="major">Major/Branch of Study *</Label>
                    <Input
                      id="major"
                      value={formData.major}
                      name="major"
                      onChange={(e) => handleInputChange('major', e.target.value)}
                      required
                      placeholder="Computer Science, Data Science, etc."
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="experience">AI/ML Experience Level</Label>
                  <Select value={formData.experience} name="experience" onValueChange={(value) => handleInputChange('experience', value)}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select your experience level" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="none">No experience</SelectItem>
                      <SelectItem value="beginner">Beginner (0-1 years)</SelectItem>
                      <SelectItem value="intermediate">Intermediate (1-3 years)</SelectItem>
                      <SelectItem value="advanced">Advanced (3+ years)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Additional Information */}
                <div className="space-y-4">

                  <div className="space-y-2">
                    <Label htmlFor="comments">Additional Comments</Label>
                    <Textarea
                      id="comments"
                      value={formData.comments}
                      name="comments"
                      onChange={(e) => handleInputChange('comments', e.target.value)}
                      placeholder="Questions, special requests, or anything else you'd like us to know"
                      rows={3}
                    />
                  </div>
                </div>

                {/* Checkboxes */}
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="conditions"
                      checked={formData.conditions}
                      name="conditions"
                      onCheckedChange={(checked) => handleInputChange('conditions', checked as boolean)}
                    />
                    <Label htmlFor="conditions" className="text-sm">
                      I commit to maintaining order and preserving a calm environment within the premises.
                    </Label>
                  </div>

                  <div className="flex items-center space-x-2">
                    <Checkbox
                      id="terms"
                      checked={formData.terms}
                      name="terms"
                      onCheckedChange={(checked) => handleInputChange('terms', checked as boolean)}
                    />
                    <Label htmlFor="terms" className="text-sm">
                      I agree to the terms and conditions and understand the event policies *
                    </Label>
                  </div>
                </div>

                {/* Submit Button */}
                <div className="pt-4">
                  <Button
                    type="submit"
                    variant="hero"
                    size="lg"
                    className="w-full"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Registering..." : "Complete Registration"}
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  );
};

export default Registration;