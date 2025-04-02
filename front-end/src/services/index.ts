import axios from "axios";
import { env } from "../constant/config";
import { getCookies } from "../store/useCookies";

export const baseURL = env.JIRA_DEMO_URL;
console.log(baseURL);


const api = axios.create({
  baseURL: baseURL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 10000,
});

export const GET = async (path: string, header?: any) => {
  const config = {
    headers: { Authorization: `Bearer ${getCookies("authToken")}` },
  };
  try {
    const response = await api.get(`${path}`, header ? header : config);
    let data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error.response;
  }
};

export const POST = async (path: string, data: any, header?: any) => {
  const config = {
    headers: { Authorization: `Bearer ${getCookies("authToken")}` },
  };
  try {
    const response = await api.post(`${path}`, data, header ? header : config);
    data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error.response;
  }
};

export const PATCH = async (path: string, data: any) => {
  const config = {
    headers: { Authorization: `Bearer ${getCookies("authToken")}` },
  };
  try {
    const response = await api.patch(`${path}`, data, config);
    data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error.response;
  }
};

export const DELETE = async (path: string, data: any, header?: any) => {
  const config = {
    headers: { Authorization: `Bearer ${getCookies("authToken")}` },
  };
  try {
    const response = await api.delete(`${path}`, {
      headers: header ? header : config,
      data,
    });
    data = await response.data;
    return data;
  } catch (error: any) {
    console.log(error.response);
    throw error.response;
  }
};
