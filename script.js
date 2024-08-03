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
    container.style.transform = `translateX(-${index * 80}%)`;
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