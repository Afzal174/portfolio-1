/* ================================
   ELEMENT SELECTORS
================================ */
const revealElements = document.querySelectorAll(".reveal");
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

const hamburger = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("navLinks");

const videoModal = document.getElementById("videoModal");
const projectVideo = document.getElementById("projectVideo");

const skillBars = document.querySelectorAll(".progress-bar");
const skillsSection = document.getElementById("skills-experience");

const navbar = document.querySelector(".navbar");

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
    // Shadow on scroll
    if (window.scrollY > 20) {
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
    } else {
        navbar.style.boxShadow = "none";
    }

    // Scroll spy
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 250;
        if (window.pageYOffset >= sectionTop) {
            currentSection = section.getAttribute("id");
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
   VIDEO MODAL
================================ */
function openVideo(videoSrc) {
    if (!videoModal || !projectVideo) return;

    projectVideo.src = videoSrc;
    videoModal.style.display = "block";
    document.body.style.overflow = "hidden";
    projectVideo.play();
}

function closeVideo() {
    if (!videoModal || !projectVideo) return;

    projectVideo.pause();
    projectVideo.currentTime = 0;
    projectVideo.src = "";
    videoModal.style.display = "none";
    document.body.style.overflow = "auto";
}

// Click outside modal
window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

// ESC key close
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
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

        // Clear old errors
        [name, email, message].forEach(clearError);

        // Name validation
        if (name.value.trim() === "") {
            showError(name, "Name is required");
            valid = false;
        }

        // Email validation
        if (!validateEmail(email.value)) {
            showError(email, "Enter a valid email address");
            valid = false;
        }

        // Message validation
        if (message.value.trim().length < 10) {
            showError(message, "Message must be at least 10 characters");
            valid = false;
        }

        if (!valid) return;

        // Submit with loader
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

                // Auto-hide success message
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
