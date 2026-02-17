import axios from "./axios";

export const uploadFile = async (parentDirId, formData, onProgress) => {
  try {
    const response = await axios.post(`/file/${parentDirId || ""}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
      onUploadProgress: (progressEvent) => {
        const percent = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total,
        );
        onProgress && onProgress(percent);
      },
    });
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};

export const uploadFiles = async (parentDirId, formData, onProgress) => {
  try {
    const response = await axios.post(
      `/file/multiple/${parentDirId || ""}`,
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        onUploadProgress: (progressEvent) => {
          const percent = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total,
          );
          console.log(`Upload progress: ${percent}%`);
          onProgress && onProgress(percent);
        },
      },
    );
    return response.data;
  } catch (error) {
    return error?.response?.data;
  }
};
