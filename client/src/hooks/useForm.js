// https://youtu.be/VbUmKm6gjtc
// with component https://youtu.be/0bIKucQPbTY

import { useState, useCallback } from "react";
import { mapStateToPost } from "../helpers/merge";

const useForm = (initialState, validate) => {
  const [formData, setFormData] = useState(initialState);
  const [errors, setErrors] = useState({});
  const [cannotSubmit, setCannotSubmit] = useState(true);
  const [confirmation, setConfirmation] = useState(null);

  const setDataAndErrors = useCallback(
    (data) => {
      setConfirmation(null);
      setCannotSubmit(false);
      setFormData(data);
      let errors = validate(data);
      if (Object.keys(errors).length === 0) {
        setCannotSubmit(false);
      } else {
        setCannotSubmit(true);
      }
      setErrors(errors);
    },
    [validate]
  );

  const handleChange = useCallback(
    (e) => {
      let updatedData;
      const { name, value, checked, files, tagName, type } = e.target ?? {};

      if (
        tagName === "INPUT" ||
        tagName === "TEXTAREA" ||
        tagName === "SELECT"
      ) {
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
      const postData = mapStateToPost(formData);
      if (Object.keys(errors).length !== 0) return;
      setCannotSubmit(true);
      cb(postData);
    };
  };

  return {
    formData,
    errors,
    handleChange,
    setErrors,
    handleSubmit,
    confirmation,
    setConfirmation,
    cannotSubmit,
  };
};
export default useForm;
