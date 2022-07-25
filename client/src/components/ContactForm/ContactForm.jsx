import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import contactFormStyles from "./contactform.module.css";
import * as api from "../../services/api";
import { motion } from "framer-motion";
import validate from "../../validations/contact";
import Input from "../Forms/Input";
import { ResponseBlock } from "../";

const initialState = {
  firstName: {
    value: "",
    required: true,
  },
  lastName: {
    value: "",
    required: true,
  },
  email: {
    value: "",
    required: true,
    requiredMessage: "Email address is required!",
    email: true,
    emailMessage: "Email address is not valid!",
  },
  cellphone: {
    value: "",
    required: true,
  },
  message: {
    value: "",
    required: true,
    minLength: 1,
    minLengthMessage: "Must have a message!",
    maxLength: 300,
    maxLengthMessage: "Too many characters!",
  },
};

export default function ContactForm() {
  const {
    formData,
    errors,
    handleChange,
    handleSubmit,
    confirmation,
    setConfirmation,
    cannotSubmit,
  } = useForm(initialState, validate);

  const submitFn = async (formData) => {
    try {
      const { data } = await api.sendContactData(formData);
      setConfirmation(data);
    } catch (error) {
      setConfirmation(error);
    }
  };

  useEffect(() => {
    console.log(errors);
  }, []);

  return (
    <div className={contactFormStyles.contact_form_container}>
      <hr />
      <form
        noValidate
        action="submit"
        onSubmit={handleSubmit(submitFn)}
        className={contactFormStyles.form}
      >
        <div className={contactFormStyles.fields2}>
          <Input
            value={formData.firstName.value}
            id={"firstName"}
            name={"firstName"}
            text={"First Name"}
            onChange={(e) => handleChange(e)}
          />
          <label className={contactFormStyles.field}>
            <span
              className={contactFormStyles.field__label}
              htmlFor="firstName"
            >
              First name
            </span>
            <input
              className={contactFormStyles.field__input}
              type="text"
              id="firstName"
              name="firstName"
              onChange={(e) => handleChange(e)}
              value={formData.firstName.value}
              required
            />
            {errors.firstName && (
              <p style={{ fontSize: "10px", color: "red" }}>
                {errors.firstName}
              </p>
            )}
          </label>
          <label className={contactFormStyles.field}>
            <span className={contactFormStyles.field__label} htmlFor="lastName">
              Last name
            </span>
            <input
              className={contactFormStyles.field__input}
              type="text"
              id="lastName"
              name="lastName"
              onChange={(e) => handleChange(e)}
              value={formData.lastName.value}
              required
            />
            {errors.lastName && (
              <p style={{ fontSize: "10px", color: "red" }}>
                {errors.lastName}
              </p>
            )}
          </label>
        </div>
        <div className={contactFormStyles.fields2}>
          <label className={contactFormStyles.field}>
            <span
              className={contactFormStyles.field__label}
              htmlFor="cellphone"
            >
              Contact Number
            </span>
            <input
              className={contactFormStyles.field__input}
              type="text"
              id="cellphone"
              name="cellphone"
              value={formData.cellphone.value}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.cellphone && (
              <p style={{ fontSize: "10px", color: "red" }}>
                {errors.cellphone}
              </p>
            )}
          </label>
          <label className={contactFormStyles.field}>
            <span className={contactFormStyles.field__label} htmlFor="email">
              Email
            </span>
            <input
              className={contactFormStyles.field__input}
              type="text"
              id="email"
              name="email"
              value={formData.email.value}
              onChange={(e) => handleChange(e)}
              required
            />
            {errors.email && (
              <p style={{ fontSize: "10px", color: "red" }}>{errors.email}</p>
            )}
          </label>
        </div>
        <label className={contactFormStyles.field}>
          <span className={contactFormStyles.field__label}>MESSAGE</span>
          <textarea
            style={{ height: 100 }}
            required
            id="message"
            name="message"
            onChange={(e) => handleChange(e)}
            value={formData.message.value}
          />
          {errors.message && (
            <p style={{ fontSize: "10px", color: "red" }}>{errors.message}</p>
          )}
        </label>
        <hr />
        <button
          disabled={cannotSubmit}
          style={{
            backgroundColor: cannotSubmit ? "lightgrey" : "black",
          }}
          type="submit"
          className={contactFormStyles.button}
        >
          send
        </button>
      </form>
      {confirmation && <ResponseBlock res={confirmation} />}
    </div>
  );
}

// const errors = [1,3,4]
// const cannotSubmit = false
// const proceed = errors.length === 0 || cannotSubmit === false
// const disabled = !proceed
// proceed
// disabled
