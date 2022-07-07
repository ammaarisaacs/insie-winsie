import { Navbar, Footer, Toast } from "../";

const Layout = ({ children }) => {
  return (
    <div>
      <Toast />
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default Layout;
