export interface QuoteRequest {
    amount: number;
    termInMonths: number;
    currency: string;
}

export interface QuoteResponseMonthlyInstallment {
    amount: number;
    currencyCode: string;
}

export interface QuoteResponse {
    bankName: string;
    externalQuoteId: string;
    monthlyInstallment: QuoteResponseMonthlyInstallment;
}

export interface LoanApplicationRequestIncome {
    amount: number;
    currencyCode: string;
}

export interface LoanApplicationRequest {
    externalQuoteId: string;
    bankName: string;
    firstName: string;
    lastName: string;
    birthDate: string;
    governmentDocTypeId: number;
    governmentDocNumber: string;
    jobTypeId: number;
    jobStartDate: string;
    jobEndDate?: string;
    income: LoanApplicationRequestIncome;
}

export interface LoanApplicationResponseMonthlyInstallment {
    amount: number;
    currencyCode: string;
}

export interface LoanApplicationResponseRequestedAmount {
    amount: number;
    currencyCode: string;
}

export interface LoanApplicationResponse {
    id: number;
    percentage: number;
    bankName: string;
    monthlyInstallment: LoanApplicationResponseMonthlyInstallment;
    requestedAmount: LoanApplicationResponseRequestedAmount;
    requestedPeriodInMonth: number;
    statusId: number;
    statusDescription: string;
    inquireId: number;
    createDate: string;
    updateDate: string;
    approvedBy: string | null;
    documentLink: string | null;
    documentLinkValidDate: string | null;
}

const baseUrl = import.meta.env.VITE_API_URL || "";

const getAuthHeaders = (): Record<string, string> => {
    const token = localStorage.getItem("token");
    return token ? { Authorization: `Bearer ${token}` } : {};
};

export const getQuotes = async (params: QuoteRequest): Promise<QuoteResponse[]> => {
    const queryParams = new URLSearchParams({
        "RequestedAmount.Amount": params.amount.toString(),
        "RequestedAmount.CurrencyCode": params.currency,
        "TermInMonths": params.termInMonths.toString(),
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
    const response = await fetch(`${baseUrl}/api/Loans/applications`, {
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

export const getUserApplications = async (): Promise<LoanApplicationResponse[]> => {
    const response = await fetch(`${baseUrl}/api/Loans/applications`, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch applications: ${response.statusText}`);
    }

    return response.json();
};

export const getApplicationStatus = async (applicationId: string): Promise<LoanApplicationResponse> => {
    const response = await fetch(`${baseUrl}/api/Loans/applications/${applicationId}`, {
        method: "GET",
        headers: {
            "Accept": "text/plain",
            ...getAuthHeaders(),
        },
    });

    if (!response.ok) {
        throw new Error(`Failed to fetch application status: ${response.statusText}`);
    }

    return response.json();
};
