import { useState, useEffect } from "react";
import { useAuth } from "@/hooks";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { applyForLoan, type LoanApplicationRequest } from "@/features/loans/api/loans-api";
import { type LoanOfferData } from "./loan-offer";
import { Loader2, CheckCircle2 } from "lucide-react";

interface LoanApplicationFormProps {
  offer: LoanOfferData;
}

export function LoanApplicationForm({ offer }: LoanApplicationFormProps) {
  const { user, isAuthenticated } = useAuth();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState<Omit<LoanApplicationRequest, 'externalQuoteId'>>({
    firstName: "",
    lastName: "",
    birthDate: "",
    governmentDocTypeId: 1, // Default to 1 as we don't have types enum
    governmentDocNumber: "",
    jobTypeId: 1, // Default to 1
    jobStartDate: "",
    incomeAmount: 0,
    currency: offer.currency, // Use offer currency
  });

  // Autofill effect
  useEffect(() => {
    console.log("Autofill Check - Authenticated:", isAuthenticated, "User:", user);
    if (isAuthenticated && user?.userData) {
      const { 
        firstName, 
        lastName, 
        birthDate, 
        governmentDocumentTypeId, 
        governmentDocumentNumber,
        jobTypeId,
        jobStartDate,
        incomeAmount,
        incomeCurrency
      } = user.userData;

      const safeFormatDate = (dateStr?: string | null) => {
        if (!dateStr) return "";
        try {
            const d = new Date(dateStr);
            return isNaN(d.getTime()) ? "" : d.toISOString().split('T')[0];
        } catch {
            return "";
        }
      };

      setFormData(prev => ({
        ...prev,
        firstName: firstName || "",
        lastName: lastName || "",
        birthDate: safeFormatDate(birthDate),
        governmentDocTypeId: governmentDocumentTypeId || 1,
        governmentDocNumber: governmentDocumentNumber || "",
        jobTypeId: jobTypeId || 1,
        jobStartDate: safeFormatDate(jobStartDate),
        incomeAmount: incomeAmount || 0,
        currency: incomeCurrency || offer.currency
      }));
    }
  }, [isAuthenticated, user, offer.currency]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'number' ? Number(value) : value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // submission
      const isoBirthDate = formData.birthDate ? new Date(formData.birthDate).toISOString() : new Date().toISOString(); 
      const isoJobStartDate = formData.jobStartDate ? new Date(formData.jobStartDate).toISOString() : new Date().toISOString();

      const requestData: LoanApplicationRequest = {
        ...formData,
        externalQuoteId: offer.id,
        birthDate: isoBirthDate,
        jobStartDate: isoJobStartDate,
      };

      await applyForLoan(requestData);
      setSuccess(true);
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Failed to submit application");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <Card className="max-w-xl mx-auto border border-border/50 bg-card/80 backdrop-blur-sm shadow-xl overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/10 via-transparent to-teal-500/10 pointer-events-none" />
        <CardContent className="relative pt-10 pb-8 text-center space-y-6">
          {/* Animated success icon */}
          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-emerald-500/20 dark:bg-emerald-400/20 rounded-full blur-xl animate-pulse" />
              <div className="relative h-20 w-20 rounded-full bg-gradient-to-br from-emerald-500 to-teal-500 dark:from-emerald-400 dark:to-teal-400 flex items-center justify-center shadow-lg">
                <CheckCircle2 className="h-10 w-10 text-white" strokeWidth={2.5} />
              </div>
            </div>
          </div>
          
          {/* Title with gradient */}
          <div className="space-y-2">
            <h2 className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-400 dark:to-teal-400 bg-clip-text text-transparent">
              Application Submitted!
            </h2>
            <p className="text-muted-foreground text-sm max-w-sm mx-auto">
              Your loan application for <span className="font-semibold text-foreground">{offer.bankName}</span> has been successfully received.
            </p>
          </div>

          {/* Action button */}
          <Button 
            onClick={() => window.location.href = "/loans"} 
            className="mt-4 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 dark:from-emerald-500 dark:to-teal-500 dark:hover:from-emerald-600 dark:hover:to-teal-600 text-white shadow-md hover:shadow-lg transition-all duration-200"
          >
            Back to Loans
          </Button>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="max-w-2xl mx-auto shadow-lg">
      <CardHeader>
        <CardTitle>Complete Your Application</CardTitle>
        <CardDescription>
          Applying for a loan of <strong>{offer.maxAmount} {offer.currency}</strong> with <strong>{offer.bankName}</strong>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Personal Info */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="birthDate">Date of Birth</Label>
            <Input
              id="birthDate"
              name="birthDate"
              type="date"
              value={formData.birthDate}
              onChange={handleChange}
              required
            />
          </div>

          {/* Docs */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="governmentDocTypeId">Doc Type ID</Label>
              <Input
                id="governmentDocTypeId"
                name="governmentDocTypeId"
                type="number"
                value={formData.governmentDocTypeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="governmentDocNumber">Document Number</Label>
              <Input
                id="governmentDocNumber"
                name="governmentDocNumber"
                value={formData.governmentDocNumber}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          {/* Job & Income */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="jobTypeId">Job Type ID</Label>
              <Input
                id="jobTypeId"
                name="jobTypeId"
                type="number"
                value={formData.jobTypeId}
                onChange={handleChange}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="jobStartDate">Job Start Date</Label>
              <Input
                id="jobStartDate"
                name="jobStartDate"
                type="date"
                value={formData.jobStartDate}
                onChange={handleChange}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="incomeAmount">Annual Income ({offer.currency})</Label>
            <Input
              id="incomeAmount"
              name="incomeAmount"
              type="number"
              value={formData.incomeAmount}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-500 bg-red-50 p-3 rounded-md">
              {error}
            </div>
          )}

          <div className="pt-4">
            <Button type="submit" className="w-full" size="lg" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" /> Submitting...
                </>
              ) : (
                "Submit Application"
              )}
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  );
}
