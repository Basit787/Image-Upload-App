import { API_URLS } from "./config";

export const updateProfile = async (userName: string) => {
  const response = await fetch(API_URLS.updateUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name: userName }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ?? `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

export const updatePassword = async (
  currentPassword: string,
  newPassword: string
) => {
  const response = await fetch(API_URLS.updatePassword(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      currentPassword,
      newPassword,
      revokeOtherSessions: true,
    }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ?? `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};

export const deleteAccount = async (password: string) => {
  const response = await fetch(API_URLS.deleteUser(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ password }),
    credentials: "include",
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(
      errorData.message ?? `HTTP error! status: ${response.status}`
    );
  }
  return response.json();
};
