import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { SlidersHorizontal } from "lucide-react";
import { Slider } from "@/components/ui/slider";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface LoanSearchFormProps {
  onSearch?: (amount: number, months: number, currency: string) => void;
}

const currencies = [
  { value: "USD", symbol: "$", label: "USD" },
  { value: "EUR", symbol: "€", label: "EUR" },
  { value: "GBP", symbol: "£", label: "GBP" },
  { value: "PLN", symbol: "zł", label: "PLN" },
];

function LoanSearchForm({ onSearch }: LoanSearchFormProps) {
  const [amount, setAmount] = useState(20000);
  const [months, setMonths] = useState(48);
  const [currency, setCurrency] = useState("USD");

  const handleSearch = () => {
    onSearch?.(amount, months, currency);
  };

  const currentCurrency = currencies.find((c) => c.value === currency);

  return (
    <Card className="w-full shadow-lg border-0 bg-card/80 backdrop-blur">
      <CardContent className="p-6">
        <div className="space-y-6">
          {/* Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-5 w-5 text-muted-foreground" />
              <h2 className="text-lg font-semibold">Adjust Your Search</h2>
            </div>
            <span className="text-xs text-muted-foreground uppercase tracking-wider border rounded-full px-3 py-1">
              Personal Loan
            </span>
          </div>

          {/* Input Fields - Side by Side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Amount Input with Currency Selector */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Loan Amount</label>
              <div className="flex gap-2 items-stretch">
                <div className="relative flex-1">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                    {currentCurrency?.symbol}
                  </span>
                  <Input
                    type="number"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="pl-7 text-lg font-semibold h-12 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                  />
                </div>
                <Select value={currency} onValueChange={setCurrency}>
                  <SelectTrigger className="w-24 !h-12 shrink-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {currencies.map((c) => (
                      <SelectItem key={c.value} value={c.value}>
                        {c.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Duration Input */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <div className="relative">
                <Input
                  type="number"
                  value={months}
                  onChange={(e) => setMonths(Number(e.target.value))}
                  className="text-lg font-semibold h-12 pr-20 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground">
                  months
                </span>
              </div>
            </div>
          </div>

          {/* Sliders - Side by Side */}
          <div className="grid grid-cols-2 gap-6">
            {/* Amount Slider */}
            <div className="space-y-3">
              <Slider
                value={[amount]}
                onValueChange={(value) => setAmount(value[0])}
                min={1000}
                max={100000}
                step={1000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>{currentCurrency?.symbol}1,000</span>
                <span>{currentCurrency?.symbol}100,000</span>
              </div>
            </div>

            {/* Duration Slider */}
            <div className="space-y-3">
              <Slider
                value={[months]}
                onValueChange={(value) => setMonths(value[0])}
                min={6}
                max={120}
                step={6}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>6 months</span>
                <span>120 months</span>
              </div>
            </div>
          </div>

          {/* Search Button */}
          <Button className="w-full" size="lg" onClick={handleSearch}>
            Update Results
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}

export default LoanSearchForm;