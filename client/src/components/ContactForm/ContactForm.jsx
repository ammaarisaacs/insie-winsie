import useForm from "../../hooks/useForm";
import contactFormStyles from "./contactform.module.css";
import * as api from "../../services/api";
import { AnimatePresence } from "framer-motion";
import validate from "../../validations";
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

  return (
    <AnimatePresence>
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
        </form>
        {confirmation && <ResponseBlock res={confirmation} />}
      </div>
    </AnimatePresence>
  );
}

// const errors = [1,3,4]
// const cannotSubmit = false
// const proceed = errors.length === 0 || cannotSubmit === false
// const disabled = !proceed
// proceed
// disabled
