const API_URL = import.meta.env.VITE_API_URL;

function getAuthHeaders(): HeadersInit {
  const token = localStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
  };
}

export interface UserDataDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  governmentDocumentTypeId: number;
  governmentDocumentNumber: string;
  jobTypeId: number;
  jobStartDate: string;
  jobEndDate?: string | null;
  incomeAmount: number;
  incomeCurrency: string;
}

export interface CreateUserDataDto {
  firstName: string;
  lastName: string;
  birthDate: string;
  governmentDocumentTypeId: number;
  governmentDocumentNumber: string;
  jobTypeId: number;
  jobStartDate: string;
  jobEndDate?: string | null;
  incomeAmount: number;
  incomeCurrency: string;
}

export interface UpdateUserDataDto {
  firstName?: string | null;
  lastName?: string | null;
  birthDate?: string | null;
  governmentDocumentTypeId?: number | null;
  governmentDocumentNumber?: string | null;
  jobTypeId?: number | null;
  jobStartDate?: string | null;
  jobEndDate?: string | null;
  incomeAmount?: number | null;
  incomeCurrency?: string | null;
}

export async function getUserData(): Promise<UserDataDto | null> {
  const response = await fetch(`${API_URL}/api/Users/data`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }

  return await response.json();
}

export async function createUserData(data: CreateUserDataDto): Promise<UserDataDto> {
  const response = await fetch(`${API_URL}/api/Users/data`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user data: ${response.statusText}`);
  }

  return await response.json();
}

export async function updateUserData(data: UpdateUserDataDto): Promise<UserDataDto> {
  const response = await fetch(`${API_URL}/api/Users/data`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user data: ${response.statusText}`);
  }

  return await response.json();
}
