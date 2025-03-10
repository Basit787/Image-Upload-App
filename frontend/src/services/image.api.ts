import { API_URLS } from "./config";

export const getAllImages = async () => {
  const response = await fetch(API_URLS.getAllImages(), {
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

export const uploadImage = async (formData: FormData) => {
  const response = await fetch(API_URLS.uploadImage(), {
    method: "POST",
    body: formData,
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

export const deleteImage = async (id: string) => {
  const response = await fetch(API_URLS.deleteImage(id), {
    method: "DELETE",
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

export const deleteAllImages = async (id: string) => {
  const response = await fetch(API_URLS.deleteAllImages(id), {
    method: "DELETE",
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
