/* ================================
   ELEMENT SELECTORS
================================ */
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const hamburger = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("navLinks");

const skillBars = document.querySelectorAll(".progress-bar");
const skillsSection = document.getElementById("skills-experience");

const navbar = document.querySelector(".navbar");

/* VIDEO MODAL ELEMENTS */
const videoModal = document.getElementById("videoModal");
const modalVideo = document.getElementById("modalVideo");

let skillsAnimated = false;

/* ================================
   SCROLL REVEAL
================================ */
function revealOnScroll() {
    revealElements.forEach(el => {
        const rect = el.getBoundingClientRect();
        if (rect.top < window.innerHeight - 120) {
            el.classList.add("active");
        }
    });
}

/* ================================
   NAVBAR SHADOW + SCROLL SPY
================================ */
function updateNavbar() {
    if (!navbar) return;

    navbar.style.boxShadow =
        window.scrollY > 20
            ? "0 10px 30px rgba(0,0,0,0.35)"
            : "none";

    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 250;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${currentSection}`) {
            link.classList.add("active");
        }
    });
}

/* ================================
   SKILLS ANIMATION (ONCE)
================================ */
function animateSkills() {
    if (!skillsSection || skillsAnimated) return;

    const rect = skillsSection.getBoundingClientRect();
    if (rect.top < window.innerHeight - 120) {
        skillBars.forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
        skillsAnimated = true;
    }
}

/* ================================
   HAMBURGER MENU
================================ */
if (hamburger && navLinksMenu) {
    hamburger.addEventListener("click", () => {
        navLinksMenu.classList.toggle("active");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinksMenu.classList.remove("active");
        });
    });
}
/* ================================
   VIDEO MODAL (MOBILE SAFE)
================================ */
function openVideo(videoSrc) {
    if (!videoModal || !modalVideo) return;

    modalVideo.src = videoSrc;
    videoModal.style.display = "flex";
    document.body.style.overflow = "hidden";

    modalVideo.load();

    // Play only after user interaction (mobile safe)
    setTimeout(() => {
        modalVideo.play().catch(() => {});
    }, 200);
}

function closeVideo() {
    if (!videoModal || !modalVideo) return;

    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.src = "";

    videoModal.style.display = "none";
    document.body.style.overflow = "auto";
}

/* Tap outside to close */
videoModal.addEventListener("click", (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

/* ESC key (desktop) */
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && videoModal.style.display === "flex") {
        closeVideo();
    }
});


/* ================================
   MAIN SCROLL HANDLER
================================ */
function onScrollHandler() {
    revealOnScroll();
    updateNavbar();
    animateSkills();
}

window.addEventListener("scroll", onScrollHandler);
window.addEventListener("load", onScrollHandler);

/* ================================
   CONTACT FORM VALIDATION + AUTO HIDE
================================ */
const contactForm = document.getElementById("contactForm");
const successMsg = document.getElementById("formSuccess");

function showError(input, message) {
    const group = input.parentElement;
    const error = group.querySelector(".error-msg");
    group.classList.add("error");
    error.textContent = message;
    error.style.display = "block";
}

function clearError(input) {
    const group = input.parentElement;
    const error = group.querySelector(".error-msg");
    group.classList.remove("error");
    error.textContent = "";
    error.style.display = "none";
}

function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

if (contactForm) {
    contactForm.addEventListener("submit", async (e) => {
        e.preventDefault();

        let valid = true;

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const message = document.getElementById("message");
        const submitBtn = document.querySelector(".submit-btn");

        [name, email, message].forEach(clearError);

        if (name.value.trim() === "") {
            showError(name, "Name is required");
            valid = false;
        }

        if (!validateEmail(email.value)) {
            showError(email, "Enter a valid email address");
            valid = false;
        }

        if (message.value.trim().length < 10) {
            showError(message, "Message must be at least 10 characters");
            valid = false;
        }

        if (!valid) return;

        submitBtn.classList.add("loading");

        try {
            const response = await fetch(contactForm.action, {
                method: "POST",
                body: new FormData(contactForm),
                headers: { Accept: "application/json" }
            });

            if (response.ok) {
                contactForm.reset();
                successMsg.style.display = "block";

                setTimeout(() => {
                    successMsg.style.display = "none";
                }, 4000);
            } else {
                alert("Something went wrong. Please try again.");
            }
        } catch {
            alert("Network error. Please try again.");
        } finally {
            submitBtn.classList.remove("loading");
        }
    });
}
