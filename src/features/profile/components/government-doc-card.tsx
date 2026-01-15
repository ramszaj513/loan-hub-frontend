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
import { DOCUMENT_TYPES } from "../types/profile.types";

interface GovernmentDocCardProps {
  formData: FormData;
  disabled: boolean;
  onInputChange: (field: keyof FormData, value: string | number) => void;
}

export function GovernmentDocCard({
  formData,
  disabled,
  onInputChange,
}: GovernmentDocCardProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Government Document</CardTitle>
        <CardDescription>
          Your identification document details
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label htmlFor="documentType">Document Type</Label>
            <Select
              value={String(formData.governmentDocumentTypeId)}
              onValueChange={(value) =>
                onInputChange("governmentDocumentTypeId", Number(value))
              }
              disabled={disabled}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.id} value={String(type.id)}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="documentNumber">Document Number</Label>
            <Input
              id="documentNumber"
              value={formData.governmentDocumentNumber}
              onChange={(e) =>
                onInputChange("governmentDocumentNumber", e.target.value)
              }
              disabled={disabled}
              required
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
