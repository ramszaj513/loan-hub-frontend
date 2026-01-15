
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import LoanOffer, { type LoanOfferData } from "@/features/loans/components/loan-offer";
import LoanSearchForm from "@/features/loans/components/loan-search-form";
import { getQuotes } from "@/features/loans/api/loans-api";
import { ChevronDown, Loader2 } from "lucide-react";

function LoansPage() {
  const navigate = useNavigate();
  const [offers, setOffers] = useState<LoanOfferData[]>([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false);

  const handleSearch = async (amount: number, months: number, currency: string) => {
    try {
      setLoading(true);
      setSearched(true);
      const quotes = await getQuotes({ amount, termInMonths: months, currency });
      
      // Bank color mapping
      const bankColors: Record<string, string> = {
        "In House Bank": "#dc3545",
      };

      // Map API quotes to UI offers
      const mappedOffers: LoanOfferData[] = quotes.map((quote) => {
        const bankColor = bankColors[quote.bankName] || "#6b7280";
        const bankInitial = quote.bankName.charAt(0).toUpperCase();

        return {
          id: quote.externalQuoteId,
          bankName: quote.bankName,
          bankInitial,
          bankColor,
          apr: 5.5, 
          maxAmount: amount,
          termRange: `${months} mo`,
          monthlyInstallment: quote.monthlyInstallment,
          currency: quote.currency
        };
      });

      setOffers(mappedOffers);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleSelectOffer = (offer: LoanOfferData) => {
    navigate("/loans/apply", { state: { offer } });
  };

  return (
    <div className="min-h-screen">
      {/* Search Section */}
      <div className="px-8 py-12 relative z-10">
        <div className="max-w-6xl mx-auto">
          <LoanSearchForm onSearch={handleSearch} />
        </div>
      </div>

      {/* Results Section */}
      <div className="px-8 pb-16 relative z-10">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold">Loan Offers</h2>
            <p className="text-muted-foreground">
              {searched 
                ? `Found ${offers.length} offers based on your criteria.` 
                : "Enter your criteria above to find the best loan offers for you."}
            </p>
          </div>

          {/* Loading State */}
          {loading && (
             <div className="flex justify-center py-20">
               <Loader2 className="h-8 w-8 animate-spin text-primary" />
             </div>
          )}

          {/* Loan Offers Grid */}
          {!loading && offers.length > 0 && (
            <LoanOffer offers={offers} onSelect={handleSelectOffer} />
          )}
          
          {/* No Results */}
          {!loading && searched && offers.length === 0 && (
             <div className="text-center py-10 text-muted-foreground">
               No offers found for these criteria. Try adjusting your search.
             </div>
          )}

          {/* Load More (Only show if we have offers - mocked interaction) */}
          {!loading && offers.length > 0 && (
            <div className="flex justify-center mt-10">
              <Button variant="outline" size="lg">
                Load More Offers <ChevronDown className="ml-2 h-4 w-4" />
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoansPage;
