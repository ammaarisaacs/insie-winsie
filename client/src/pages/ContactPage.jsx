import ContactForm from "../components/ContactForm/ContactForm";
import { motion } from "framer-motion";

const ContactPage = () => {
  return (
    <motion.div
      layout
      initial={{ opacity: 0, x: -100 }}
      animate={{
        opacity: 1,
        x: 0,
        transition: { duration: 0.8, type: "tween" },
      }}
      exit={{
        opacity: 0,
        x: 100,
        transition: { duration: 0.8, type: "tween" },
      }}
    >
      <ContactForm />;
    </motion.div>
  );
};

export default ContactPage;
