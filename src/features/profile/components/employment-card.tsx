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
import { JOB_TYPES } from "@/features/loans/constants/loan-options";

interface EmploymentCardProps {
  formData: FormData;
  disabled: boolean;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

export function EmploymentCard({
  formData,
  disabled,
  onInputChange,
}: EmploymentCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Employment Information</CardTitle>
        <CardDescription>Your current employment status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="jobType">Employment Type</Label>
          <Select
            value={String(formData.jobTypeId)}
            onValueChange={(value) =>
              onInputChange("jobTypeId", Number(value))
            }
            disabled={disabled}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select employment type" />
            </SelectTrigger>
            <SelectContent>
              {JOB_TYPES.map((type) => (
                <SelectItem key={type.id} value={String(type.id)}>
                  {type.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="jobStartDate">Employment Start Date</Label>
            <Input
              id="jobStartDate"
              type="date"
              value={formData.jobStartDate}
              onChange={(e) =>
                onInputChange("jobStartDate", e.target.value)
              }
              disabled={disabled}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobEndDate">Employment End Date (Optional)</Label>
            <Input
              id="jobEndDate"
              type="date"
              value={formData.jobEndDate}
              onChange={(e) =>
                onInputChange("jobEndDate", e.target.value)
              }
              disabled={disabled}
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
