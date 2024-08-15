document.addEventListener('DOMContentLoaded', () => {
  const sections = document.querySelectorAll('.section');
  const container = document.querySelector('.section-container');
  let currentSection = 0;

  const sectionTexts = [
    "Is your shop stuck in 2010\nwhile customers shop in 2024?",
    "Make your data visible now,\nAttract more customers!",
    "Why do your regulars become\nyour competitor's new customers?"
  ];

  let typedInstance = null;

  function showSection(index) {
    container.style.transform = `translateX(-${index * 100}%)`;
    sections.forEach((section, i) => {
      if (i === index) {
        section.classList.add('active');
        if (typedInstance) {
          typedInstance.destroy();
        }
        typedInstance = new Typed(section.querySelector('.typing-text'), {
          strings: [sectionTexts[i]],
          typeSpeed: 40,
          backSpeed: 0,
          loop: true,
          showCursor: true,
          cursorChar: '|',
        });
        showHashtags(section);
      } else {
        section.classList.remove('active');
        hideHashtags(section);
      }
    });
  }

  function showHashtags(section) {
    const hashtags = section.querySelectorAll('.hashtags span');
    hashtags.forEach((tag, index) => {
      setTimeout(() => {
        tag.classList.add('visible');
      }, index * 200);
    });
  }

  function hideHashtags(section) {
    const hashtags = section.querySelectorAll('.hashtags span');
    hashtags.forEach(tag => {
      tag.classList.remove('visible');
    });
  }

  function nextSection() {
    currentSection = (currentSection + 1) % sections.length;
    showSection(currentSection);
  }

  // Start the slideshow
  showSection(currentSection);

  // Change section every 10 seconds
  setInterval(nextSection, 10000);
});
// Intersection Observer for revealing features on scroll
const featureObservser = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('feature-visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.feature').forEach(feature => {
  featureObserver.observe(feature);
});

// Smooth scroll to features when nav links are clicked
document.querySelectorAll('nav a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Optional: Add a subtle parallax effect to GIFs
window.addEventListener('scroll', () => {
  document.querySelectorAll('.feature-gif').forEach(gif => {
    const speed = 0.5;
    const yPos = -(window.pageYOffset * speed);
    gif.style.backgroundPositionY = yPos + 'px';
  });
});

const carousel = document.querySelector('.testimonial-carousel');
let isDown = false;
let startX;
let scrollLeft;

carousel.addEventListener('mousedown', (e) => {
  isDown = true;
  startX = e.pageX - carousel.offsetLeft;
  scrollLeft = carousel.scrollLeft;
});

carousel.addEventListener('mouseleave', () => {
  isDown = false;
});

carousel.addEventListener('mouseup', () => {
  isDown = false;
});

carousel.addEventListener('mousemove', (e) => {
  if (!isDown) return;
  e.preventDefault();
  const x = e.pageX - carousel.offsetLeft;
  const walk = (x - startX) * 2;
  carousel.scrollLeft = scrollLeft - walk;
});