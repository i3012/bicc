import './style.css';
import Swiper from 'swiper';
import { Navigation, Pagination, Autoplay, EffectFade } from 'swiper/modules';
import AOS from 'aos';

// Initialize AOS
AOS.init({
  duration: 1000,
  once: true,
});

// Initialize Hero Slider
const heroSwiper = new Swiper('.hero .swiper', {
  modules: [Navigation, Pagination, Autoplay, EffectFade],
  loop: true,
  effect: 'fade',
  speed: 1000,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 5000,
    disableOnInteraction: false,
  }
});

// Initialize Activities Slider
const activitiesSwiper = new Swiper('.activities-swiper', {
  modules: [Navigation, Pagination, Autoplay],
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    1024: {
      slidesPerView: 3,
    }
  }
});

// Initialize Testimonials Slider
const testimonialSwiper = new Swiper('.testimonials-slider', {
  modules: [Pagination, Autoplay],
  loop: true,
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },
  autoplay: {
    delay: 4000,
    disableOnInteraction: false,
  },
});

// Mobile Navigation
const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
const navLinks = document.querySelector('.nav-links');

mobileNavToggle.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
  });
});

// Countdown Timer
function updateCountdown() {
  const now = new Date();
  const nextSunday = new Date();
  nextSunday.setDate(now.getDate() + (7 - now.getDay()));
  nextSunday.setHours(14, 0, 0, 0);

  if (now > nextSunday) {
    nextSunday.setDate(nextSunday.getDate() + 7);
  }

  const diff = nextSunday - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((diff % (1000 * 60)) / 1000);

  document.getElementById('days').textContent = String(days).padStart(2, '0');
  document.getElementById('hours').textContent = String(hours).padStart(2, '0');
  document.getElementById('minutes').textContent = String(minutes).padStart(2, '0');
  document.getElementById('seconds').textContent = String(seconds).padStart(2, '0');
}

setInterval(updateCountdown, 1000);
updateCountdown();

const contactForm = document.querySelector("form");

contactForm.addEventListener("submit", function (e) {
  e.preventDefault();

  fetch(contactForm.action, {
    method: "POST",
    body: new FormData(contactForm),
  })
  .then(response => response.json())
  .then(data => {
    if (data.success) {
      alert('Thank you for your message! We will get back to you soon.');
      contactForm.reset();
    } else {
      alert("Erreur lors de l'envoi du message. Veuillez réessayer.");
    }
  })
  .catch(error => console.error("Erreur:", error));
});

// Scroll Header
const header = document.querySelector('.header');
let lastScroll = 0;

window.addEventListener('scroll', () => {
  const currentScroll = window.pageYOffset;

  if (currentScroll <= 0) {
    header.classList.remove('scroll-up');
    return;
  }

  if (currentScroll > lastScroll && !header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-up');
    header.classList.add('scroll-down');
  } else if (currentScroll < lastScroll && header.classList.contains('scroll-down')) {
    header.classList.remove('scroll-down');
    header.classList.add('scroll-up');
  }
  lastScroll = currentScroll;
});
