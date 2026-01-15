
import { useLocation, Navigate } from "react-router-dom";
import { LoanApplicationForm } from "@/features/loans/components/loan-application-form";
import type { LoanOfferData } from "@/features/loans/components/loan-offer";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

function LoanApplicationPage() {
  const location = useLocation();
  const offer = location.state?.offer as LoanOfferData | undefined;

  if (!offer) {
    return <Navigate to="/loans" replace />;
  }

  return (
    <div className="min-h-screen bg-muted/30 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <Button variant="ghost" className="pl-0 hover:bg-transparent hover:text-primary" asChild>
            <Link to="/loans">
              <ArrowLeft className="mr-2 h-4 w-4" /> Back to Offers
            </Link>
          </Button>
          <div className="mt-4">
            <h1 className="text-3xl font-bold tracking-tight">Finalize Your Loan</h1>
            <p className="text-muted-foreground mt-2">
              Please review your selected offer and complete the application below.
            </p>
          </div>
        </div>

        {/* Selected Offer Summary */}
        <div className="bg-card border rounded-lg p-6 flex flex-col sm:flex-row justify-between items-center gap-4 shadow-sm">
            <div className="flex items-center gap-4">
                <div 
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white font-bold text-xl"
                    style={{ backgroundColor: offer.bankColor || "#6b7280" }}
                >
                    {offer.bankInitial || "?"}
                </div>
                <div>
                    <h3 className="font-semibold text-lg">{offer.bankName || "Unknown Bank"}</h3>
                    <p className="text-sm text-muted-foreground">
                        {offer.termRange} Term
                    </p>
                </div>
            </div>
            <div className="text-right">
                <div className="text-sm text-muted-foreground uppercase tracking-wider">Loan Amount</div>
                <div className="text-2xl font-bold text-primary">
                    {offer.maxAmount.toLocaleString()} {offer.currency}
                </div>
                <div className="text-sm text-muted-foreground mt-1">
                    Monthly: {offer.monthlyInstallment?.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 }) || "--"} {offer.currency}
                </div>
            </div>
        </div>

        {/* Application Form */}
        <LoanApplicationForm offer={offer} />
      </div>
    </div>
  );
}

export default LoanApplicationPage;
