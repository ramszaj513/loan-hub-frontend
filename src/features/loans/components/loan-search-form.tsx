import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
} from "@/components/ui/card";
import {
  Tabs,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import { 
  Wallet, 
  Layers, 
  Home, 
  Minus, 
  Plus, 
  ArrowRight 
} from "lucide-react";

function LoanSearchForm() {
  const [loanType, setLoanType] = useState("cash");
  const [amount, setAmount] = useState(20000);
  const [months, setMonths] = useState(48);

  const handleAmountChange = (delta: number) => {
    setAmount(prev => Math.max(1000, prev + delta));
  };

  const handleMonthsChange = (delta: number) => {
    setMonths(prev => Math.max(3, prev + delta));
  };

  return (
    <Card className="w-full max-w-7xl mx-auto">
      <CardContent>
        <Tabs value={loanType} onValueChange={setLoanType} className="w-full">
          {/* Standard Shadcn Tabs Look */}
          <TabsList className="grid w-full grid-cols-1 sm:grid-cols-3 h-auto">
            <TabsTrigger value="cash" className="py-2">
              <Wallet className="w-4 h-4 mr-2" />
              Cash Loan
            </TabsTrigger>
            <TabsTrigger value="consolidation" className="py-2">
              <Layers className="w-4 h-4 mr-2" />
              Consolidation
            </TabsTrigger>
            <TabsTrigger value="mortgage" className="py-2">
              <Home className="w-4 h-4 mr-2" />
              Mortgage
            </TabsTrigger>
          </TabsList>

          {/* We wrap the form in a generic div so it shows for all tabs, 
              or you can move this inside TabsContent if fields differ  per loan type */}
          <div className="mt-8 space-y-6">
            <div className="flex flex-col md:flex-row gap-6">
              
              {/* Amount Input */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="amount">How much do you need?</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleAmountChange(-1000)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="relative flex-1">
                    <Input 
                      id="amount"
                      type="number" 
                      value={amount}
                      onChange={(e) => setAmount(Number(e.target.value))}
                      className="pr-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">$</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleAmountChange(1000)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              {/* Duration Input */}
              <div className="flex-1 space-y-2">
                <Label htmlFor="months">For how long?</Label>
                <div className="flex items-center space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleMonthsChange(-12)}
                  >
                    <Minus className="h-4 w-4" />
                  </Button>
                  <div className="relative flex-1">
                    <Input 
                      id="months"
                      type="number" 
                      value={months}
                      onChange={(e) => setMonths(Number(e.target.value))}
                      className="pr-12 text-center [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
                    <span className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">months</span>
                  </div>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleMonthsChange(12)}
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>

            <Button className="w-full" size="lg">
              See offers <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </Tabs>
      </CardContent>
    </Card>
  );
}

export default LoanSearchForm;