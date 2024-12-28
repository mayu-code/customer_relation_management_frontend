import axios from "axios";

export const API_BASE_URL = "http://localhost:8080";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const loginManager = (loginReq) => {
  return api.post("/auth/manager/login", loginReq);
};

export const loginAdmin = (loginReq) => {
  return api.post("/auth/admin/login", loginReq);
};

export const registerManager = (registerReq) => {
  return api.post("/auth/manager/register", registerReq);
};

export const registerAdmin = (registerReq) => {
  return api.post("/auth/admin/register", registerReq);
};

export const getManager = (jwt) => {
  return api.get("/manager/getManager", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};

export const getAdmin = (jwt) => {
  return api.get("/admin/getAdmin", {
    headers: {
      // Corrected from 'Headers' to 'headers'
      Authorization: `Bearer ${jwt}`,
    },
  });
};
