import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

// https://dribbble.com/shots/6890113-The-Curology-landing-product-page-interaction

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
            {/* <Route path="/admin" element={<AdminPage />}>
              <Route path="orders" element={<OrdersDashboard />} />
              <Route path="products" element={<ProductsDashboard />}>
                <Route path="" element={<ViewProduct />} />
                <Route path="create" element={<CreateProduct />} />
                <Route path="update" element={<UpdateProduct />} />
                <Route path="delete" element={<DeleteProduct />} />
              </Route>
            </Route> */}

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

// Client

// make catch in trycatch blocks proper
// infinite scrolling check products jsx

// page transition animations
// https://codesandbox.io/s/framer-motion-animate-react-router-transition-kczeg?file=/src/page.js

// filtering and sorting of data
// payfast integration
// banners and specials
// admin
// static pages
// react tracked
// smooth scroll effect
// fallback behavior for react intersection observer
// sold out functionality
// stay on paginate page when coming back from url
// poppup to show you added to cart

// Server

// setup for producttion minimist https://github.com/dev-mastery/clean-architecture/blob/master/client/server/index.js

// central error handling
// https://www.youtube.com/watch?v=s5YoXms0ECs&list=TLPQMjIwNjIwMjKhJoymYyYsag&index=6&ab_channel=Gravity
// https://www.youtube.com/watch?v=UVAMha41dwo&list=TLPQMjIwNjIwMjKhJoymYyYsag&index=5&ab_channel=Gravity
// https://youtu.be/xdsm3QMSX6c?list=TLPQMjIwNjIwMjKhJoymYyYsag
// https://youtu.be/DyqVqaf1KnA

// need some sort of parsing to check if an error is a database error because we do not want to send that back

// delete all clg
// delete mockdata and folders you aren't using

// image upload
// https://youtu.be/wIOpe8S2Mk8
// consider reverse proxy for serving static files => check express static files

// sequelize config may be better to change to js file rather than json (.seqlizer file) so you can import dotenv to hide

// when order is sent, do a validation for the prices that they must match up to prices is db incase someone changes it on frontend side
