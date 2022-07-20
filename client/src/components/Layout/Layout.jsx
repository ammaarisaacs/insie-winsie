import { Navbar, Footer, Toast } from "../";

const Layout = ({ children }) => {
  return (
    <>
      <Navbar />
      {children}
      {/* toast should only go into components that need it  */}
      <Toast />
      <Footer />
    </>
  );
};

export default Layout;
