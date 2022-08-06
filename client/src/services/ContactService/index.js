import * as api from "../api";

export const submitContactForm = async (formData, setConfirmation) => {
  try {
    const { data } = await api.sendContactData(formData);
    setConfirmation(data);
  } catch (error) {
    setConfirmation(error);
  }
};
