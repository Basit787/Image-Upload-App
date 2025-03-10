import { API_URLS } from "./config";

export const getUserDetails = async () => {
  const response = await fetch(API_URLS.getUserDetails(), {
    method: "GET",
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
