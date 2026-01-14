import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export interface LoanOfferData {
  id: string;
  bankName: string;
  bankInitial: string;
  bankColor: string;
  apr: number;
  maxAmount: number;
  termRange: string;
}

interface LoanOfferCardProps {
  offer: LoanOfferData;
  onSelect?: (offer: LoanOfferData) => void;
}

export function LoanOfferCard({ offer, onSelect }: LoanOfferCardProps) {
  return (
    <Card className="border shadow-sm hover:shadow-lg transition-shadow bg-card">
      <CardContent className="p-6 space-y-4">
        {/* Header with bank info */}
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-full flex items-center justify-center text-white font-bold text-lg"
            style={{ backgroundColor: offer.bankColor }}
          >
            {offer.bankInitial}
          </div>
          <h3 className="font-semibold">{offer.bankName}</h3>
        </div>

        {/* APR - Centered */}
        <div className="text-center py-2">
          <p className="text-xs text-muted-foreground uppercase tracking-wider">
            APR As Low As
          </p>
          <p className="text-3xl font-bold text-primary">{offer.apr}%</p>
        </div>

        {/* Loan Details */}
        <div className="grid grid-cols-2 gap-4 py-2 border-t border-b">
          <div>
            <p className="text-xs text-muted-foreground">Max Amount</p>
            <p className="font-semibold">
              ${offer.maxAmount.toLocaleString()}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground">Term</p>
            <p className="font-semibold">{offer.termRange}</p>
          </div>
        </div>

        {/* CTA Button */}
        <Button
          variant="outline"
          className="w-full"
          onClick={() => onSelect?.(offer)}
        >
          Select Offer <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </CardContent>
    </Card>
  );
}

// Sample offers data
export const sampleOffers: LoanOfferData[] = [
  {
    id: "1",
    bankName: "Future Bank",
    bankInitial: "F",
    bankColor: "#8b5cf6",
    apr: 3.8,
    maxAmount: 50000,
    termRange: "12-60 mo",
  },
  {
    id: "2",
    bankName: "Liberty Lend",
    bankInitial: "L",
    bankColor: "#3b82f6",
    apr: 4.2,
    maxAmount: 75000,
    termRange: "24-84 mo",
  },
  {
    id: "3",
    bankName: "Summit",
    bankInitial: "S",
    bankColor: "#10b981",
    apr: 5.5,
    maxAmount: 35000,
    termRange: "12-48 mo",
  },
  {
    id: "4",
    bankName: "Prime Credit",
    bankInitial: "P",
    bankColor: "#f59e0b",
    apr: 6.1,
    maxAmount: 40000,
    termRange: "24-60 mo",
  },
  {
    id: "5",
    bankName: "Apex Finance",
    bankInitial: "A",
    bankColor: "#ef4444",
    apr: 4.8,
    maxAmount: 60000,
    termRange: "12-72 mo",
  },
  {
    id: "6",
    bankName: "Horizon",
    bankInitial: "H",
    bankColor: "#ec4899",
    apr: 5.9,
    maxAmount: 30000,
    termRange: "12-36 mo",
  },
];

// Default export for backwards compatibility
function LoanOffer() {
  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
      {sampleOffers.map((offer) => (
        <LoanOfferCard key={offer.id} offer={offer} />
      ))}
    </div>
  );
}

export default LoanOffer;
