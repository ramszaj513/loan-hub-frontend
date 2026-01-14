import { Button } from "@/components/ui/button";
import LoanOffer from "@/features/loans/components/loan-offer";
import LoanSearchForm from "@/features/loans/components/loan-search-form";
import { ChevronDown } from "lucide-react";

function LoansPage() {
  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <div className="px-8 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <LoanSearchForm />
        </div>
      </div>

      {/* Results Section */}
      <div className="px-8 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Loan Offers</h2>
            <p className="text-muted-foreground">
              Based on your criteria, we found these top matches.
            </p>
          </div>

          {/* Loan Offers Grid */}
          <LoanOffer />

          {/* Load More */}
          <div className="flex justify-center mt-10">
            <Button variant="outline" size="lg">
              Load More Offers <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoansPage;
