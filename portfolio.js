// Ensure DOM is fully loaded before running scripts
document.addEventListener('DOMContentLoaded', function () {
    new PureCounter();  // Initialize PureCounter after the DOM is ready
});

document.addEventListener('DOMContentLoaded', function () {
    AOS.init();
});

// Scroll to Top Button
const scrollButton = document.querySelector(".scroll-top");

if (scrollButton) {
    window.addEventListener("scroll", () => {
        if (window.scrollY > 200) {
            scrollButton.style.opacity = "1";
            scrollButton.style.visibility = "visible";
        } else {
            scrollButton.style.opacity = "0";
            scrollButton.style.visibility = "hidden";
        }
    });

    scrollButton.addEventListener("click", () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    });
}

// Navbar Scroll Effect
// const navbar = document.querySelector(".navbar");
// if (navbar) {
//     window.addEventListener("scroll", () => {
//         if (window.scrollY > 100) {
//             navbar.classList.add("scrolled");
//         } else {
//             navbar.classList.remove("scrolled");
//         }
//     });
// }

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
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows' // Optional: Use 'fitRows' or 'masonry' based on your design
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

            // Refresh AOS after filtering items (if AOS is used)
            if (typeof AOS !== 'undefined') {
                AOS.refresh();
            }
        }, true);
    }
});

// Initialize portfolio lightbox (if you're using GLightbox)
const portfolioLightbox = GLightbox({
    selector: '.portfolio-lightbox'
});