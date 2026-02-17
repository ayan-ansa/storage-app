import axios from "./axios";

export const getAllUsers = async () => {
  try {
    const response = await axios.get("/users");
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const logout = async (userId) => {
  try {
    const response = await axios.post(`/users/${userId}/logout`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const softDeleteUser = async (userId) => {
  console.log("Soft deleting user with ID:", userId);
  try {
    const response = await axios.delete(`/users/${userId}/soft`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const hardDeleteUser = async (userId) => {
  console.log("Hard deleting user with ID:", userId);
  try {
    const response = await axios.delete(`/users/${userId}/hard`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const recover = async (userId) => {
  try {
    const response = await axios.patch(`/users/${userId}/recover`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const changeRole = async (userId, role) => {
  try {
    const response = await axios.patch(`/users/${userId}/role`, { role });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const getUserDirectory = async (userId, dirId) => {
  try {
    const response = await axios.get(`/users/${userId}/${dirId || ""}`);
    console.log("User directories: ",response.data)
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
