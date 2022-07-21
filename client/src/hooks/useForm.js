// https://youtu.be/VbUmKm6gjtc
// with component https://youtu.be/0bIKucQPbTY

import { useState, useCallback } from "react";
import { formatFormData } from "../helpers/merge";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  const setDataAndErrors = useCallback(
    (data) => {
      setShowError(false);
      setFormData(data);
      let errors = validate(data);
      console.log(errors);
      setErrors(errors);
    },
    [validate]
  );

  const handleChange = useCallback(
    (e) => {
      let updatedData;
      const { name, value, checked, files, tagName, type } = e.target ?? {};

      if (tagName === "INPUT" || tagName === "TEXTAREA") {
        updatedData = {
          ...formData,
          [name]: {
            ...formData[name],
            value:
              type === "checkbox" ? checked : type === "file" ? files : value,
          },
        };
      }
      setDataAndErrors(updatedData, name);
    },
    [setDataAndErrors, formData]
  );

  const handleSubmit = (cb) => {
    return (e) => {
      e.preventDefault();
      setShowError(true);
      const postData = formatFormData(formData);
      if (Object.keys(errors).length !== 0) return;
      // this cb will come from services
      cb(postData);
    };
  };

  return {
    formData,
    errors,
    handleChange,
    setErrors,
    showError,
    handleSubmit,
  };
};
export default useForm;
