var STRIPE_PK = "pk_test_51ImC5sIe3qrPUgax8Eu5M10vE31tpXedkwmmIzuMuMPCkCJmKEr3uchlcOfdQZb61UL8UP6Zc76tuUdVzW58n49o00BwZJIfT6";

// Config Stripe.js V3
stripe = Stripe(STRIPE_PK);
elements = stripe.elements();

// Config payment request
paymentRequest = stripe.paymentRequest({
  country: "US",
  currency: "usd",
  total: {
    label: "total",
    amount: 100,
  },
});

paymentRequest.on("source", (event) => {
  console.log("Got source: ", event.source.id);
  event.complete("success");
  ChromeSamples.log(JSON.stringify(event.source, 2));
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
    ChromeSamples.setStatus("Please add payment method in your browser or click on add payment methods");
  }
});

const AddPaymentMethod = () => {
    const supportedPaymentMethods = [
        {
          supportedMethods: 'basic-card',
        }
      ];
      const paymentDetails = {
        total: {
          label: 'Total',
          amount:{
            currency: 'USD',
            value: 0
          }
        }
      };
      const options = {};
      const request = new PaymentRequest(
        supportedPaymentMethods,
        paymentDetails,
        options)
    request.show();   
}

// Helpers
var ChromeSamples = {
    log: function() {
      var line = Array.prototype.slice.call(arguments).map(function(argument) {
        return typeof argument === 'string' ? argument : JSON.stringify(argument);
      }).join(' ');
  
      document.querySelector('#log').textContent += line + '\n';
    },
  
    clearLog: function() {
      document.querySelector('#log').textContent = '';
    },
  
    setStatus: function(status) {
      document.querySelector('#status').textContent = status;
    },
  
    setContent: function(newContent) {
      var content = document.querySelector('#content');
      while(content.hasChildNodes()) {
        content.removeChild(content.lastChild);
      }
      content.appendChild(newContent);
    }
  };