import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { FormData } from "../types/profile.types";
import { CURRENCIES } from "../types/profile.types";

interface IncomeCardProps {
  formData: FormData;
  disabled: boolean;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

export function IncomeCard({
  formData,
  disabled,
  onInputChange,
}: IncomeCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Information</CardTitle>
        <CardDescription>Your monthly income details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="incomeAmount">Monthly Income</Label>
            <Input
              id="incomeAmount"
              type="number"
              min="0"
              step="0.01"
              value={formData.incomeAmount}
              onChange={(e) =>
                onInputChange("incomeAmount", Number(e.target.value))
              }
              disabled={disabled}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="incomeCurrency">Currency</Label>
            <Select
              value={formData.incomeCurrency}
              onValueChange={(value) =>
                onInputChange("incomeCurrency", value)
              }
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select currency" />
              </SelectTrigger>
              <SelectContent>
                {CURRENCIES.map((currency) => (
                  <SelectItem key={currency} value={currency}>
                    {currency}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
