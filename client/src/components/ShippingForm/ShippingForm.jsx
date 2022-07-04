import styles from "./shippingform.module.css";
import * as api from "../../api";

const ShippingForm = ({
  setShippingData,
  shippingData,
  setResponseMessage,
  setShippingRate,
}) => {
  const handleChange = (e) => {
    setShippingData({ ...shippingData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // if (Object.values(shippingData) === "") {
    //   console.log("Missing something");
    // }
    // setShippingData(Object.assign(shippingData, {}));
    try {
      const { data } = await api.sendShippingData(shippingData);
      console.log(data);
      setShippingRate(data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.shipping_form_container}>
      <p>Please enter your shipping details.</p>
      <hr />
      <form action="submit" onSubmit={handleSubmit} className={styles.form}>
        <div className={styles.fields2}>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="firstname">
              First name
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="firstname"
              name="firstname"
              onChange={(e) => handleChange(e)}
              value={shippingData.firstname}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="lastname">
              Last name
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="lastname"
              name="lastname"
              onChange={(e) => handleChange(e)}
              value={shippingData.lastname}
              required
            />
          </label>
        </div>
        <div className={styles.fields2}>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="cellphone">
              Contact Number
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="cellphone"
              name="cellphone"
              value={shippingData.cellphone}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="email">
              Email
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="email"
              name="email"
              value={shippingData.email}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
        </div>
        <label className={styles.field}>
          <span className={styles.field__label} htmlFor="street">
            Street Address
          </span>
          <input
            required
            className={styles.field__input}
            type="text"
            id="street"
            name="street"
            onChange={(e) => handleChange(e)}
            value={shippingData.street}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.field__label} htmlFor="area">
            Area/Suburb
          </span>
          <input
            className={styles.field__input}
            type="text"
            id="area"
            name="area"
            value={shippingData.area}
            onChange={(e) => handleChange(e)}
            required
          />
        </label>
        <div className={styles.fields2}>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="zipcode">
              Zip code
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="zipcode"
              name="zipcode"
              value={shippingData.zipcode}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="city">
              City
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="city"
              name="city"
              value={shippingData.city}
              onChange={(e) => handleChange(e)}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="province">
              Province
            </span>
            <select
              className={styles.field__input}
              id="province"
              name="province"
              onChange={(e) => handleChange(e)}
              value={shippingData.province}
              required
            >
              <option hidden value>
                -- select an option --
              </option>
              <option value="NL">Kwa-Zulu-Natal</option>
              <option value="WP">Western Province</option>
              <option value="GT">Gauteng</option>
              <option value="LP">Limpopo</option>
              <option value="NC">Northern Cape </option>
              <option value="NW">North West</option>
              <option value="FS">Free State</option>
              <option value="EC">Eastern Cape</option>
            </select>
          </label>
        </div>
        <hr />
        <button type="submit" className={styles.button}>
          Calculate Shipping
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
