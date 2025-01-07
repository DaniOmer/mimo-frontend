import { loadStripe } from "@stripe/stripe-js";
import { ref } from "vue";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY);

export const useStripe = () => {
  const cardElement = ref<any>(null);
  const stripe = ref<any>(null);
  const elements = ref<any>(null);

  const createPaymentMethod = async () => {
    if (!stripe.value || !elements.value) return null;

    const { paymentMethod, error: stripeError } =
      await stripe.value.createPaymentMethod({
        type: "card",
        card: elements.value.getElement("card"),
      });

    return stripeError ? null : paymentMethod;
  };

  const initializeStripeElements = async () => {
    stripe.value = await stripePromise;
    if (stripe.value) {
      elements.value = stripe.value.elements();
      cardElement.value = elements.value.create("card");
      cardElement.value.mount("#card-element");
    }
  };

  return {
    cardElement,
    createPaymentMethod,
    initializeStripeElements,
  };
};
