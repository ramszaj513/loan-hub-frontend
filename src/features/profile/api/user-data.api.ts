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

export async function getUserData(userId: string): Promise<UserDataDto | null> {
  const response = await fetch(`${API_URL}/api/Users/${userId}/data`, {
    method: "GET",
    headers: getAuthHeaders(),
  });

  // User doesn't have data yet - this is not an error
  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`Failed to fetch user data: ${response.statusText}`);
  }

  return await response.json();
}

export async function createUserData(
  userId: string,
  data: UserDataDto
): Promise<UserDataDto> {
  const response = await fetch(`${API_URL}/api/Users/${userId}/data`, {
    method: "POST",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create user data: ${response.statusText}`);
  }

  return await response.json();
}

export async function updateUserData(
  userId: string,
  data: UserDataDto
): Promise<UserDataDto> {
  const response = await fetch(`${API_URL}/api/Users/${userId}/data`, {
    method: "PUT",
    headers: getAuthHeaders(),
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to update user data: ${response.statusText}`);
  }

  return await response.json();
}
