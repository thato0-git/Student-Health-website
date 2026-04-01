// Interactive Navigation, Form Validation, Theme Toggle, and Back-to-Top

document.addEventListener('DOMContentLoaded', () => {
  // ===== THEME TOGGLE (Dark Mode) =====
  const themeToggle = document.getElementById('theme-toggle');
  const htmlElement = document.documentElement;

  // Load saved theme from localStorage
  try {
    const savedTheme = localStorage.getItem('theme') || 'light';
    if (savedTheme === 'dark') {
      htmlElement.classList.add('dark-theme');
      themeToggle.textContent = '☀️ Light Mode';
    } else {
      htmlElement.classList.remove('dark-theme');
      themeToggle.textContent = '🌙 Dark Mode';
    }
  } catch (e) {
    console.warn('localStorage unavailable:', e);
  }

  // Toggle theme on button click
  themeToggle.addEventListener('click', () => {
    htmlElement.classList.toggle('dark-theme');
    const isDarkMode = htmlElement.classList.contains('dark-theme');
    themeToggle.textContent = isDarkMode ? '☀️ Light Mode' : '🌙 Dark Mode';

    // Save theme preference
    try {
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    } catch (e) {
      console.warn('localStorage unavailable:', e);
    }
  });

  // ===== BACK-TO-TOP BUTTON =====
  const backToTopBtn = document.getElementById('back-to-top');

  // Show/hide button on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  // Scroll to top on button click
  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // ===== NAVIGATION =====
  const navItems = document.querySelectorAll("nav ul li");
  const sections = document.querySelectorAll("main section");
  const form = document.getElementById("feedback");
  const formStatus = document.getElementById("form-status");

  function showSection(id) {
    sections.forEach((section) => {
      section.classList.toggle("active", section.id === id);
    });

    navItems.forEach((item) => {
      item.classList.toggle("active", item.dataset.target === id);
    });
  }

  navItems.forEach((item) => {
    item.addEventListener("click", () => {
      showSection(item.dataset.target);
    });
    item.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        item.click();
      }
    });
  });

  // ===== FORM VALIDATION =====
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    const message = form.message.value.trim();
    if (!message) {
      formStatus.style.color = "red";
      formStatus.textContent = "Please enter a message.";
      return;
    }

    formStatus.style.color = "darkgreen";
    formStatus.textContent = "Thank you for your feedback!";
    form.reset();

    // Save feedback to localStorage (optional)
    try {
      const feedbacks = JSON.parse(localStorage.getItem('feedbacks')) || [];
      feedbacks.push({
        name: form.name.value || 'Anonymous',
        email: form.email.value || 'N/A',
        message: message,
        timestamp: new Date().toISOString()
      });
      localStorage.setItem('feedbacks', JSON.stringify(feedbacks));
    } catch (e) {
      console.warn('localStorage unavailable:', e);
    }
  });

  // ===== SLIDESHOW AUTO-CYCLE =====
  const slides = document.querySelectorAll('.slide');
  let currentSlide = 0;
  const slideInterval = 5000; // 5 seconds

  function showSlide(index) {
    slides.forEach((slide, i) => {
      slide.classList.toggle('active', i === index);
    });
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % slides.length;
    showSlide(currentSlide);
  }

  // Auto cycle images
  if (slides.length > 0) {
    setInterval(nextSlide, slideInterval);
  }
});