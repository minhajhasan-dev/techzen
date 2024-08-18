import axios from "axios";

export const imageUpload = async (image) => {
  try {
    const formData = new FormData();
    formData.append("image", image);
    const { data } = await axios.post(
      `https://api.imgbb.com/1/upload?key=${
        import.meta.env.VITE_IMGBB_API_KEY
      }`,
      formData
    );
    return data.data.display_url;
  } catch (error) {
    if (error.response && error.response.data) {
      console.error("Error:", error.response.data);
    } else {
      console.error("Error:", error);
    }
    throw error;
  }
};
