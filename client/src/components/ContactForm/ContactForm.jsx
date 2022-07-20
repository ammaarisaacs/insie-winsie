import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import contactFormStyles from "./contactform.module.css";
import * as api from "../../services/api";
import { motion } from "framer-motion";
import validate from "../../validations/contact";

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

// const initialContactData = {
//   firstName: "",
//   lastName: "",
//   email: "",
//   cellphone: "",
//   message: "",
// };

export default function ContactForm() {
  const { formData, errors, handleChange, handleSubmit } = useForm(
    initialState,
    validate
  );

  const submitFn = () => {};

  // const [contactData, setContactData] = useState(initialContactData);

  // const handleChange = (e) => {
  //   setContactData({ ...contactData, [e.target.name]: e.target.value });
  // };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   // if (Object.values(contactData) === "") {
  //   //   console.log("Missing something");
  //   // }
  //   setContactData(Object.assign(contactData, {}));
  //   console.log(contactData);
  //   try {
  //     const { data } = await api.sendContactData(contactData);
  //     console.log(data);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  useEffect(() => {
    console.log(formData);
  }, [formData]);

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
          </label>
          {errors.firstName && <p>{errors.firstName}</p>}
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
        </label>
        <hr />
        <button type="submit" className={contactFormStyles.button}>
          send
        </button>
      </form>
    </div>
  );
}
