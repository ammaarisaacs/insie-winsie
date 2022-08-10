import Toast from "./Toast/Toast";
import Footer from "./Footer/Footer";
import Navbar from "./Navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      <Toast />
      <Footer />
    </>
  );
};

export default Layout;
