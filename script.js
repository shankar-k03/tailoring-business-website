/* =========================================================
   LOADER
========================================================= */

window.addEventListener("load", () => {

    const loader = document.getElementById("loader");

    setTimeout(() => {
        loader.classList.add("hide");
    }, 700);

});


/* =========================================================
   MOBILE MENU
========================================================= */

const menuButton = document.getElementById("menuButton");
const navMenu = document.getElementById("navMenu");

menuButton.addEventListener("click", () => {

    navMenu.classList.toggle("active");

    const icon = menuButton.querySelector("i");

    if (navMenu.classList.contains("active")) {

        icon.classList.remove("fa-bars");
        icon.classList.add("fa-xmark");

    } else {

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    }

});


document.querySelectorAll("#navMenu a").forEach(link => {

    link.addEventListener("click", () => {

        navMenu.classList.remove("active");

        const icon = menuButton.querySelector("i");

        icon.classList.remove("fa-xmark");
        icon.classList.add("fa-bars");

    });

});


/* =========================================================
   SCROLL REVEAL
========================================================= */

const revealElements = document.querySelectorAll(".reveal");

const revealObserver = new IntersectionObserver(
    (entries) => {

        entries.forEach(entry => {

            if (entry.isIntersecting) {

                entry.target.classList.add("visible");

                revealObserver.unobserve(entry.target);

            }

        });

    }, {
        threshold: 0.12
    }
);

revealElements.forEach(element => {

    revealObserver.observe(element);

});


/* =========================================================
   PRODUCTS
========================================================= */

const products = [

    {
        id: 1,
        name: "Classic Linen Shirt",
        category: "Shirts",
        price: "₹899",
        description: "A comfortable everyday linen shirt with a clean silhouette and timeless style."
    },

    {
        id: 2,
        name: "Premium Casual Shirt",
        category: "Shirts",
        price: "₹1,199",
        description: "A versatile premium casual shirt designed for comfort and everyday wear."
    },

    {
        id: 3,
        name: "Elegant Cotton Dress",
        category: "Dresses",
        price: "₹1,499",
        description: "A lightweight cotton dress combining simple elegance with comfortable styling."
    },

    {
        id: 4,
        name: "Classic Kurta",
        category: "Traditional",
        price: "₹1,299",
        description: "A classic kurta with a comfortable fit, perfect for everyday and festive occasions."
    }

];


const productsGrid = document.getElementById("productsGrid");

function renderProducts() {

    productsGrid.innerHTML = "";

    products.forEach(product => {

        const card = document.createElement("article");

        card.className = "product-card reveal";

        card.innerHTML = `

            <div class="product-image">

                <span class="product-tag">
                    AVAILABLE
                </span>

                <i class="fa-solid fa-shirt"></i>

            </div>

            <div class="product-info">

                <span class="product-category">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <div class="product-bottom">

                    <span class="product-price">
                        ${product.price}
                    </span>

                    <button
                        class="product-view"
                        onclick="openProduct(${product.id})"
                        aria-label="View product">

                        <i class="fa-solid fa-arrow-up-right-from-square"></i>

                    </button>

                </div>

            </div>

        `;

        productsGrid.appendChild(card);

    });

}

renderProducts();


/* =========================================================
   PRODUCT MODAL
========================================================= */

const productModal = document.getElementById("productModal");

const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalPrice = document.getElementById("modalPrice");
const modalDescription = document.getElementById("modalDescription");
const modalWhatsApp = document.getElementById("modalWhatsApp");

