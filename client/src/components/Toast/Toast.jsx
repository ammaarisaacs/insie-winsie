import { motion, AnimatePresence } from "framer-motion";
import { useStateContext } from "../../context/StateContext";

function Toast() {
  const { toastMessage } = useStateContext();
  return (
    <AnimatePresence>
      {toastMessage && (
        <motion.div
          initial={{ top: "100vh" }}
          animate={{ top: "80vh" }}
          exit={{ top: "100vh" }}
          style={{
            width: 400,
            height: 100,
            position: "fixed",
            backgroundColor: "#9fe4e4",
            right: 50,
            padding: 10,
            borderRadius: 10,
            zIndex: 999,
          }}
        >
          {toastMessage}
        </motion.div>
      )}
    </AnimatePresence>
  );
}

export default Toast;
