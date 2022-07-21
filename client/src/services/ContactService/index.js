import { sendContactData } from "../api";

export const submitContactData = async (formData) => {
  try {
    const { data } = await sendContactData(formData);
    console.log(data);
  } catch (error) {
    console.log(error);
  }
};
