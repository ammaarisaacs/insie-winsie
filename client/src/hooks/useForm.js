// https://youtu.be/VbUmKm6gjtc
// with component https://youtu.be/0bIKucQPbTY

import { useState, useCallback } from "react";
import contact from "../validations/contact";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [showError, setShowError] = useState(false);

  // Set form data and errors

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

  // Change input handler

  const handleChange = useCallback(
    (e) => {
      let updatedData;

      // might have to use default values here

      const { name, value, checked, files, tagName, type } = e.target ?? {};

      // if (tagName === "INPUT" || tagName === "TEXTAREA") {
      //   updatedData = {
      //     ...formData,
      //     [name]:
      //       type === "checkbox" ? checked : type === "file" ? files : value,
      //   };
      // }

      if (tagName === "INPUT" || tagName === "TEXTAREA") {
        updatedData = {
          ...formData,
          [name]: {
            ...formData[name],
            value:
              type === "checkbox" ? checked : type === "file" ? files : value,
            // touched: true,
          },
        };
      }

      setDataAndErrors(updatedData, name);
    },
    [setDataAndErrors, formData]
  );

  // curry the function to implicitly have e

  const handleSubmit = (cb) => {
    return (e) => {
      e.preventDefault();

      // validate here
      // instead
      // you are already setting error in handleChange
      // so just check if  errors is empty or not
      if (Object.keys(errors).length !== 0) return;

      cb();
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
