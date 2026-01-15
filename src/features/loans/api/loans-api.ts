
export interface QuoteRequest {
    amount: number;
    termInMonths: number;
    currency: string;
}

export interface QuoteResponse {
    bankName: string;
    monthlyInstallment: number;
    externalQuoteId: string;
    currency: string;
}

export interface LoanApplicationRequest {
    externalQuoteId: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    governmentDocTypeId: number;
    governmentDocNumber: string;
    jobTypeId: number;
    jobStartDate: string;
    jobEndDate?: string;
    incomeAmount: number;
    currency: string;
}

export interface LoanApplicationResponse {
    externalOfferId: string;
    submissionDate: string;
    success: boolean;
}

const baseUrl = import.meta.env.VITE_API_URL || "";

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getQuotes = async (params: QuoteRequest): Promise<QuoteResponse[]> => {
    const queryParams = new URLSearchParams({
        Amount: params.amount.toString(),
        TermInMonths: params.termInMonths.toString(),
        Currency: params.currency,
    });

    const response = await fetch(`${baseUrl}/api/Loans/quotes?${queryParams.toString()}`, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch quotes: ${response.statusText}`);
    }

    return response.json();
};

const currencyToEnumIndex: Record<string, number> = {
    "USD": 0, "EUR": 1, "GBP": 2, "JPY": 3, "AUD": 4,
    "CAD": 5, "CHF": 6, "CNY": 7, "SEK": 8, "NZD": 9
};

export const applyForLoan = async (data: LoanApplicationRequest): Promise<LoanApplicationResponse> => {
    const applicationData = {
        ExternalQuoteId: data.externalQuoteId,
        FirstName: data.firstName,
        LastName: data.lastName,
        BirthDate: data.birthDate,
        GovernmentDocTypeId: data.governmentDocTypeId,
        GovernmentDocNumber: data.governmentDocNumber,
        JobTypeId: data.jobTypeId,
        JobStartDate: data.jobStartDate,
        JobEndDate: data.jobEndDate || null,
        IncomeAmount: data.incomeAmount,
        Currency: currencyToEnumIndex[data.currency] ?? 0
    };

    const response = await fetch(`${baseUrl}/api/Loans/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(applicationData),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit application: ${response.status} ${errorText}`);
    }

    return response.json();
};
