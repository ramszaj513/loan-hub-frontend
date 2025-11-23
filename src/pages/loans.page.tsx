import LoanOffer from "@/features/loans/components/loan-offer";
import LoanSearchForm from "@/features/loans/components/loan-search-form";

function LoansPage() {
  return (
    <div className="min-h-screen bg-background">
      <div className="px-8 py-12">
        <div className="max-w-3xl mx-auto">
          <LoanSearchForm />
        </div>
      </div>

      {/* Content Section */}
      <div className="px-8 bg-background">
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
