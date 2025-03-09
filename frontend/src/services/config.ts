import { API_BASE_URL } from "@/constants/app.constants";

const API_URLS = {
  // auth routes
  signIn: () => `${API_BASE_URL}/auth/sign-in/email`,
  signUp: () => `${API_BASE_URL}/auth/sign-up/email`,
  signOut: () => `${API_BASE_URL}/auth/sign-out`,

  // image routes
  getAllImages: () => `${API_BASE_URL}/image/getAllImages`,
};

export { API_URLS };
