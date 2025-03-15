const API_BASE_URL = import.meta.env.VITE_BASE_URL;

const API_URLS = {
  // auth routes
  signIn: () => `${API_BASE_URL}/auth/sign-in/email`,
  signUp: () => `${API_BASE_URL}/auth/sign-up/email`,
  signOut: () => `${API_BASE_URL}/auth/sign-out`,

  // image routes
  getAllImages: () => `${API_BASE_URL}/image/getAllImages`,
  uploadImage: () => `${API_BASE_URL}/image/uploadImage`,
  deleteImage: (id: string) => `${API_BASE_URL}/image/deleteImage/${id}`,
  deleteAllImages: (id: string) =>
    `${API_BASE_URL}/image/deleteAllImages/${id}`,

  //user routes
  getUserDetails: () => `${API_BASE_URL}/users/getUserDetails`,

  //profile routes
  updateUser: () => `${API_BASE_URL}/auth/update-user`,
  updatePassword: () => `${API_BASE_URL}/auth/change-password`,
  deleteUser: () => `${API_BASE_URL}/e`,
};

export { API_URLS };
