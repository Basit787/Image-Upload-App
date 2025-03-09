import { CookieKeys } from "@/constants/app.constants";
import Cookies from "js-cookie";

export function getAccessToken() {
  const data = Cookies.get(CookieKeys.token);
  console.log("token", data);
  return data;
}

export function removeAccessToken() {
  return Cookies.remove(CookieKeys.token);
}
