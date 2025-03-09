import { API_URLS } from "./config";

export const signinAPI = async (email: string, password: string) => {
  const response = await fetch(API_URLS.signIn(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
    credentials: "include",
  });

  console.log("response", response);

  if (!response.ok) {
    throw new Error("Invalid email or password");
  }

  return response.json();
};

export const signupAPI = async (
  name: string,
  email: string,
  password: string
) => {
  const response = await fetch(API_URLS.signUp(), {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, email, password }),
    credentials: "include",
  });
  return await response.json();
};

export const signOutApi = async () => {
  return await fetch(API_URLS.signOut(), {
    method: "POST",
    credentials: "include",
  });
};
