import { BlurText } from "@/components/ui";
import LoanOffer from "@/features/loans/components/loan-offer";
import LoanSearchForm from "@/features/loans/components/loan-search-form";

function LoansPage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section with Background */}
      <div className="bg-background relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div
          className="absolute inset-0 bg-background"
          style={{ backgroundColor: "hsl(var(--background))" }}
        ></div>

        <div className="relative z-10 text-center px-8">
          <BlurText
            text="Find Your Perfect Loan"
            delay={150}
            animateBy="words"
            direction="top"
            className="text-5xl md:text-6xl font-bold mb-4 leading-tight text-center justify-center"
          />
          <p className="text-xl max-w-2xl mx-auto">
            Search and compare loan options that match your needs with
            competitive rates and fast approvals
          </p>
        </div>
      </div>

      <LoanSearchForm />

      {/* Content Section */}
      <div className="px-8 py-12 bg-background">
        <div className="max-w-5xl mx-auto">
          {/* Available Loans */}
          <div className="mb-6">
            <h2 className="text-2xl font-semibold mb-4">
              Available Loan Options
            </h2>
          </div>

          <div className="space-y-4">
            <LoanOffer />
          </div>
        </div>
      </div>
    </div>
  );
}
export default LoansPage;
