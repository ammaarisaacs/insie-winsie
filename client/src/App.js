import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import {
  AboutPage,
  HomePage,
  AdminPage,
  CheckoutPage,
  ContactPage,
  FaqPage,
} from "./pages";
import {
  Layout,
  Products,
  Error,
  ProductDetail,
  Cart,
  OrdersDashboard,
  ProductsDashboard,
  CreateProduct,
  DeleteProduct,
  UpdateProduct,
  ViewProduct,
} from "./components";

import { StateContext } from "./context/StateContext";

function App() {
  return (
    <Router>
      <StateContext>
        <Layout className="App">
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/products" element={<Products />} />
            <Route path="/products/:id" element={<ProductDetail />} />

            {/* protected route below */}
            {/* might actually need a login for this then */}
            <Route path="/admin" element={<AdminPage />}>
              <Route path="orders" element={<OrdersDashboard />} />
              <Route path="products" element={<ProductsDashboard />}>
                <Route path="" element={<ViewProduct />} />
                <Route path="create" element={<CreateProduct />} />
                <Route path="update" element={<UpdateProduct />} />
                <Route path="delete" element={<DeleteProduct />} />
              </Route>
            </Route>

            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/faqs" element={<FaqPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/about" element={<AboutPage />} />

            <Route path="*" element={<Error />} />
          </Routes>
        </Layout>
      </StateContext>
    </Router>
  );
}

export default App;

// to do
// make catch in trycatch blocks proper
// infinite scrolling check products jsx
// page transition animations
// filtering and sorting of data
// stripe + payfast integration
// banners and specials
// admin
// static pages
// react tracked
// smooth scroll effect
// fallback behavior for react intersection observer
// sold out functionality
// stay on paginate page when coming back from url
// poppup to show you added to cart
