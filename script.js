document.addEventListener('DOMContentLoaded', () => {
    // Problem section toggling
    const problemSection = document.getElementById('problem');
    const slides = problemSection.querySelectorAll('.slide');
    let currentSlide = 0;

    function showSlide(index) {
        slides.forEach((slide, i) => {
            if (i === index) {
                slide.classList.add('active');
                typeText(slide.querySelector('h2'));
                typeText(slide.querySelector('p'));
            } else {
                slide.classList.remove('active');
            }
        });
    }


    function nextSlide() {
        currentSlide = (currentSlide + 1) % slides.length;
        showSlide(currentSlide);
    }

    problemSection.addEventListener('click', nextSlide);

    // Initial slide display
    showSlide(currentSlide);

    // Typing animation
    function typeText(element) {
        const text = element.textContent;
        element.textContent = '';
        let i = 0;

        function type() {
            if (i < text.length) {
                element.textContent += text.charAt(i);
                i++;
                setTimeout(type, 50);
            }
        }

        type();
    }

    // ... rest of your JavaScript code ...
});
