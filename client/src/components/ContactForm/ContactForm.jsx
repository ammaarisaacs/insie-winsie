import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import contactFormStyles from "./contactform.module.css";
import * as api from "../../api";

const initialContactData = {
  firstName: "",
  lastName: "",
  email: "",
  cellphone: "",
  message: "",
};

export default function ContactForm() {
  const [contactData, setContactData] = useState(initialContactData);

  const handleChange = (e) => {
    setContactData({ ...contactData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.values(contactData) === "") {
    //   console.log("Missing something");
    // }
    setContactData(Object.assign(contactData, {}));
    console.log(contactData);
    try {
      const { data } = await api.sendContactData(contactData);
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={contactFormStyles.contact_form_container}>
      <hr />
      <form
        action="submit"
        onSubmit={handleSubmit}
        className={contactFormStyles.form}
      >
        <div className={contactFormStyles.fields2}>
          <label className={contactFormStyles.field}>
            <span
              className={contactFormStyles.field__label}
              htmlFor="firstname"
            >
              First name
            </span>
            <input
              className={contactFormStyles.field__input}
              type="text"
              id="firstname"
              name="firstname"
              onChange={(e) => handleChange(e)}
              value={contactData.firstname}
              required
            />
          </label>
          <label className={contactFormStyles.field}>
            <span className={contactFormStyles.field__label} htmlFor="lastname">
              Last name
            </span>
            <input
              className={contactFormStyles.field__input}
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) => handleChange(e)}
              value={contactData.lastname}
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
              value={contactData.cellphone}
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
              value={contactData.email}
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
            value={contactData.street}
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
            value={contactData.area}
            onChange={(e) => handleChange(e)}
            required
          />
        </label>
        <label className={contactFormStyles.field}>
          <span className={contactFormStyles.field__label}>MESSAGE</span>
          <textarea style={{ height: 100 }} required />
        </label>
        <hr />
        <button type="submit" className={contactFormStyles.button}>
          send
        </button>
      </form>
    </div>
  );
}
