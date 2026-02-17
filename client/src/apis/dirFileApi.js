import axios from "./axios";

export const getItemList = async (dirId) => {
  try {
    const response = await axios.get(`/directory/${dirId || ""}`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const createDirectory = async (dirId, name) => {
  try {
    const response = await axios.post(`/directory/${dirId || ""}`, {
      dirname: name,
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const renameFileOrDirectory = async (item, name) => {
  try {
    const response = await axios.patch(`/${item.type}/${item._id}`, { name });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const deleteFileOrDirectory = async (item) => {
  try {
    const response = await axios.delete(`/${item.type}/${item._id}`);
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

