// DOM Elements
const menuToggle = document.getElementById("menuToggle");
const mainNav = document.querySelector(".main-nav");
const backToTop = document.getElementById("backToTop");

// Hero Slider
const heroSlider = document.getElementById("heroSlider");
const heroSlides = document.querySelectorAll(".hero__slide");
const prevSlide = document.getElementById("prevSlide");
const nextSlide = document.getElementById("nextSlide");
const heroDots = document.getElementById("heroDots");

// Testimonial Slider
const testimonialSlider = document.getElementById("testimonialSlider");
const testimonialSlides = document.querySelectorAll(".testimonial-slide");
const prevTestimonial = document.getElementById("prevTestimonial");
const nextTestimonial = document.getElementById("nextTestimonial");
const testimonialDots = document.getElementById("testimonialDots");

// Video Modal
const videoPlayBtn = document.getElementById("videoPlayBtn");
const videoModal = document.getElementById("videoModal");
const closeModal = document.getElementById("closeModal");
const videoIframe = document.querySelector(".video-container iframe");

// Stats Counter
const statNumbers = document.querySelectorAll(".stat-card__number");

// Mobile Menu Toggle
menuToggle.addEventListener("click", () => {
  mainNav.classList.toggle("active");
  menuToggle.querySelector("i").classList.toggle("bx-menu");
  menuToggle.querySelector("i").classList.toggle("bx-x");
});

// Close mobile menu when clicking outside
document.addEventListener("click", (e) => {
  if (
    !e.target.closest(".main-nav") &&
    !e.target.closest(".menu-toggle") &&
    mainNav.classList.contains("active")
  ) {
    mainNav.classList.remove("active");
    menuToggle.querySelector("i").classList.add("bx-menu");
    menuToggle.querySelector("i").classList.remove("bx-x");
  }
});

// Back to top button
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    backToTop.classList.add("active");
  } else {
    backToTop.classList.remove("active");
  }
});

backToTop.addEventListener("click", (e) => {
  e.preventDefault();
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
});

// Hero Slider Functionality
let currentSlide = 0;

// Create dots for hero slider
heroSlides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("hero__dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToSlide(index);
  });
  heroDots.appendChild(dot);
});

function goToSlide(index) {
  heroSlides.forEach((slide) => slide.classList.remove("active"));
  document
    .querySelectorAll(".hero__dot")
    .forEach((dot) => dot.classList.remove("active"));

  heroSlides[index].classList.add("active");
  document.querySelectorAll(".hero__dot")[index].classList.add("active");
  currentSlide = index;
}

function nextHeroSlide() {
  currentSlide = (currentSlide + 1) % heroSlides.length;
  goToSlide(currentSlide);
}

function prevHeroSlide() {
  currentSlide = (currentSlide - 1 + heroSlides.length) % heroSlides.length;
  goToSlide(currentSlide);
}

// Auto slide for hero
let heroSlideInterval = setInterval(nextHeroSlide, 5000);

// Reset interval on manual navigation
function resetHeroInterval() {
  clearInterval(heroSlideInterval);
  heroSlideInterval = setInterval(nextHeroSlide, 5000);
}

prevSlide.addEventListener("click", () => {
  prevHeroSlide();
  resetHeroInterval();
});

nextSlide.addEventListener("click", () => {
  nextHeroSlide();
  resetHeroInterval();
});

// Testimonial Slider Functionality
let currentTestimonial = 0;

// Create dots for testimonial slider
testimonialSlides.forEach((_, index) => {
  const dot = document.createElement("div");
  dot.classList.add("testimonial-dot");
  if (index === 0) dot.classList.add("active");
  dot.addEventListener("click", () => {
    goToTestimonial(index);
  });
  testimonialDots.appendChild(dot);
});

