export type LoanSearchRequest = {
  amount: number;
  durationInMonths: number;
  loanType?: string;
  income?: number;
  dependents?: number;
};
