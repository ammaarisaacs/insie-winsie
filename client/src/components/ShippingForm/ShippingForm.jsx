import { useState } from "react";
import styles from "./shippingform.module.css";
import { useStateContext } from "../../context/StateContext";
import { sendShippingData } from "../../services/OrderService";
import Input from "../Forms/Input";
import { mapStateToPost } from "../../helpers/merge";
import ResponseBlock from "../ResponseBlock/ResponseBlock";

const ShippingForm = ({
  setNotClickable,
  setOrderData,
  cartItems,
  totalPrice,
}) => {
  const { setShippingRate, shippingForm, billingForm } = useStateContext();

  const {
    formData,
    errors,
    handleChange: handleSuperChange,
    handleSubmit,
    confirmation,
    setConfirmation,
    cannotSubmit,
  } = shippingForm;

  const {
    formData: billingFormData,
    errors: billingErrors,
    handleChange: handleBillChange,
    cannotSubmit: cannotSubmitBill,
  } = billingForm;

  const [isSame, setIsSame] = useState(true);

  const getShippingCharge = async (e) => {
    const shippingPostData = mapStateToPost(formData);
    const billingPostData = mapStateToPost(billingFormData);

    try {
      const { data } = await sendShippingData(shippingPostData);
      setOrderData({
        shipping: { ...shippingPostData, method: data },
        ...(isSame === false && { billing: billingPostData }),
        cart: { items: cartItems, total: parseFloat(totalPrice.toFixed(2)) },
      });
      setShippingRate(data.charge);
      setNotClickable(false);
      // showToast("Success");
      setConfirmation("Shipping sorted!");
    } catch (error) {
      setNotClickable(true);
      setShippingRate(null);
      setConfirmation(error);
      // showToast(error.response.data);
    }
  };

  return (
    <div className={styles.shipping_form_container}>
      <p>Please enter your shipping details.</p>
      <hr />
      <form
        action="submit"
        onSubmit={handleSubmit(getShippingCharge)}
        className={styles.form}
      >
        <div className={styles.fields2}>
          <Input
            value={formData.firstName.value}
            id={"firstName"}
            name={"firstName"}
            text={"First Name"}
            onChange={(e) => handleSuperChange(e)}
            error={errors.firstName}
          />
          <Input
            value={formData.lastName.value}
            id={"lastName"}
            name={"lastName"}
            text={"Last Name"}
            onChange={(e) => handleSuperChange(e)}
            error={errors.lastName}
          />
        </div>
        <div className={styles.fields2}>
          <Input
            value={formData.cellphone.value}
            id={"cellphone"}
            name={"cellphone"}
            text={"Contact number"}
            onChange={(e) => handleSuperChange(e)}
            error={errors.cellphone}
          />
          <Input
            value={formData.email.value}
            id={"email"}
            name={"email"}
            text={"Email"}
            onChange={(e) => handleSuperChange(e)}
            error={errors.email}
          />
        </div>
        <Input
          value={formData.street.value}
          id={"street"}
          name={"street"}
          text={"Street"}
          onChange={(e) => handleSuperChange(e)}
          error={errors.street}
        />
        <Input
          value={formData.area.value}
          id={"area"}
          name={"area"}
          text={"Area"}
          onChange={(e) => handleSuperChange(e)}
          error={errors.area}
        />
        <div className={styles.fields2}>
          <Input
            value={formData.zipcode.value}
            id={"zipcode"}
            name={"zipcode"}
            text={"Zipcode"}
            onChange={(e) => handleSuperChange(e)}
            error={errors.zipcode}
          />
          <Input
            value={formData.city.value}
            id={"city"}
            name={"city"}
            text={"City"}
            onChange={(e) => handleSuperChange(e)}
            error={errors.city}
          />
          <label className={styles.field}>
            <span className={styles.field__label} htmlFor="province">
              Province
            </span>
            <select
              className={styles.field__input}
              id="province"
              name="province"
              onChange={(e) => handleSuperChange(e)}
              value={formData.province.value}
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
            {errors.province && (
              <p
                className={styles.field__error}
                style={{ fontSize: 10, color: "red" }}
              >
                {errors.province}
              </p>
            )}
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
          />
        </label>
        {!isSame && (
          <>
            <div className={styles.fields2}>
              <Input
                value={billingFormData.firstName.value}
                id={"firstName"}
                name={"firstName"}
                text={"First Name"}
                onChange={(e) => handleBillChange(e)}
                error={billingErrors.firstName}
              />
              <Input
                value={billingFormData.lastName.value}
                id={"lastName"}
                name={"lastName"}
                text={"Last Name"}
                onChange={(e) => handleBillChange(e)}
                error={billingErrors.lastName}
              />
            </div>
            <div className={styles.fields2}>
              <Input
                value={billingFormData.cellphone.value}
                id={"cellphone"}
                name={"cellphone"}
                text={"Contact number"}
                onChange={(e) => handleBillChange(e)}
                error={billingErrors.cellphone}
              />
              <Input
                value={billingFormData.email.value}
                id={"email"}
                name={"email"}
                text={"Email"}
                onChange={(e) => handleBillChange(e)}
                error={billingErrors.email}
              />
            </div>
            <Input
              value={billingFormData.street.value}
              id={"street"}
              name={"street"}
              text={"Street"}
              onChange={(e) => handleBillChange(e)}
              error={billingErrors.street}
            />
            <Input
              value={billingFormData.area.value}
              id={"area"}
              name={"area"}
              text={"Area"}
              onChange={(e) => handleBillChange(e)}
              error={billingErrors.area}
            />
            <div className={styles.fields2}>
              <Input
                value={billingFormData.zipcode.value}
                id={"zipcode"}
                name={"zipcode"}
                text={"Zipcode"}
                onChange={(e) => handleBillChange(e)}
                error={billingErrors.zipcode}
              />
              <Input
                value={billingFormData.city.value}
                id={"city"}
                name={"city"}
                text={"City"}
                onChange={(e) => handleBillChange(e)}
                error={billingErrors.city}
              />
              <label className={styles.field}>
                <span className={styles.field__label} htmlFor="province">
                  Province
                </span>
                <select
                  className={styles.field__input}
                  id="province"
                  name="province"
                  onChange={(e) => handleBillChange(e)}
                  value={billingFormData.province.value}
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
                {billingErrors.province && (
                  <p
                    className={styles.field__error}
                    style={{ fontSize: 10, color: "red" }}
                  >
                    {billingErrors.province}
                  </p>
                )}
              </label>
            </div>
          </>
        )}
        <hr />
        <button
          type="submit"
          className={styles.button}
          disabled={cannotSubmit || (isSame ? false : cannotSubmitBill)}
          style={{
            backgroundColor:
              cannotSubmit || (isSame ? false : cannotSubmitBill)
                ? "lightgrey"
                : "black",
          }}
        >
          Calculate Shipping
        </button>
        {confirmation && <ResponseBlock res={confirmation} />}
      </form>
    </div>
  );
};

export default ShippingForm;

// const errors = {}
// // const errors = {first: 'something'}
// let cannotSubmit = true;
// if (Object.keys(errors).length === 0) cannotSubmit = false
// cannotSubmit
// // the contact form was easy because you only chekcing errors and color doesn't matter to you
// const firstShip = true
// const firstBill = true
// const firstisSame = true
// const firstdisabled = (firstShip && (firstisSame ? true : firstBill))
// firstdisabled
// // with or
// const secondship = false
// const secondbill = false
// const secondsame = false
// const seconddisabled = (secondship  || (secondsame ? false : secondbill))
// seconddisabled
