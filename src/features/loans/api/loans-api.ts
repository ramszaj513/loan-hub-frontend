
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

export const applyForLoan = async (data: LoanApplicationRequest): Promise<LoanApplicationResponse> => {
    const response = await fetch(`${baseUrl}/api/Loans/apply`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
            "Accept": "text/plain",
            ...getAuthHeaders(),
        },
        body: JSON.stringify(data),
    });

    if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Failed to submit application: ${response.status} ${errorText}`);
    }

    return response.json();
};