function openProduct(id) {

    const product = products.find(item => item.id === id);

    if (!product) return;

    modalTitle.textContent = product.name;

    modalCategory.textContent = product.category;

    modalPrice.textContent = product.price;

    modalDescription.textContent = product.description;

    modalWhatsApp.onclick = () => {

        const message =
            `Hello! I am interested in ${product.name} (${product.price}). Please share more details.`;

        const whatsappNumber = "919999999999";

        window.open(
            `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
            "_blank"
        );

    };

    productModal.classList.add("active");

    document.body.style.overflow = "hidden";

}


function closeProduct() {

    productModal.classList.remove("active");

    document.body.style.overflow = "";

}


document.getElementById("modalClose")
    .addEventListener("click", closeProduct);


document.querySelector(".modal-overlay")
    .addEventListener("click", closeProduct);


document.addEventListener("keydown", event => {

    if (event.key === "Escape") {
        closeProduct();
    }

});


/* =========================================================
   BOOKING FORM
========================================================= */

const bookingForm = document.getElementById("bookingForm");

bookingForm.addEventListener("submit", event => {

    event.preventDefault();

    const name =
        document.getElementById("customerName").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const address =
        document.getElementById("address").value.trim();

    const date =
        document.getElementById("visitDate").value;

    const time =
        document.getElementById("visitTime").value;

    const notes =
        document.getElementById("notes").value.trim();


    const selectedServices = [...document.querySelectorAll(
            ".check-item input:checked"
        )]
        .map(item => item.value);


    if (selectedServices.length === 0) {

        showToast(
            "Please select at least one tailoring requirement."
        );

        return;

    }


    const message = `

Hello Stitch & Style!

I would like to book a home measurement visit.

👤 Name: ${name}

📞 Phone: ${phone}

📍 Address:
${address}

📅 Preferred Date:
${date}

⏰ Preferred Time:
${time}

🧵 Requirement:
${selectedServices.join(", ")}

📝 Notes:
${notes || "None"}

Thank you!

`;


    const whatsappNumber = "919999999999";


    window.open(
        `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`,
        "_blank"
    );


    showToast("Booking details prepared for WhatsApp.");

    bookingForm.reset();

});


/* =========================================================
   TOAST
========================================================= */

const toast = document.getElementById("toast");

function showToast(message) {

    toast.querySelector("span").textContent = message;

    toast.classList.add("show");

    setTimeout(() => {

        toast.classList.remove("show");

    }, 4000);

}


/* =========================================================
   ORDER TRACKING DEMO
========================================================= */

const trackButton =
    document.getElementById("trackButton");

const orderInput =
    document.getElementById("orderInput");

const trackingResult =
    document.getElementById("trackingResult");


trackButton.addEventListener("click", () => {

    const orderId =
        orderInput.value.trim();

    if (!orderId) {

        showTrackingMessage(
            "Please enter an Order ID."
        );

        return;

    }


    /*
        DEMO ONLY

        Later this will come from Supabase/MySQL.
    */


    trackingResult.innerHTML = `

        <div style="margin-bottom:18px;">

            <small style="
                color:#c8a46b;
                letter-spacing:2px;
                font-size:8px;
            ">
                ORDER
            </small>

            <strong style="
                display:block;
                margin-top:5px;
                font-size:18px;
            ">
                ${escapeHTML(orderId)}
            </strong>

        </div>


        <div class="status-line">

            <div class="status-dot"></div>

            <span>
                Measurement completed
            </span>

        </div>


        <div class="status-line">

            <div class="status-dot"></div>

            <span>
                Cutting completed
            </span>

        </div>


        <div class="status-line">

            <div class="status-dot"></div>

            <span>
                Stitching in progress
            </span>

        </div>


        <div class="status-line"
             style="opacity:.35">

            <div class="status-dot"></div>

            <span>
                Quality check
            </span>

        </div>


        <div class="status-line"
             style="opacity:.35">

            <div class="status-dot"></div>

            <span>
                Ready for delivery
            </span>

        </div>

    `;

});


function showTrackingMessage(message) {

    trackingResult.innerHTML = `

        <div class="tracking-empty">

            <i class="fa-solid fa-circle-exclamation"></i>

            <p>${message}</p>

        </div>

    `;

}


/* =========================================================
   SECURITY HELPER
========================================================= */

function escapeHTML(value) {

    const div = document.createElement("div");

    div.textContent = value;

    return div.innerHTML;

}


/* =========================================================
   DATE LIMIT
========================================================= */

const visitDate =
    document.getElementById("visitDate");

const today =
    new Date().toISOString().split("T")[0];

visitDate.min = today;


/* =========================================================
   NAVBAR SCROLL EFFECT
========================================================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener("scroll", () => {

    if (window.scrollY > 80) {

        navbar.style.background =
            "rgba(13,12,11,.88)";

        navbar.style.backdropFilter =
            "blur(15px)";

    } else {

        navbar.style.background = "";

        navbar.style.backdropFilter = "";

    }

});