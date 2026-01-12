import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import type { FormData } from "../types/profile.types";

interface PersonalInfoCardProps {
  formData: FormData;
  disabled: boolean;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

export function PersonalInfoCard({
  formData,
  disabled,
  onInputChange,
}: PersonalInfoCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Personal Information</CardTitle>
        <CardDescription>Your basic personal details</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              value={formData.firstName}
              onChange={(e) => onInputChange("firstName", e.target.value)}
              disabled={disabled}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              value={formData.lastName}
              onChange={(e) => onInputChange("lastName", e.target.value)}
              disabled={disabled}
              required
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="birthDate">Date of Birth</Label>
          <Input
            id="birthDate"
            type="date"
            value={formData.birthDate}
            onChange={(e) => onInputChange("birthDate", e.target.value)}
            disabled={disabled}
            required
          />
        </div>
      </CardContent>
    </Card>
  );
}
