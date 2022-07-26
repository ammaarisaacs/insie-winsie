import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      style={{
        backgroundColor: isError ? "lightcoral" : "lightgreen",
        marginTop: "2rem",
      }}
    >
      {ui}
    </motion.div>
  );
};

export default ResponseBlock;
