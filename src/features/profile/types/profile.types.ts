export const DOCUMENT_TYPES = [
  { id: 1, name: "ID Card" },
  { id: 2, name: "Passport" },
  { id: 3, name: "Driver's License" },
];

export const JOB_TYPES = [
  { id: 1, name: "Full-time Employee" },
  { id: 2, name: "Part-time Employee" },
  { id: 3, name: "Self-employed" },
  { id: 4, name: "Contractor" },
  { id: 5, name: "Unemployed" },
  { id: 6, name: "Retired" },
  { id: 7, name: "Student" },
];

export const CURRENCIES = ["PLN", "EUR", "USD", "GBP"];

export interface FormData {
  firstName: string;
  lastName: string;
  birthDate: string;
  governmentDocumentTypeId: number;
  governmentDocumentNumber: string;
  jobTypeId: number;
  jobStartDate: string;
  jobEndDate: string;
  incomeAmount: number;
  incomeCurrency: string;
}

export const emptyFormData: FormData = {
  firstName: "",
  lastName: "",
  birthDate: "",
  governmentDocumentTypeId: 1,
  governmentDocumentNumber: "",
  jobTypeId: 1,
  jobStartDate: "",
  jobEndDate: "",
  incomeAmount: 0,
  incomeCurrency: "PLN",
};
