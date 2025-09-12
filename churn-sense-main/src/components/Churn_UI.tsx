import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, Brain, TrendingUp, ArrowRight, ArrowLeft, Users, Signal } from 'lucide-react';
import telecomCustomers from '@/assets/telecom-customers.jpg';
import networkPattern from '@/assets/network-pattern.jpg';

// Reusable InputField Component
interface InputFieldProps {
  id: string;
  label: string;
  type?: string;
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  required?: boolean;
  step?: string;
}

const InputField: React.FC<InputFieldProps> = ({ 
  id,
  label, 
  type = "text", 
  placeholder, 
  value, 
  onChange, 
  required = false,
  step
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-card-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <Input
      id={id}
      type={type}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      required={required}
      step={step}
      className="transition-smooth hover:border-primary/50 focus:border-primary"
    />
  </div>
);

// Reusable DropdownField Component
interface DropdownFieldProps {
  id: string;
  label: string;
  value: string;
  onValueChange: (value: string) => void;
  options: { value: string; label: string }[];
  required?: boolean;
}

const DropdownField: React.FC<DropdownFieldProps> = ({ 
  id,
  label, 
  value, 
  onValueChange, 
  options, 
  required = false 
}) => (
  <div className="space-y-2">
    <label htmlFor={id} className="text-sm font-medium text-card-foreground">
      {label} {required && <span className="text-destructive">*</span>}
    </label>
    <Select value={value} onValueChange={onValueChange}>
      <SelectTrigger className="transition-smooth hover:border-primary/50 focus:border-primary">
        <SelectValue placeholder={`Select ${label.toLowerCase()}`} />
      </SelectTrigger>
      <SelectContent>
        {options.map((option) => (
          <SelectItem key={option.value} value={option.value}>
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  </div>
);

// Reusable ResultCard Component
interface ResultCardProps {
  prediction: { churn: string; probability: number } | null;
}

const ResultCard: React.FC<ResultCardProps> = ({ prediction }) => {
  if (!prediction) return null;

  const isHighRisk = prediction.churn === 'Yes';
  
  return (
    <Card className={`animate-fade-in transition-all duration-500 transform ${
      isHighRisk ? 'border-warning/20 bg-warning/5 shadow-warning' : 'border-success/20 bg-success/5 shadow-glow'
    }`}>
      <CardHeader className="text-center pb-4">
        <CardTitle className="flex items-center justify-center gap-3 text-xl">
          {isHighRisk ? (
            <>
              <AlertTriangle className="h-6 w-6 text-warning animate-pulse" />
              <span className="text-warning-foreground">⚠️ High Risk of Churn</span>
            </>
          ) : (
            <>
              <CheckCircle2 className="h-6 w-6 text-success animate-pulse" />
              <span className="text-success-foreground">✅ Customer Likely to Stay</span>
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent className="text-center">
        <div className="flex items-center justify-center gap-2 text-lg font-semibold mb-4">
          <TrendingUp className="h-5 w-5" />
          <span>Churn Probability: {prediction.probability}%</span>
        </div>
        <div className="w-full bg-muted rounded-full h-3 mb-4">
          <div 
            className={`h-3 rounded-full transition-all duration-1000 ${
              isHighRisk ? 'bg-gradient-warning' : 'bg-gradient-success'
            }`}
            style={{ width: `${prediction.probability}%` }}
          />
        </div>
        <p className="text-muted-foreground">
          {isHighRisk 
            ? "Consider implementing retention strategies for this customer."
            : "This customer shows strong loyalty indicators."
          }
        </p>
      </CardContent>
    </Card>
  );
};

// Main Customer Churn Prediction App
const ChurnUI: React.FC = () => {
  // Step state
  const [currentStep, setCurrentStep] = useState(1);
  
  // Form state - expanded with all fields from original design
  const [formData, setFormData] = useState({
    // Basic Information
    gender: '',
    seniorCitizen: '',
    partner: '',
    dependents: '',
    
    // Service Information  
    tenure: '',
    phoneService: '',
    multipleLines: '',
    internetService: '',
    onlineSecurity: '',
    onlineBackup: '',
    deviceProtection: '',
    techSupport: '',
    streamingTV: '',
    streamingMovies: '',
    
    // Contract & Payment
    contract: '',
    paperlessBilling: '',
    paymentMethod: '',
    monthlyCharges: '',
    totalCharges: ''
  });

  // Prediction state
  const [prediction, setPrediction] = useState<{ churn: string; probability: number } | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // Handle form field changes
  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // Mock prediction function (replace with actual API call)
  const handlePredict = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock prediction logic (replace with actual API call to /predict)
    const mockPrediction = Math.random() > 0.6 ? 'Yes' : 'No';
    const mockProbability = Math.floor(Math.random() * 100);
    
    /* 
    // Future API integration:
    try {
      const response = await fetch('/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      setPrediction(result.prediction);
      setProbability(result.probability);
    } catch (error) {
      console.error('Prediction error:', error);
    }
    */
    
    setPrediction({
      churn: mockPrediction,
      probability: mockProbability
    });
    setIsLoading(false);
  };

  // Form validation
  const isStep1Valid = () => {
    return formData.gender && formData.seniorCitizen && formData.partner && 
           formData.dependents && formData.tenure && formData.phoneService && 
           formData.multipleLines && formData.internetService;
  };

  const isStep2Valid = () => {
    return formData.onlineSecurity && formData.onlineBackup && formData.deviceProtection && 
           formData.techSupport && formData.streamingTV && formData.streamingMovies && 
           formData.contract && formData.paperlessBilling && formData.paymentMethod && 
           formData.monthlyCharges && formData.totalCharges;
  };

  const nextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header with animated background */}
        <div className="relative overflow-hidden rounded-2xl p-8 text-center space-y-4">
          <div 
            className="absolute inset-0 opacity-20"
            style={{
              backgroundImage: `url(${networkPattern})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
          <div className="relative z-10">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Signal className="w-8 h-8 text-primary animate-pulse" />
              <h1 className="text-4xl md:text-5xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                Telecom Customer Information
              </h1>
              <Users className="w-8 h-8 text-accent animate-pulse" />
            </div>
            
            {/* Animated and styled subtitle */}
            <div className="relative mb-6">
              <p className="text-xl md:text-2xl font-semibold bg-gradient-to-r from-primary via-accent to-primary bg-300% bg-clip-text text-transparent animate-[shimmer_3s_ease-in-out_infinite] tracking-wide">
                Advanced customer analytics for churn prediction
              </p>
              <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-24 h-0.5 bg-gradient-primary animate-pulse"></div>
            </div>
            
            {/* Banner Image */}
            <div className="mt-6 animate-fade-in">
              <img 
                src={telecomCustomers} 
                alt="Telecom customer analytics banner" 
                className="mx-auto rounded-xl shadow-card hover:scale-105 transition-smooth max-w-full h-32 md:h-40 w-full object-cover object-center"
              />
            </div>
          </div>
        </div>

        {/* Step Indicator */}
        <div className="flex items-center justify-center space-x-4 mb-8">
          <div className={`flex items-center space-x-2 ${currentStep === 1 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${currentStep === 1 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              1
            </div>
            <span className="font-medium">Basic & Service Info</span>
          </div>
          <div className="w-12 h-0.5 bg-border"></div>
          <div className={`flex items-center space-x-2 ${currentStep === 2 ? 'text-primary' : 'text-muted-foreground'}`}>
            <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-smooth ${currentStep === 2 ? 'bg-primary text-primary-foreground' : 'bg-muted'}`}>
              2
            </div>
            <span className="font-medium">Details & Prediction</span>
          </div>
        </div>

        {/* Step 1: Basic Information & Service Details */}
        {currentStep === 1 && (
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Basic Information & Service Details</CardTitle>
              <CardDescription className="text-center">
                Enter customer's basic information and service details
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Basic Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-primary border-b border-primary/20 pb-2">
                  Basic Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownField
                    id="gender"
                    label="Gender"
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange('gender', value)}
                    options={[
                      { value: 'Male', label: 'Male' },
                      { value: 'Female', label: 'Female' }
                    ]}
                  />
                  <DropdownField
                    id="seniorCitizen"
                    label="Senior Citizen"
                    value={formData.seniorCitizen}
                    onValueChange={(value) => handleInputChange('seniorCitizen', value)}
                    options={[
                      { value: '0', label: 'No' },
                      { value: '1', label: 'Yes' }
                    ]}
                  />
                  <DropdownField
                    id="partner"
                    label="Partner"
                    value={formData.partner}
                    onValueChange={(value) => handleInputChange('partner', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                  />
                  <DropdownField
                    id="dependents"
                    label="Dependents"
                    value={formData.dependents}
                    onValueChange={(value) => handleInputChange('dependents', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                  />
                </div>
              </div>

              {/* Service Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-accent border-b border-accent/20 pb-2">
                  Service Details
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <InputField
                    id="tenure"
                    label="Tenure (months)"
                    type="number"
                    value={formData.tenure}
                    onChange={(e) => handleInputChange('tenure', e.target.value)}
                    placeholder="e.g., 12"
                  />
                  <DropdownField
                    id="phoneService"
                    label="Phone Service"
                    value={formData.phoneService}
                    onValueChange={(value) => handleInputChange('phoneService', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                  />
                  <DropdownField
                    id="multipleLines"
                    label="Multiple Lines"
                    value={formData.multipleLines}
                    onValueChange={(value) => handleInputChange('multipleLines', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No phone service', label: 'No phone service' }
                    ]}
                  />
                  <DropdownField
                    id="internetService"
                    label="Internet Service"
                    value={formData.internetService}
                    onValueChange={(value) => handleInputChange('internetService', value)}
                    options={[
                      { value: 'DSL', label: 'DSL' },
                      { value: 'Fiber optic', label: 'Fiber optic' },
                      { value: 'No', label: 'No' }
                    ]}
                  />
                </div>
              </div>

              <Button 
                onClick={nextStep}
                className="w-full" 
                size="lg" 
                disabled={!isStep1Valid()}
              >
                Next Step <ArrowRight className="ml-2 w-4 h-4" />
              </Button>
            </CardContent>
          </Card>
        )}

        {/* Step 2: Additional Services & Financial Information */}
        {currentStep === 2 && (
          <Card className="glass-card animate-fade-in">
            <CardHeader>
              <CardTitle className="text-2xl text-center">Additional Services & Financial Information</CardTitle>
              <CardDescription className="text-center">
                Complete the customer profile and predict churn risk
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-8">
              {/* Additional Services Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-success border-b border-success/20 pb-2">
                  Additional Services
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownField
                    id="onlineSecurity"
                    label="Online Security"
                    value={formData.onlineSecurity}
                    onValueChange={(value) => handleInputChange('onlineSecurity', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No internet service', label: 'No internet service' }
                    ]}
                  />
                  <DropdownField
                    id="onlineBackup"
                    label="Online Backup"
                    value={formData.onlineBackup}
                    onValueChange={(value) => handleInputChange('onlineBackup', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No internet service', label: 'No internet service' }
                    ]}
                  />
                  <DropdownField
                    id="deviceProtection"
                    label="Device Protection"
                    value={formData.deviceProtection}
                    onValueChange={(value) => handleInputChange('deviceProtection', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No internet service', label: 'No internet service' }
                    ]}
                  />
                  <DropdownField
                    id="techSupport"
                    label="Tech Support"
                    value={formData.techSupport}
                    onValueChange={(value) => handleInputChange('techSupport', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No internet service', label: 'No internet service' }
                    ]}
                  />
                  <DropdownField
                    id="streamingTV"
                    label="Streaming TV"
                    value={formData.streamingTV}
                    onValueChange={(value) => handleInputChange('streamingTV', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No internet service', label: 'No internet service' }
                    ]}
                  />
                  <DropdownField
                    id="streamingMovies"
                    label="Streaming Movies"
                    value={formData.streamingMovies}
                    onValueChange={(value) => handleInputChange('streamingMovies', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' },
                      { value: 'No internet service', label: 'No internet service' }
                    ]}
                  />
                </div>
              </div>

              {/* Financial Information Section */}
              <div className="space-y-6">
                <h3 className="text-xl font-semibold text-warning border-b border-warning/20 pb-2">
                  Financial Information
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <DropdownField
                    id="contract"
                    label="Contract"
                    value={formData.contract}
                    onValueChange={(value) => handleInputChange('contract', value)}
                    options={[
                      { value: 'Month-to-month', label: 'Month-to-month' },
                      { value: 'One year', label: 'One year' },
                      { value: 'Two year', label: 'Two year' }
                    ]}
                  />
                  <DropdownField
                    id="paperlessBilling"
                    label="Paperless Billing"
                    value={formData.paperlessBilling}
                    onValueChange={(value) => handleInputChange('paperlessBilling', value)}
                    options={[
                      { value: 'Yes', label: 'Yes' },
                      { value: 'No', label: 'No' }
                    ]}
                  />
                  <DropdownField
                    id="paymentMethod"
                    label="Payment Method"
                    value={formData.paymentMethod}
                    onValueChange={(value) => handleInputChange('paymentMethod', value)}
                    options={[
                      { value: 'Electronic check', label: 'Electronic check' },
                      { value: 'Mailed check', label: 'Mailed check' },
                      { value: 'Bank transfer (automatic)', label: 'Bank transfer (automatic)' },
                      { value: 'Credit card (automatic)', label: 'Credit card (automatic)' }
                    ]}
                  />
                  <InputField
                    id="monthlyCharges"
                    label="Monthly Charges ($)"
                    type="number"
                    step="0.01"
                    value={formData.monthlyCharges}
                    onChange={(e) => handleInputChange('monthlyCharges', e.target.value)}
                    placeholder="e.g., 79.95"
                  />
                  <InputField
                    id="totalCharges"
                    label="Total Charges ($)"
                    type="number"
                    step="0.01"
                    value={formData.totalCharges}
                    onChange={(e) => handleInputChange('totalCharges', e.target.value)}
                    placeholder="e.g., 1500.00"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <Button 
                  onClick={prevStep}
                  variant="outline"
                  size="lg" 
                  className="flex-1"
                >
                  <ArrowLeft className="mr-2 w-4 h-4" /> Previous
                </Button>
                <Button 
                  onClick={handlePredict}
                  className="flex-1" 
                  size="lg" 
                  disabled={!isStep2Valid() || isLoading}
                >
                  {isLoading ? 'Analyzing...' : 'Predict Churn Risk'}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Result Card */}
        <ResultCard prediction={prediction} />
      </div>
    </div>
  );
};

export default ChurnUI;