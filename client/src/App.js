import "./App.css";

import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";

import {
  AboutPage,
  HomePage,
  CheckoutPage,
  ContactPage,
  FaqPage,
  SuccessPage,
} from "./pages";

import {
  Layout,
  Products,
  PageNotFound,
  ProductDetail,
  Cart,
} from "./components";

import { AnimatePresence } from "framer-motion";
import { StateContext } from "./context/StateContext";

// https://dribbble.com/shots/6890113-The-Curology-landing-product-page-interaction

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence exitBeforeEnter>
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/faqs" element={<FaqPage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/products/:id" element={<ProductDetail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/checkout/success/:id" element={<SuccessPage />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </AnimatePresence>
  );
};

function App() {
  return (
    <Router>
      <StateContext>
        <Layout className="App">
          <AnimatedRoutes />
        </Layout>
      </StateContext>
    </Router>
  );
}

export default App;

// Client

// https://codesandbox.io/s/framer-motion-animate-react-router-transition-kczeg?file=/src/page.js
// sorting of data
// react tracked
// what happens when user opens new tab
// smooth scroll effect
// fallback behavior for react intersection observer
// sold out functionality
// stay on paginate page when coming back from url
// poppup to show you added to cart
// payfast integration
// error boundariies
// put limit on cache length
// how to update prices in the client side if you are storing it in cache because prices might change while in cache
// make buttons only clickable once, do not want to send multiple requests
// convert all static images to webp
// make sure altext is all there

///////////////////////////////////////////////////////////////////////////////

// Server

// pagination
//    https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
//    https://youtu.be/QoI_F_Fj8Lo
// Search
//    https://youtu.be/672cituGWac
//    https://youtu.be/9asw2jSi4zE
//    https://www.youtube.com/watch?v=mZvKPtH9Fzo&ab_channel=PedroTech
// `  https://youtu.be/MY6ZZIn93V8
//    https://youtu.be/x7niho285qs
// ordering and sorting for sort functionality
// setup for production minimist
//    https://github.com/dev-mastery/clean-architecture/blob/master/client/server/index.js
// central error handling
//    https://www.youtube.com/watch?v=s5YoXms0ECs&list=TLPQMjIwNjIwMjKhJoymYyYsag&index=6&ab_channel=Gravity
//    https://www.youtube.com/watch?v=UVAMha41dwo&list=TLPQMjIwNjIwMjKhJoymYyYsag&index=5&ab_channel=Gravity
//    https://youtu.be/xdsm3QMSX6c?list=TLPQMjIwNjIwMjKhJoymYyYsag
//    https://youtu.be/DyqVqaf1KnA
// need some sort of parsing to check if an error is a database error because we do not want to send that back
// delete all clg
// consider reverse proxy for serving static files => check express static files
// sequelize config may be better to change to js file rather than json (.seqlizer file) so you can import dotenv to hide
// when order is sent, do a validation for the prices that they must match up to prices is db incase someone changes it on frontend side
// sequelize hooks for emailing and stuff like that
// better to use codes or integer codes for cryptic and shorter data transfers
// what if request sent from node code or postman, need to validate this
// how to make sure province isn't empty
// install snyk and check vulnabilities
// use uuid where you can
// convert all static images to webp
// rate limiting - for future?

///////////////////////////////////////////////////////////////////////////////

// Bugs

// carousel not having correct width when coming pressing back to home page
// clicking multiple times on a button sends many requests
// experienced an odd error earlier https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected
// no svg draw when selecting cart or checkout or anything else other than the center menu

///////////////////////////////////////////////////////////////////////////////

// to do

// payfast component
// research security for server
// how to prevent many request when pressing button -> could you ui change to sort this
// cleanup usefetch and useForm
// implement validations in routes -> check using postman
//

// security implementations
// server

// limit payload size
// limit requests
// validate content type header
// input validation -> query, params, forms, json
// output escaping
// logging
// parameter pollution
// only return what is necessary
// disable unused routes
// hide what framework you are using in headers

// client
// hide what framework you are using in headers
// customize toast to show array of messages
