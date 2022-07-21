import { sendContactData } from "../api";

export const submitContactData = async (formData) => {
  try {
    const { data } = await api.sendContactData(formData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
