import { useEffect } from "react";
import useForm from "../../hooks/useForm";
import contactFormStyles from "./contactform.module.css";
import * as api from "../../services/api";
import { motion } from "framer-motion";

const initialState = {
  name: {
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
  password: {
    value: "",
    required: true,
    minLength: 6,
    minLengthMessage: "Password must be at least 6 characters long!",
    maxLength: 16,
    maxLengthMessage: "Too many characters!",
  },
  confirmPassword: {
    value: "",
    required: true,
    matchWith: "password",
    matchWithMessage: "Passwords must be equal!",
  },
  gender: {
    value: "",
    required: true,
  },
  difficulty: {
    value: "",
    required: true,
  },
  image: {
    value: {},
    required: true,
    file: true,
    allowedTypes: ["jpg", "jpeg", "png", "gif"],
    maxFileSize: 1024,
  },
  description: {
    value: "",
  },
  terms: {
    value: false,
    required: true,
    requiredMessage: "You need to accept our Terms and Conditions",
  },
};

const initialContactData = {
  firstName: "",
  lastName: "",
  email: "",
  cellphone: "",
  message: "",
};

export default function ContactForm() {
  const { formData, errors, handleChange, handleSubmit } =
    useForm(initialContactData);

  const submitFn = () => {
    console.log("submitted");
  };

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
              value={formData.firstname}
              required
            />
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
              value={formData.lastname}
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
              value={formData.cellphone}
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
              value={formData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        <label className={contactFormStyles.field}>
          <span className={contactFormStyles.field__label} htmlFor="street">
            Street Address
          </span>
          <input
            required
            className={contactFormStyles.field__input}
            type="text"
            id="street"
            name="street"
            onChange={(e) => handleChange(e)}
            value={formData.street}
          />
        </label>
        <label className={contactFormStyles.field}>
          <span className={contactFormStyles.field__label} htmlFor="area">
            Area/Suburb
          </span>
          <input
            className={contactFormStyles.field__input}
            type="text"
            id="area"
            name="area"
            value={formData.area}
            onChange={(e) => handleChange(e)}
            required
          />
        </label>
        <label className={contactFormStyles.field}>
          <span className={contactFormStyles.field__label}>MESSAGE</span>
          <textarea
            style={{ height: 100 }}
            required
            id="message"
            name="message"
            onChange={(e) => handleChange(e)}
            value={formData.message}
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
