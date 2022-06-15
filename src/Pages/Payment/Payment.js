import React from "react";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import { CheckoutForm } from "../checkoutform/CheckoutForm";

const PUBLIC_KEY =
  "pk_test_51KmEsFSDadRIrbAmonVnBLe9rJUoMFFsCa0l8UJxsqR5bUBYpj4IWgs4BQMgpscwBIIY7YPNxNLQPe1fXCmUeCl400jiZ4VUIx";

const stripeTestPromise = loadStripe(PUBLIC_KEY);

const Stripe = () => {
  return (
    <Elements stripe={stripeTestPromise}>
      <CheckoutForm />
    </Elements>
  );
};

export default Stripe;
