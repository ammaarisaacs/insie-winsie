import { useStateContext } from "../../../context/StateContext";
import { motion } from "framer-motion";

function Toast() {
  const { toastMessage } = useStateContext();
  return (
    <>
      {toastMessage && (
        <motion.div
          initial={{ y: 0 }}
          animate={{ y: "-150%" }}
          exit={{ y: 0 }}
          style={{
            top: "100vh",
            minWidth: "200px",
            height: "fit-content",
            position: "fixed",
            right: 40,
            zIndex: 999,
            padding: 10,
            borderRadius: 10,
            backgroundColor: "#9fe4e4",
          }}
        >
          {toastMessage}
        </motion.div>
      )}
    </>
  );
}

export default Toast;
