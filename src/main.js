// Smooth scroll
const lenis = new Lenis();
function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
}
requestAnimationFrame(raf);


document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute("href"));
        if (target) {
            lenis.scrollTo(target);
        }
    });
});

const detailsToggleBtn = document.querySelectorAll(".details-toggle-btn");
function handleDetailsToggle(e) {
    const target = e.target.parentElement.nextElementSibling;
    const icon = e.target.classList.contains("details-icon")
        ? e.target
        : e.target.previousElementSibling;
    if (target.classList.contains("details-open")) {
        target.classList.remove("details-open");
        target.style.height = 0;
        target.style.opacity = 0;
        icon.style.transform = "rotate(0deg)";
    } else {
        target.classList.add("details-open");
        target.style.height = target.scrollHeight + "px";
        target.style.opacity = 1;
        icon.style.transform = "rotate(90deg)";
    }
}

detailsToggleBtn.forEach((ele) =>
    ele.addEventListener("click", handleDetailsToggle)
);

const heroBtn = document.querySelector(".hero-btn");
const heroBtnText = document.querySelector(".hero-btn-text");

function handleContactBtnMove(e) {
    const btnPos = heroBtn.getBoundingClientRect();
    const btnStrength = 50;
    const btnTextStrength = 25;
    const updatedX = ((e.clientX - btnPos.x) / btnPos.width - 0.5).toFixed(2);
    const updatedY = ((e.clientY - btnPos.y) / btnPos.height - 0.5).toFixed(2);

    heroBtn.style.transform = `translate3d(${updatedX * btnStrength}px, ${
        updatedY * btnStrength
    }px, 0px)`;
    heroBtnText.style.transform = `translate3d(${
        updatedX * btnTextStrength
    }px, ${updatedY * btnTextStrength}px, 0px)`;
}

const handleContactBtnLeave = () => {
    heroBtn.style.transform = `translate3d(0px,0px,0px)`;
    heroBtnText.style.transform = `translate3d(0px,0px,0px)`;
};

if (window.innerWidth > 600) {
    heroBtn.addEventListener("mousemove", handleContactBtnMove);
    heroBtn.addEventListener("mouseleave", handleContactBtnLeave);
}

// Add position sticky to navbar
const nav = document.querySelector("nav");
const skillsSection = document.querySelector(".skills-section");

const navOptions = {
    rootMargin: "0px",
    threshold: 1,
    root: null,
};

const handleNavPosition = ([ele]) => {
    if (ele.boundingClientRect.top > 0) {
        nav.classList.remove("sticky-nav");
    } else {
        nav.classList.add("sticky-nav");
    }
};

const navObserver = new IntersectionObserver(handleNavPosition, navOptions);
navObserver.observe(skillsSection);

// Adding reveal transition on Projects
const projects = document.querySelectorAll(".project");
const projectOptions = {
    rootMargin: "300px",
    threshold: 0.7,
    root: null,
};
const handleRevealProjects = (proj, observer) => {
    proj.forEach((ele) => {
        if (ele.isIntersecting) {
            ele.target.classList.remove("opacity-0");
            ele.target.style.transform = "translate3d(0px,0px,0px)";
            const targetImg = ele.target.querySelector(".proj-img");
            targetImg.src = targetImg.dataset.src;
            targetImg.addEventListener("load", () => {
                targetImg.classList.remove("blur-[8px]");
            });
            observer.unobserve(ele.target);
        }
    });
};
const projectsObserver = new IntersectionObserver(
    handleRevealProjects,
    projectOptions
);
projects.forEach((proj) => projectsObserver.observe(proj));
