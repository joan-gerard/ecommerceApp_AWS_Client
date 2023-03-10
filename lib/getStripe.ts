import { loadStripe, Stripe } from "@stripe/stripe-js";

let stripePromise: Promise<Stripe | null>;

const getStripe = () => {
  if (!stripePromise) {
    if (process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY != undefined) {
      stripePromise = loadStripe(
        process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
      );
    }
  }
  return stripePromise;
};

export default getStripe;
