/* ================================
   SCROLL REVEAL ANIMATION
================================ */
const revealElements = document.querySelectorAll(".reveal");

function revealOnScroll() {
    const windowHeight = window.innerHeight;
    const revealPoint = 100;

    revealElements.forEach(el => {
        const elementTop = el.getBoundingClientRect().top;
        if (elementTop < windowHeight - revealPoint) {
            el.classList.add("active");
        }
    });
}

/* ================================
   NAVBAR ACTIVE LINK (SCROLL SPY)
================================ */
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

function updateActiveNav() {
    let currentSection = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 150;
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
   SKILL PROGRESS BAR ANIMATION
================================ */
const skillBars = document.querySelectorAll(".progress-bar");
const skillsSection = document.getElementById("skills");
let skillsAnimated = false;

function animateSkills() {
    if (!skillsSection) return;

    const sectionTop = skillsSection.getBoundingClientRect().top;

    if (sectionTop < window.innerHeight - 100 && !skillsAnimated) {
        skillBars.forEach(bar => {
            bar.style.width = bar.dataset.width;
        });
        skillsAnimated = true;
    }
}

/* ================================
   HAMBURGER MENU (MOBILE)
================================ */
const hamburger = document.getElementById("hamburger");
const navLinksMenu = document.getElementById("navLinks");

if (hamburger && navLinksMenu) {
    hamburger.addEventListener("click", () => {
        navLinksMenu.classList.toggle("active");
    });

    // Close menu when a link is clicked
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", () => {
            navLinksMenu.classList.remove("active");
        });
    });
}

/* ================================
   VIDEO MODAL (PROJECT DEMOS)
================================ */
const videoModal = document.getElementById("videoModal");
const projectVideo = document.getElementById("projectVideo");

function openVideo(videoSrc) {
    if (!videoModal || !projectVideo) return;

    projectVideo.src = videoSrc;
    videoModal.style.display = "block";
    projectVideo.play();
}

function closeVideo() {
    if (!videoModal || !projectVideo) return;

    projectVideo.pause();
    projectVideo.currentTime = 0;
    projectVideo.src = "";
    videoModal.style.display = "none";
}

// Close video when clicking outside video
window.addEventListener("click", (e) => {
    if (e.target === videoModal) {
        closeVideo();
    }
});

/* ================================
   MAIN SCROLL HANDLER
================================ */
function onScrollHandler() {
    revealOnScroll();
    updateActiveNav();
    animateSkills();
}

window.addEventListener("scroll", onScrollHandler);
onScrollHandler();
