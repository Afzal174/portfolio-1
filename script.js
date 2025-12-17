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
const skillsSection = document.getElementById("skills");

const themeToggle = document.getElementById("themeToggle");
const navbar = document.querySelector(".navbar");

let skillsAnimated = false;

/* ================================
   SCROLL REVEAL (OPTIMIZED)
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
   NAVBAR SCROLL EFFECT + SCROLL SPY
================================ */
function updateNavbar() {
    if (window.scrollY > 20) {
        navbar.style.boxShadow = "0 10px 30px rgba(0,0,0,0.35)";
    } else {
        navbar.style.boxShadow = "none";
    }

    let current = "";
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 200;
        if (window.pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(link => {
        link.classList.remove("active");
        if (link.getAttribute("href") === `#${current}`) {
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
        document.body.classList.toggle("menu-open");
    });

    navLinks.forEach(link => {
        link.addEventListener("click", () => {
            navLinksMenu.classList.remove("active");
            document.body.classList.remove("menu-open");
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

// Click outside to close
window.addEventListener("click", (e) => {
    if (e.target === videoModal) closeVideo();
});

// ESC key close
window.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeVideo();
});

/* ================================
   THEME TOGGLE (DARK / LIGHT)
================================ */
function setTheme(theme) {
    if (theme === "light") {
        document.body.classList.add("light-theme");
        themeToggle.innerHTML = "☀️";
    } else {
        document.body.classList.remove("light-theme");
        themeToggle.innerHTML = "🌙";
    }
    localStorage.setItem("theme", theme);
}

if (themeToggle) {
    const savedTheme = localStorage.getItem("theme") || "dark";
    setTheme(savedTheme);

    themeToggle.addEventListener("click", () => {
        const isLight = document.body.classList.contains("light-theme");
        setTheme(isLight ? "dark" : "light");
    });
}

/* ================================
   MAIN SCROLL HANDLER
================================ */
function onScroll() {
    revealOnScroll();
    updateNavbar();
    animateSkills();
}

window.addEventListener("scroll", onScroll);
window.addEventListener("load", onScroll);
