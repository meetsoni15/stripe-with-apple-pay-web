var STRIPE_PK = "pk_test_51ImC5sIe3qrPUgax8Eu5M10vE31tpXedkwmmIzuMuMPCkCJmKEr3uchlcOfdQZb61UL8UP6Zc76tuUdVzW58n49o00BwZJIfT6";

// Config Stripe.js V3
stripe = Stripe(STRIPE_PK);
elements = stripe.elements();

// Config payment request
paymentRequest = stripe.paymentRequest({
  country: "IN",
  currency: "usd",
  total: {
    label: "total",
    amount: 100,
  },
});

paymentRequest.on("source", (event) => {
  console.log("Got source: ", event.source.id);
  event.complete("success");
  // Send the source to your server to charge it!
});
prButton = elements.create("paymentRequestButton", {
  paymentRequest,
});
// Check the availability of the Payment Request API first.
paymentRequest.canMakePayment().then((result) => {
  if (result) {
    prButton.mount("#payment-request-button");
  } else {
    document.getElementById("payment-request-button").style.display = "none";
  }
});
