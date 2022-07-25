import { calcLength } from "framer-motion";
import React from "react";

const ResponseBlock = ({ res }) => {
  let ui;

  console.log(res);

  const isError = res instanceof Error;
  const isArray = Array.isArray(res);
  const serverError = res?.response?.data;

  console.log(isError);

  if (isError) {
    if (serverError && isArray) {
      ui = res.response.data.map((item) => {
        return <p key={item}>{item}</p>;
      });
    } else if (serverError) {
      ui = serverError;
    } else {
      ui = "Network Error.";
    }
  } else if (isArray) {
    ui = res.map((item) => {
      return <p key={item}>{item}</p>;
    });
  } else {
    ui = "Thank you. Your request was successful.";
  }

  return (
    <div
      style={{
        backgroundColor: isError ? "lightcoral" : "lightgreen",
        marginTop: "2rem",
      }}
    >
      {ui}
    </div>
  );
};

export default ResponseBlock;
