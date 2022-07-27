import { useState } from "react";
import styles from "./shippingform.module.css";
import { useStateContext } from "../../context/StateContext";
import { getShippingCharge } from "../../services/OrderService";

// can have initial data array (call it formConfig or something)
// each input is an object in the array
// can do this
// formConfig.map(item=>{
//   return <Input {...item}></Input>
// })

const ShippingForm = ({
  setNotClickable,
  setOrderData,
  cartItems,
  totalPrice,
}) => {
  const {
    setShippingData,
    shippingData,
    showToast,
    billingData,
    setBillingData,
    setShippingRate,
  } = useStateContext();

  const [isSame, setIsSame] = useState(true);

  const handleChange = (e, formData, setFormData) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const getShippingCharge = async (e) => {
    e.preventDefault();
    // check if anything is empty

    try {
      const { data } = await getShippingCharge(shippingData);
      setOrderData({
        shipping: { ...shippingData, method: data },
        ...(!isSame && { billing: billingData }),
        cart: { items: cartItems, total: parseFloat(totalPrice.toFixed(2)) },
      });
      setShippingRate(data.charge);
      // more validation here
      setNotClickable(false);
      showToast("Success");
    } catch (error) {
      setNotClickable(true);
      setShippingRate(null);
      showToast(error.response.data);
    }
  };

  return (
    <div className={styles.shipping_form_container}>
      <p>Please enter your shipping details.</p>
      <hr />
      <form
        action="submit"
        onSubmit={getShippingCharge}
        className={styles.form}
      >
        <div className={styles.fields2}>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="firstname">
              First name
            </span>
            <input
              className={styles.field__input}
              type="text"
              id="firstName"
              name="firstName"
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
              value={shippingData.firstName}
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
              id="lastName"
              name="lastName"
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
              value={shippingData.lastName}
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
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
              required
            />
          </label>
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="email">
              Email
            </span>
            <input
              className={styles.field__input}
              type="email"
              id="email"
              name="email"
              value={shippingData.email}
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
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
            onChange={(e) => handleChange(e, shippingData, setShippingData)}
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
            onChange={(e) => handleChange(e, shippingData, setShippingData)}
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
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
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
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
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
              onChange={(e) => handleChange(e, shippingData, setShippingData)}
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
        <label className={styles.field__checkbox}>
          <span className={styles.field__label} htmlFor="billAddress">
            Billing and Shipping address are the same?
          </span>
          <input
            className={styles.field__input__checkbox}
            type="checkbox"
            id="billAddress"
            name="billAddress"
            defaultChecked={isSame}
            onChange={() => setIsSame(!isSame)}
            // value={billingData.billAddress}
            // required
          />
        </label>
        {!isSame && (
          <>
            <div className={styles.fields2}>
              <label className={styles.field}>
                <span className={styles.field__label} htmlFor="firstname">
                  First name
                </span>
                <input
                  className={styles.field__input}
                  type="text"
                  id="firstName"
                  name="firstName"
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
                  value={billingData.firstName}
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
                  id="lastName"
                  name="lastName"
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
                  value={billingData.lastName}
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
                  value={billingData.cellphone}
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
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
                  value={billingData.email}
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
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
                onChange={(e) => handleChange(e, billingData, setBillingData)}
                value={billingData.street}
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
                value={billingData.area}
                onChange={(e) => handleChange(e, billingData, setBillingData)}
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
                  value={billingData.zipcode}
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
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
                  value={billingData.city}
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
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
                  onChange={(e) => handleChange(e, billingData, setBillingData)}
                  value={billingData.province}
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
          </>
        )}
        <hr />
        <button type="submit" className={styles.button}>
          Calculate Shipping
        </button>
      </form>
    </div>
  );
};

export default ShippingForm;
