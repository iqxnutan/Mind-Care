let currentSlideIndex = 0;

// Function to change slides
function showSlide(n) {
    const slides = document.querySelectorAll('.slider-items .slider-item');
    const dots = document.querySelectorAll('.slider-dots .dot');

    if (n >= slides.length) currentSlideIndex = 0;
    if (n < 0) currentSlideIndex = slides.length - 1;

    // Hide all slides
    slides.forEach((slide, index) => {
        slide.style.display = 'none';
        dots[index].classList.remove('active');
    });

    // Show the current slide
    slides[currentSlideIndex].style.display = 'block';
    dots[currentSlideIndex].classList.add('active');
}

// Show the current slide based on the index
function currentSlide(n) {
    currentSlideIndex = n - 1;
    showSlide(currentSlideIndex);
}

// Initialize the slider
showSlide(currentSlideIndex);

// Automatically change the slide every 5 seconds
setInterval(() => {
    currentSlideIndex++;
    showSlide(currentSlideIndex);
}, 5000);


// Form validation
// Form submission with fetch
document.getElementById("appointment-form").addEventListener("submit", async function (e) {
  e.preventDefault();

  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const date = document.getElementById("date").value;
  const department = document.getElementById("department").value;
  const message = document.getElementById("message").value.trim();

  // Validation
  if (!name || !email || !phone || !date || !department) {
    alert("Please fill in all required fields.");
    return;
  }

  // Prepare data
  const formData = {
    name, email, phone, date, department, message
  };

  // Send to backend
  try {
    const response = await fetch("http://localhost:3000/api/appointments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    const result = await response.json();
    alert(result.message || "Appointment submitted successfully!");

    // Optional: reset the form
    this.reset();
  } catch (error) {
    console.error("Error:", error);
    alert("Something went wrong. Please try again later.");
  }
});




  
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute("href"));
      if (target) {
        target.scrollIntoView({
          behavior: "smooth",
          block: "start"
        });
      }
    });
  });
  
  // Back to top button smooth scroll
  const backToTopBtn = document.querySelector('.angle-up-btn a');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }
  
  // Sticky nav visual change
  window.addEventListener("scroll", function () {
    const nav = document.querySelector("nav");
    if (window.scrollY > 50) {
      nav.classList.add("scrolled");
    } else {
      nav.classList.remove("scrolled");
    }
  });