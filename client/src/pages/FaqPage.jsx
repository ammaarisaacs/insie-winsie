import React from "react";
import { Faqs } from "../components";

const faqs = [
  {
    question: "Delivery & collection",
    answer: { areas: ["Rondebosch", "Bishops", "Town", "Rheinlands"] },
  },
  {
    question: "Delivery?",
    answer: "This is the answer for the first faq",
  },
  {
    question: "Refunds?",
    answer:
      "This is the answer for the first faqRefunds for returns will be processed once the returned item has been received and inspected at our warehouse. It takes 3 to 5 days from collection or drop-off to receive and inspect the items at the warehouse. Once inspected it takes up to 5 working days for the refund to reflect in your account.",
  },
  {
    question: " Cancellations?",
    answer:
      "This is the answer for the first faqIf items have been cancelled from your order due to an inventory error we’ll notify you via email & issue a refund.",
  },
];

const FaqPage = () => {
  return (
    <div style={{ border: "1px solid red" }}>
      {faqs.map((faq, i) => {
        return <Faqs faq={faq} i={i} />;
      })}
    </div>
  );
};

export default FaqPage;
