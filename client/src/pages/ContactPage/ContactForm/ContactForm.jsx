import contactFormStyles from "./contactform.module.css";
import { Input, ResponseBlock } from "../../../components";
import useForm from "../../../hooks/useForm";
import validate from "../../../validations/validateForm";
import { submitContactForm } from "../../../services/ContactService";
import { motion, AnimatePresence } from "framer-motion";

const initialState = {
  firstName: {
    value: "",
    required: true,
    specialCharacters: false,
  },
  lastName: {
    value: "",
    required: true,
    specialCharacters: false,
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
    numeric: true,
    specialCharacters: false,
  },
  message: {
    value: "",
    required: true,
    minLength: 1,
    minLengthMessage: "Must have a message!",
    maxLength: 300,
    maxLengthMessage: "Too many characters!",
    specialCharacters: false,
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

  const fn = (postData) => submitContactForm(postData, setConfirmation);

  return (
    <AnimatePresence>
      <div className={contactFormStyles.contact_form_container}>
        <hr />
        <motion.form
          noValidate
          action="submit"
          onSubmit={handleSubmit(fn)}
          className={contactFormStyles.form}
        >
          <div className={contactFormStyles.fields2}>
            <Input
              value={formData.firstName.value}
              id={"firstName"}
              name={"firstName"}
              text={"First Name"}
              onChange={(e) => handleChange(e)}
              error={errors.firstName}
            />
            <Input
              value={formData.lastName.value}
              id={"lastName"}
              name={"lastName"}
              text={"Last Name"}
              onChange={(e) => handleChange(e)}
              error={errors.lastName}
            />
          </div>
          <div className={contactFormStyles.fields2}>
            <Input
              value={formData.cellphone.value}
              id={"cellphone"}
              name={"cellphone"}
              text={"Contact number"}
              onChange={(e) => handleChange(e)}
              error={errors.cellphone}
            />
            <Input
              value={formData.email.value}
              id={"email"}
              name={"email"}
              text={"Email"}
              onChange={(e) => handleChange(e)}
              error={errors.email}
            />
          </div>
          <label className={contactFormStyles.field}>
            <span className={contactFormStyles.field__label}>MESSAGE</span>
            <textarea
              style={{ minHeight: 100 }}
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
        </motion.form>
        {confirmation && <ResponseBlock res={confirmation} />}
      </div>
    </AnimatePresence>
  );
}
