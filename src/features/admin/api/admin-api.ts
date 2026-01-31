const IN_HOUSE_API_URL = import.meta.env.VITE_IN_HOUSE_API_URL;

export const OfferStatus = {
  Created: 1,
  Pending: 2,
  Accepted: 3,
  Rejected: 4,
} as const;

export type OfferStatus = (typeof OfferStatus)[keyof typeof OfferStatus];

export interface Money {
  amount: number;
  currencyCode: string;
}

export interface PersonalData {
  firstName: string;
  lastName: string;
  birthDate: string;
}

export interface LoanOffer {
  id: number;
  personalData: PersonalData;
  percentage: number;
  monthlyInstallment: Money;
  requestedAmount: Money;
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

export async function getAllOffers(): Promise<LoanOffer[]> {
  const response = await fetch(`${IN_HOUSE_API_URL}/api/offers/all`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch offers: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

export async function updateOfferStatus(
  offerId: number,
  status: OfferStatus
): Promise<void> {
  const statusMap: Record<OfferStatus, string> = {
    [OfferStatus.Created]: "Created",
    [OfferStatus.Pending]: "Pending",
    [OfferStatus.Accepted]: "Accepted",
    [OfferStatus.Rejected]: "Rejected",
  };

  const response = await fetch(`${IN_HOUSE_API_URL}/api/offers/${offerId}/status`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify({ status: statusMap[status] }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update offer status: ${response.status} ${response.statusText}`);
  }
}
