import axios from "./axios";

export const register = async (userData) => {
  try {
    const response = await axios.post("/auth/register", userData);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const login = async (userData) => {
  try {
    const response = await axios.post("/auth/login", userData);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const googleAuth = async (idToken) => {
  try {
    const response = await axios.post("/auth/google", {
      idToken,
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const logout = async () => {
  try {
    const response = await axios.post("/auth/logout");
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const logoutAll = async () => {
  try {
    const response = await axios.post("/auth/logout-all");
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
