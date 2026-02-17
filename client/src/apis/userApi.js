import axios from "./axios";

export const getUser = async () => {
  try {
    const response = await axios.get("/user");
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const disableAccount = async () => {
  try {
    const response = await axios.patch("/user/disable");
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteAccount = async () => {
  try {
    const response = await axios.delete("/user/delete");
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
