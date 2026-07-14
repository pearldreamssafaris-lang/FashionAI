// ==============================
// FashionAI Premium
// app.js
// ==============================

document.addEventListener("DOMContentLoaded", () => {

    // Google Button
    const googleBtn = document.getElementById("googleLogin");

    if (googleBtn) {
        googleBtn.addEventListener("click", () => {

            alert("Google Sign-In will be connected in the next step.");

        });
    }

    // Guest Button
    const guestBtn = document.getElementById("guestLogin");

    if (guestBtn) {
        guestBtn.addEventListener("click", () => {

            window.location.href = "home.html";

        });
    }

    // Animate Cards
    document.querySelectorAll(".card,.hero-card").forEach((card, index) => {

        card.style.opacity = "0";

        setTimeout(() => {

            card.classList.add("fade-in");
            card.style.opacity = "1";

        }, index * 200);

    });

    // Quick Buttons
    document.querySelectorAll(".quick-btn").forEach(button => {

        button.addEventListener("click", () => {

            const action = button.dataset.action;

            switch (action) {

                case "upload":
                    window.location.href = "upload.html";
                    break;

                case "wardrobe":
                    window.location.href = "wardrobe.html";
                    break;

                case "outfits":
                    window.location.href = "outfits.html";
                    break;

                case "favorites":
                    window.location.href = "favorites.html";
                    break;

                default:
                    alert("Coming Soon...");
            }

        });

    });

    // Navigation
    document.querySelectorAll("nav button").forEach(button => {

        button.addEventListener("click", () => {

            document
                .querySelectorAll("nav button")
                .forEach(btn => btn.classList.remove("active"));

            button.classList.add("active");

        });

    });

    // Welcome Message
    const hour = new Date().getHours();

    let greeting = "Welcome";

    if (hour < 12) {
        greeting = "Good Morning ☀️";
    } else if (hour < 18) {
        greeting = "Good Afternoon 🌤";
    } else {
        greeting = "Good Evening 🌙";
    }

    const greetingElement = document.getElementById("greeting");

    if (greetingElement) {
        greetingElement.textContent = greeting;
    }

    console.log("✨ FashionAI Premium Started");

});

// ==============================
// PWA Service Worker
// ==============================

if ("serviceWorker" in navigator) {

    window.addEventListener("load", () => {

        navigator.serviceWorker
            .register("sw.js")
            .then(() => {

                console.log("✅ Service Worker Registered");

            })
            .catch(error => {

                console.log(error);

            });

    });

}