function goToTestimonial(index) {
  testimonialSlides.forEach((slide) => slide.classList.remove("active"));
  document
    .querySelectorAll(".testimonial-dot")
    .forEach((dot) => dot.classList.remove("active"));

  testimonialSlides[index].classList.add("active");
  document.querySelectorAll(".testimonial-dot")[index].classList.add("active");
  currentTestimonial = index;
}

function nextTestimonialSlide() {
  currentTestimonial = (currentTestimonial + 1) % testimonialSlides.length;
  goToTestimonial(currentTestimonial);
}

function prevTestimonialSlide() {
  currentTestimonial =
    (currentTestimonial - 1 + testimonialSlides.length) %
    testimonialSlides.length;
  goToTestimonial(currentTestimonial);
}

// Auto slide for testimonials
let testimonialInterval = setInterval(nextTestimonialSlide, 4000);

// Reset interval on manual navigation
function resetTestimonialInterval() {
  clearInterval(testimonialInterval);
  testimonialInterval = setInterval(nextTestimonialSlide, 4000);
}

prevTestimonial.addEventListener("click", () => {
  prevTestimonialSlide();
  resetTestimonialInterval();
});

nextTestimonial.addEventListener("click", () => {
  nextTestimonialSlide();
  resetTestimonialInterval();
});

// // Video Modal
// videoPlayBtn.addEventListener("click", (e) => {
//   e.preventDefault();
//   videoModal.classList.add("active");
//   // Set video URL (replace with your actual video URL)
//   videoIframe.src = "https://youtu.be/1I--jJr0Fcg?si=9xeXA8ob4Fwq9LLA";
// });

closeModal.addEventListener("click", () => {
  videoModal.classList.remove("active");
  // Stop video when closing modal
  videoIframe.src = "";
});

// Close modal when clicking outside content
videoModal.addEventListener("click", (e) => {
  if (e.target === videoModal) {
    videoModal.classList.remove("active");
    videoIframe.src = "";
  }
});

// Stats Counter Animation
function animateCounter(el) {
  const target = parseInt(el.getAttribute("data-count"));
  const duration = 2000; // 2 seconds
  const step = target / (duration / 16); // 60fps
  let current = 0;

  const timer = setInterval(() => {
    current += step;
    if (current >= target) {
      el.textContent = target;
      clearInterval(timer);
    } else {
      el.textContent = Math.floor(current);
    }
  }, 16);
}

// Intersection Observer for Stats
const statsObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        statNumbers.forEach(animateCounter);
        statsObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.5 }
);

if (document.querySelector(".stats")) {
  statsObserver.observe(document.querySelector(".stats"));
}

// Load More Cars Button
const loadMoreBtn = document.getElementById("loadMoreCars");
if (loadMoreBtn) {
  loadMoreBtn.addEventListener("click", () => {
    // This would typically load more cars from an API
    // For demo purposes, we'll just show a message
    loadMoreBtn.textContent = "Loading...";

    setTimeout(() => {
      loadMoreBtn.innerHTML = 'All Cars Loaded <i class="bx bx-check"></i>';
      loadMoreBtn.disabled = true;
    }, 1500);
  });
}

// Smooth scroll for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    if (this.getAttribute("href") !== "#") {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      const targetElement = document.querySelector(targetId);

      if (targetElement) {
        // Close mobile menu if open
        if (mainNav.classList.contains("active")) {
          mainNav.classList.remove("active");
          menuToggle.querySelector("i").classList.add("bx-menu");
          menuToggle.querySelector("i").classList.remove("bx-x");
        }

        window.scrollTo({
          top: targetElement.offsetTop - 100,
          behavior: "smooth",
        });
      }
    }
  });
});

// Initialize on page load
document.addEventListener("DOMContentLoaded", () => {
  // Add active class to current nav item based on URL
  const currentLocation = window.location.pathname;
  const navLinks = document.querySelectorAll(".main-nav__link");

  navLinks.forEach((link) => {
    if (link.getAttribute("href") === currentLocation) {
      link.classList.add("active");
    }
  });
});
