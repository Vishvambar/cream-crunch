
document.addEventListener("DOMContentLoaded", () => {
    const name_edit = document.getElementById('name-edit');
    const email_edit = document.getElementById('email-edit');
    const phone_edit = document.getElementById('phone-edit');
    const address_edit = document.getElementById('address-edit');

    const cart = {}; const cartContent = document.querySelector(".cart-content"); const cartContainer = document.querySelector(".cart"); const cartItemsContainer = document.createElement("div"); cartItemsContainer.classList.add("cart-items"); cartContainer.appendChild(cartItemsContainer);
    function updateCartUI() {
        cartItemsContainer.innerHTML = "";
        let subtotal = 0;

        if (Object.keys(cart).length === 0) {
            cartContent.style.display = "flex";
            cartItemsContainer.style.display = "none";
            return;
        }

        cartContent.style.display = "none";
        cartItemsContainer.style.display = "block";

        for (const productId in cart) {
            const { name, price, quantity } = cart[productId];
            subtotal += price * quantity;

            const itemElement = document.createElement("div");
            itemElement.classList.add("cart-item");
            itemElement.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; padding: 10px;">
        <span>${name} [${quantity} Piece(s)]</span>
        <span>$${(price * quantity).toFixed(2)}</span>
        <button class="decrease" data-id="${productId}" style="margin-left: 10px;">-</button>
        <button class="increase" data-id="${productId}">+</button>
      </div>
    `;
            cartItemsContainer.appendChild(itemElement);
        }

        const subtotalElement = document.createElement("div");
        subtotalElement.style = "margin-top: 10px; padding: 10px; border-top: 1px solid #ccc; display:flex; justify-content:space-between;";
        subtotalElement.innerHTML = `<strong>Subtotal:</strong> $${subtotal.toFixed(2)}`;

        const checkoutButton = document.createElement("button");
        checkoutButton.textContent = "Checkout";
        checkoutButton.style = `
  margin-top: 10px;
  width: 94%;
  padding: 13px;
  background-color: var(--dl-color-theme-primary1);
  color: rgb(255, 255, 255);
  border: none;
  border-radius: 73px;
  cursor: pointer;
  font-size: 18px;
  margin-left: 4%;
  `;
        checkoutButton.addEventListener("click", () => {
            openPaymentGateway(subtotal);
        });

        cartItemsContainer.appendChild(subtotalElement);
        cartItemsContainer.appendChild(checkoutButton);
    }

    document.querySelectorAll(".add-button").forEach(button => {
        button.addEventListener("click", () => {
            const submenu = button.closest(".submenu");
            const productName = submenu.querySelector("p").textContent.trim();
            const productPrice = parseFloat(
                submenu.querySelector(".pricesection h3").textContent.replace("$", "").trim()
            );

            const productId = productName.toLowerCase().replace(/\s+/g, "-");

            if (cart[productId]) {
                cart[productId].quantity += 1;
            } else {
                cart[productId] = { name: productName, price: productPrice, quantity: 1 };
            }

            updateCartUI();
        });
    });

    cartContainer.addEventListener("click", event => {
        const button = event.target;
        const productId = button.getAttribute("data-id");

        if (button.classList.contains("increase")) {
            cart[productId].quantity += 1;
        } else if (button.classList.contains("decrease")) {
            cart[productId].quantity -= 1;

            if (cart[productId].quantity <= 0) {
                delete cart[productId];
            }
        }

        updateCartUI();
    });

    function openPaymentGateway(subtotal) {
        const options = {
            key: "rzp_test_eRKLlG1iwA78RM",
            amount: subtotal * 100,
            currency: "INR",
            name: "Cream&Crunch",
            description: "Checkout Payment for Cream&Crunch",
            image: "logo.png",
            handler: function (response) {
                // alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
                sendEmailWithOrderDetails(response.razorpay_payment_id, cart, subtotal);
                storeOrderDetails(cart);

                document.getElementById('successPopup').style.display = 'flex';

                document.querySelector('.close').addEventListener('click', function () {
                    document.getElementById('successPopup').style.display = 'none';
                });

                window.addEventListener('click', function (event) {
                    if (event.target === document.getElementById('successPopup')) {
                        document.getElementById('successPopup').style.display = 'none';
                    }
                });
                // window.location.href = 'your-orders.html';
                localStorage.setItem("lastPaymentId", response.razorpay_payment_id);
            },
            prefill: {
                name: name_edit.value,
                email: email_edit.value,
                contact: phone_edit.value
            },
            theme: {
                color: "#F37254"
            }
        };

        const razorpay = new Razorpay(options);
        razorpay.open();
    }

    function sendEmailWithOrderDetails(paymentId, cart, subtotal) {
        const orderSummary = Object.values(cart)
            .map(item => `${item.name} [${item.quantity}]`)
            .join(", ");

        const templateParams = {
            company_name: "Cream&Crunch",
            payment_id: paymentId,
            order_summary: orderSummary,
            subtotal: subtotal.toFixed(2),
            customer_name: name_edit.value, // Replace with actual customer name
            customer_email: email_edit.value, // Replace with actual email
            customer_contact: phone_edit.value, // Replace with actual contact number
            customer_address: address_edit.value // Replace with actual address
        };

        emailjs.init("4CXzXdrZ_f6F6933V"); // Replace with your EmailJS public key (user_...)

        emailjs.send("service_2ja1zzj", "template_7fp7f0i", templateParams)
            .then((response) => {
                console.log("Email sent successfully!", response.status, response.text);
            })
            .catch((error) => {
                console.error("Failed to send email", error);
                alert("There was an issue sending the order confirmation email. Please check your email settings.");
            });
    }

    function storeOrderDetails(cart) {
        const orders = JSON.parse(localStorage.getItem("orders")) || [];
        const orderDetails = {
            orderId: localStorage.getItem("lastPaymentId"),
            products: cart,
            timestamp: new Date().toISOString()
        };
        orders.push(orderDetails);
        localStorage.setItem("orders", JSON.stringify(orders));
    }
});