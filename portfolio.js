// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
    new PureCounter();  // Initialize PureCounter after the DOM is ready
});

// Scroll to top functionality
document.querySelector(".scroll-top").addEventListener("click", () => {
    window.scrollTo({
        top: 0,
        behavior: "smooth",
    });
});

// Utility function to select elements
const select = (el, all = false) => {
    el = el.trim();
    return all ? [...document.querySelectorAll(el)] : document.querySelector(el);
};

// Event listener helper
const on = (type, el, listener, all = false) => {
    const selectEl = select(el, all);
    if (selectEl) {
        if (all) {
            selectEl.forEach(e => e.addEventListener(type, listener));
        } else {
            selectEl.addEventListener(type, listener);
        }
    }
};

// Initialize Isotope on portfolio items after the window is loaded
window.addEventListener('load', () => {
    let portfolioContainer = select('.portfolio-container');
    if (portfolioContainer) {
        let portfolioIsotope = new Isotope(portfolioContainer, {
            itemSelector: '.portfolio-item'
        });

        let portfolioFilters = select('#portfolio-flters li', true);

        // Add click event to filter items
        on('click', '#portfolio-flters li', function (e) {
            e.preventDefault();
            console.log("Filter clicked:", this.getAttribute('data-filter'));

            // Remove active class from all filter items
            portfolioFilters.forEach(function (el) {
                el.classList.remove('filter-active');
            });

            // Add active class to the clicked filter
            this.classList.add('filter-active');

            // Arrange Isotope items according to the clicked filter
            const filterValue = this.getAttribute('data-filter');
            portfolioIsotope.arrange({
                filter: filterValue
            });

            // Refresh AOS after filtering items
            portfolioIsotope.on('arrangeComplete', function () {
                console.log("Isotope arrangement complete!");
                AOS.refresh();  // If you are using AOS (Animate on Scroll)
            });
        }, true);
    }
});


//
//
// Initialize portfolio lightbox (if you're using GLightbox)
const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});
