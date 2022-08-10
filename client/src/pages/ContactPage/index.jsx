import ContactForm from "./ContactForm/ContactForm";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8, type: "tween" }}
    >
      <ContactForm />;
    </motion.div>
  );
};

export default ContactPage;
