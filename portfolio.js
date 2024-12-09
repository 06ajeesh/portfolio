document.addEventListener('DOMContentLoaded', function () {
    new PureCounter();  // Initialize PureCounter after the DOM is ready
});

document.querySelector(".scroll-top").addEventListener("click",()=>{
    window.scrollTo({
        top:0,
        behavior:"smooth",
    });
});