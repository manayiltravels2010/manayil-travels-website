/* =========================================================
   MANAYIL TRAVELS - WEBSITE JAVASCRIPT
   Complete Website Functionality
========================================================= */

document.addEventListener("DOMContentLoaded", function () {

    /* =====================================================
       1. MOBILE MENU
    ===================================================== */

    const menuButton = document.getElementById("menuButton");
    const mainNav = document.getElementById("mainNav");

    if (menuButton && mainNav) {

        menuButton.addEventListener("click", function () {

            mainNav.classList.toggle("active");

            const isOpen =
                mainNav.classList.contains("active");

            menuButton.setAttribute(
                "aria-expanded",
                isOpen ? "true" : "false"
            );
        });


        const navLinks =
            mainNav.querySelectorAll("a");

        navLinks.forEach(function (link) {

            link.addEventListener("click", function () {

                mainNav.classList.remove("active");

                menuButton.setAttribute(
                    "aria-expanded",
                    "false"
                );

            });

        });
    }


    /* =====================================================
       2. SERVICE SEARCH
    ===================================================== */

    const searchInput =
        document.getElementById("serviceSearch");


    const serviceCards = Array.from(
        document.querySelectorAll(
            ".main-service, " +
            ".service-list-card, " +
            ".insurance-card, " +
            ".online-card, " +
            ".dtp-card"
        )
    );


    if (searchInput) {

        searchInput.addEventListener(
            "input",
            function () {

                const searchValue =
                    this.value
                        .trim()
                        .toLowerCase();


                serviceCards.forEach(
                    function (card) {

                        const cardText =
                            card.textContent
                                .toLowerCase()
                                .replace(/\s+/g, " ");


                        if (
                            searchValue === "" ||
                            cardText.includes(searchValue)
                        ) {

                            card.style.display = "";

                        } else {

                            card.style.display = "none";

                        }

                    }
                );

            }
        );


        /* ENTER KEY */
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key !== "Enter") {
                    return;
                }

                event.preventDefault();


                const visibleCard =
                    serviceCards.find(
                        function (card) {

                            return (
                                window.getComputedStyle(card)
                                    .display !== "none"
                            );

                        }
                    );


                if (visibleCard) {

                    visibleCard.scrollIntoView({
                        behavior: "smooth",
                        block: "center"
                    });

                } else {

                    alert(
                        "Sorry, we couldn't find that service. Please try another search."
                    );

                }

            }
        );


        /* ESC KEY - CLEAR SEARCH */
        searchInput.addEventListener(
            "keydown",
            function (event) {

                if (event.key === "Escape") {

                    searchInput.value = "";

                    searchInput.dispatchEvent(
                        new Event("input")
                    );

                    searchInput.blur();

                }

            }
        );

    }


    /* =====================================================
       3. REQUEST A SERVICE FORM
    ===================================================== */

    const serviceForm =
        document.getElementById("serviceForm");


    if (serviceForm) {

        serviceForm.addEventListener(
            "submit",
            function (event) {

                event.preventDefault();


                /* ---------------------------------------------
                   GET FORM ELEMENTS
                --------------------------------------------- */

                const nameElement =
                    document.getElementById("customerName");

                const phoneElement =
                    document.getElementById("customerPhone");

                const serviceElement =
                    document.getElementById("customerService");

                const messageElement =
                    document.getElementById("customerMessage");


                const name =
                    nameElement
                        ? nameElement.value.trim()
                        : "";


                const phone =
                    phoneElement
                        ? phoneElement.value.trim()
                        : "";


                const service =
                    serviceElement
                        ? serviceElement.value.trim()
                        : "";


                const message =
                    messageElement
                        ? messageElement.value.trim()
                        : "";


                /* ---------------------------------------------
                   VALIDATION
                --------------------------------------------- */

                if (name === "") {

                    alert("Please enter your name.");

                    if (nameElement) {
                        nameElement.focus();
                    }

                    return;
                }


                if (phone === "") {

                    alert(
                        "Please enter your phone number."
                    );

                    if (phoneElement) {
                        phoneElement.focus();
                    }

                    return;
                }


                const cleanPhone =
                    phone.replace(/\D/g, "");


                if (
                    cleanPhone.length !== 10 &&
                    cleanPhone.length !== 12
                ) {

                    alert(
                        "Please enter a valid Indian phone number."
                    );

                    if (phoneElement) {
                        phoneElement.focus();
                    }

                    return;
                }


                if (service === "") {

                    alert(
                        "Please select a service."
                    );

                    if (serviceElement) {
                        serviceElement.focus();
                    }

                    return;
                }


                /* =================================================
                   4. SMART WHATSAPP ROUTING
                ================================================= */


                /*
                   MAIN MANAYIL TRAVELS NUMBER
                */
                const mainWhatsApp =
                    "919447559993";


                /*
                   INSURANCE PARTNER NUMBER
                */
                const insuranceWhatsApp =
                    "919847461684";


                /*
                   Detect insurance services
                */
                const serviceLower =
                    service.toLowerCase();


                const insuranceKeywords = [

                    "insurance",

                    "car insurance",

                    "motor insurance",

                    "vehicle insurance",

                    "two wheeler",

                    "two-wheeler",

                    "bike insurance",

                    "health insurance",

                    "travel insurance",

                    "home insurance",

                    "life insurance",

                    "business insurance",

                    "policy renewal",

                    "insurance renewal"

                ];


                const isInsuranceService =
                    insuranceKeywords.some(
                        function (keyword) {

                            return serviceLower.includes(
                                keyword
                            );

                        }
                    );


                /*
                   Select WhatsApp destination
                */
                const whatsappNumber =
                    isInsuranceService
                        ? insuranceWhatsApp
                        : mainWhatsApp;


                /* =================================================
                   5. WHATSAPP MESSAGE
                ================================================= */


                let whatsappMessage;


                if (isInsuranceService) {

                    whatsappMessage =
`Hello!

New Insurance Enquiry

Customer Name: ${name}
Phone Number: ${phone}
Insurance Service: ${service}
Message: ${message || "No additional message."}

Please contact me regarding this insurance enquiry.

Sent through MANAYIL TRAVELS.`;

                } else {

                    whatsappMessage =
`Hello MANAYIL TRAVELS!

NEW SERVICE REQUEST

Name: ${name}
Phone: ${phone}
Service: ${service}
Message: ${message || "No additional message."}

Please contact me regarding this service.`;

                }


                /* =================================================
                   6. ENCODE MESSAGE
                ================================================= */

                const encodedMessage =
                    encodeURIComponent(
                        whatsappMessage
                    );


                const whatsappURL =
                    "https://wa.me/" +
                    whatsappNumber +
                    "?text=" +
                    encodedMessage;


                /* =================================================
                   7. OPEN WHATSAPP
                ================================================= */

                window.open(
                    whatsappURL,
                    "_blank",
                    "noopener,noreferrer"
                );


                /* Reset form */
                serviceForm.reset();

            }
        );

    }


    /* =====================================================
       8. PHONE NUMBER INPUT
    ===================================================== */

    const phoneInput =
        document.getElementById("customerPhone");


    if (phoneInput) {

        phoneInput.addEventListener(
            "input",
            function () {

                this.value =
                    this.value.replace(
                        /[^0-9+ ]/g,
                        ""
                    );

            }
        );

    }


    /* =====================================================
       9. SERVICE CARD → REQUEST FORM
    ===================================================== */

    const serviceButtons =
        document.querySelectorAll(
            "[data-service]"
        );


    serviceButtons.forEach(
        function (button) {

            button.addEventListener(
                "click",
                function () {

                    const selectedService =
                        this.getAttribute(
                            "data-service"
                        );


                    const serviceSelect =
                        document.getElementById(
                            "customerService"
                        );


                    const serviceForm =
                        document.getElementById(
                            "serviceForm"
                        );


                    if (
                        serviceSelect &&
                        selectedService
                    ) {

                        /*
                           First try exact value
                        */

                        serviceSelect.value =
                            selectedService;


                        /*
                           If exact value isn't found,
                           match option text
                        */

                        if (
                            serviceSelect.value !==
                            selectedService
                        ) {

                            const options =
                                Array.from(
                                    serviceSelect.options
                                );


                            const matchingOption =
                                options.find(
                                    function (option) {

                                        return option
                                            .textContent
                                            .trim()
                                            .toLowerCase()
                                            .includes(
                                                selectedService
                                                    .trim()
                                                    .toLowerCase()
                                            );

                                    }
                                );


                            if (matchingOption) {

                                serviceSelect.value =
                                    matchingOption.value;

                            }

                        }

                    }


                    if (serviceForm) {

                        serviceForm.scrollIntoView({
                            behavior: "smooth",
                            block: "start"
                        });

                    }

                }
            );

        }
    );


    /* =====================================================
       10. CURRENT YEAR
    ===================================================== */

    const currentYear =
        document.getElementById(
            "currentYear"
        );


    if (currentYear) {

        currentYear.textContent =
            new Date().getFullYear();

    }


    /* =====================================================
       11. SMOOTH NAVIGATION
    ===================================================== */

    document
        .querySelectorAll('a[href^="#"]')
        .forEach(
            function (link) {

                link.addEventListener(
                    "click",
                    function (event) {

                        const targetID =
                            this.getAttribute(
                                "href"
                            );


                        if (
                            !targetID ||
                            targetID === "#"
                        ) {

                            return;

                        }


                        const target =
                            document.querySelector(
                                targetID
                            );


                        if (target) {

                            event.preventDefault();


                            target.scrollIntoView({
                                behavior: "smooth",
                                block: "start"
                            });

                        }

                    }
                );

            }
        );


    /* =====================================================
       12. WEBSITE LOADED
    ===================================================== */

    console.log(
        "MANAYIL TRAVELS website loaded successfully."
    );

});