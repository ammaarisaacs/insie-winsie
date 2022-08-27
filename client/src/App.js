import "./App.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import { Layout, ErrorBoundary } from "./components";
import {
  AboutPage,
  HomePage,
  CheckoutPage,
  ContactPage,
  FaqPage,
  SuccessPage,
  ErrorPage,
  ProductDetailPage,
  ProductsPage,
  PageNotFound,
  CartPage,
} from "./pages";
import { StateContext } from "./context/StateContext";
import { AnimatePresence } from "framer-motion";

// https://dribbble.com/shots/6890113-The-Curology-landing-product-page-interaction

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <ErrorBoundary>
      <AnimatePresence exitBeforeEnter>
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<HomePage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/faqs" element={<FaqPage />} />
          <Route path="/products" element={<ProductsPage />} />
          <Route path="/products/:id" element={<ProductDetailPage />} />
          <Route path="/cart" element={<CartPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/checkout/success/:id" element={<SuccessPage />} />
          <Route path="/error" element={<ErrorPage />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
      </AnimatePresence>
    </ErrorBoundary>
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

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// to do

// email functionality
// db backup possibly, check in meeting
// how to prevent many request when pressing button -> could you ui change to sort this
// implement validations in routes -> check using postman

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// Client

// smooth scroll effect
// fallback behavior for react intersection observer
// stay on paginate page when coming back from url
// put limit on cache length
// how to update prices in the client side if you are storing it in cache because prices might change while in cache
// make sure altext is all there

///////////////////////////////////////////////////////////////////////////////

// Server

// job queue to limit requests
// cron jobs to back up db
// exclude post man and other clients https://stackoverflow.com/questions/18498726/how-do-i-get-the-domain-originating-the-request-in-express-js/18498769#18498769
// pagination
//    https://sequelize.org/docs/v6/core-concepts/model-querying-basics/
//    https://youtu.be/QoI_F_Fj8Lo
// setup for production minimist
//    https://github.com/dev-mastery/clean-architecture/blob/master/client/server/index.js
// central error handling
//    https://www.youtube.com/watch?v=s5YoXms0ECs&list=TLPQMjIwNjIwMjKhJoymYyYsag&index=6&ab_channel=Gravity
//    https://www.youtube.com/watch?v=UVAMha41dwo&list=TLPQMjIwNjIwMjKhJoymYyYsag&index=5&ab_channel=Gravity
//    https://youtu.be/xdsm3QMSX6c?list=TLPQMjIwNjIwMjKhJoymYyYsag
//    https://youtu.be/DyqVqaf1KnA
// sequelize hooks for emailing and stuff like that
// install snyk and check vulnabilities
// how to construct http responses for express
// how to build a production ready express api
// how to handle multiple requests from different clients OR how to handle multiple requests one at a time OR using transactions to ensure requests are handled one at a time
// implement testing
// install snyk
// how to backup db => cron jobs
// install pm2
// install the thing that immediately starts up server if it crashes

///////////////////////////////////////////////////////////////////////////////

// Bugs

// carousel not having correct width when coming pressing back to home page
// clicking multiple times on a button sends many requests
// experienced an odd error earlier https://stackoverflow.com/questions/9768444/possible-eventemitter-memory-leak-detected
// orderQty + 1 should be less, because cannot buy when stock is 1 left

///////////////////////////////////////////////////////////////////////////////

// SECURITY

// server

// limit requests
// helmet for headers
// logging
// only return what is necessary
// disable unused routes
// hide what framework you are using in headers
// hpp possibly for polution
// ssl and https -> lets encrypt
// white list config files for emails, provinces, cities, urls https://stackoverflow.com/questions/36393256/express-cors-domain-whitelist https://www.tabnine.com/code/javascript/functions/express-validator/ValidationChain/isIn
// sort out errors in payfast checks
// custom ip validator and white listing https://stackoverflow.com/questions/43866071/how-to-do-whitelist-of-ips-in-express
// send email to client when placing order, if it rejects, stop order

// client

// prevent multiple click requests
// Output Encoding and HTML Sanitization
// rate limit
// check accept header

//////////////////////////////////////////////////////////////////////////////////////////////////////////

// for them to do
// convert all static images to webp

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////

// COMPLETED

// CLIENT

// https://codesandbox.io/s/framer-motion-animate-react-router-transition-kczeg?file=/src/page.js
// sold out functionality
// poppup to show you added to cart
// payfast integration
// error boundariies
// Search https://youtu.be/672cituGWac https://youtu.be/9asw2jSi4zE https://www.youtube.com/watch?v=mZvKPtH9Fzo&ab_channel=PedroTech https://youtu.be/MY6ZZIn93V8 https://youtu.be/x7niho285qs
// javacript: in url how to validate => handled with htmml escaping
// make buttons only clickable once, do not want to send multiple requests

// SERVER
// when order is sent, do a validation for the prices that they must match up to prices is db incase someone changes it on frontend side
// how to make sure province isn't empty
// ordering
// use uuid where you can
// content type check
// input validation -> query, params, forms, json
// validate content type header => express validator will check if json, or if object, or if url, or if uuid etc
// check helmet and how to enable pictures in client for production
// configure prettier to not add ; to .env file
// limit payload size
// sequelize config may be better to change to js file rather than json (.seqlizer file) so you can import dotenv to hide

//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////
