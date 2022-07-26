import { Navbar, Footer, Toast } from "../";

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
