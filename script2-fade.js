const fadeInElements = document.querySelectorAll('.fade-in'); 

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            observer.unobserve(entry.target); // Stop observing once visible
        }
    });
}, { threshold: 0.1 });


fadeInElements.forEach(element => { 
    console.log("Observing:", element); // Debug: Log each element being observed
    observer.observe(element); 
});

