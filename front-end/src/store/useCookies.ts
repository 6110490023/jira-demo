import Cookies from "universal-cookie";

const config = {
  path: "/",
  expires: getExpire(),
};

const cookies = new Cookies();

function getExpire() {
  return new Date(new Date().getTime() + (1000 * 60 * 60 * 24 *  7));
}

export const setCookies = (name: string, value: any) => {
  cookies.set(name, value, { ...config });
};

export const getCookies = (name: string) => {
  return cookies.get(name);
};

export const removeCookies = (name: string, configCookies?: any) => {
  return cookies.remove(name, configCookies);
};
