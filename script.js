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
