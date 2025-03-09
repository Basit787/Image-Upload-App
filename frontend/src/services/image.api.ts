import { API_URLS } from "./config";

export const getAllImages = async () => {
  const response = await fetch(API_URLS.getAllImages(), {
    method: "GET",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};
