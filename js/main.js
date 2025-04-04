document.addEventListener('DOMContentLoaded', function() {
    // Initialize ScrollReveal
    ScrollReveal().reveal('.feature-card, .process-step, .pricing-card, .testimonial-card, .team-member', {
        interval: 100,
        distance: '20px',
        origin: 'bottom',
        easing: 'cubic-bezier(0.5, 0, 0, 1)',
        reset: true
    });

    // Process steps interaction
    const steps = document.querySelectorAll('.process-step');
    const stepImages = document.querySelectorAll('.step-image');
    
    steps.forEach(step => {
        step.addEventListener('click', function() {
            const stepNum = this.getAttribute('data-step');
            
            // Update active step
            steps.forEach(s => s.classList.remove('active'));
            this.classList.add('active');
            
            // Update corresponding image
            stepImages.forEach(img => {
                img.classList.remove('active');
                if(img.getAttribute('data-for-step') === stepNum) {
                    img.classList.add('active');
                }
            });
        });
    });

    // Back to top button
    const backToTopButton = document.getElementById('backToTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            backToTopButton.classList.remove('hidden');
        } else {
            backToTopButton.classList.add('hidden');
        }
    });
    
    backToTopButton.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const message = document.getElementById('message').value;
            
            // Here you would typically send the form data to your server
            console.log('Form submitted:', { name, email, message });
            
            // Show success message
            alert('Thank you for your message! We will get back to you soon.');
            
            // Reset form
            contactForm.reset();
        });
    }

    // Floating icons animation with Anime.js
    const floatingIcons = [
        { id: 'floating-icon-1', duration: 6000, delay: 0 },
        { id: 'floating-icon-2', duration: 5000, delay: 1000 },
        { id: 'floating-icon-3', duration: 7000, delay: 500 }
    ];
    
    floatingIcons.forEach(icon => {
        anime({
            targets: `#${icon.id}`,
            translateY: [-15, 0],
            duration: icon.duration,
            delay: icon.delay,
            direction: 'alternate',
            loop: true,
            easing: 'easeInOutSine'
        });
    });

    // Logo animation on hover
    const logo = document.querySelector('.navbar-brand img');
    if (logo) {
        logo.addEventListener('mouseenter', function() {
            anime({
                targets: logo,
                scale: 1.1,
                duration: 500,
                easing: 'easeOutElastic'
            });
        });
        
        logo.addEventListener('mouseleave', function() {
            anime({
                targets: logo,
                scale: 1,
                duration: 300,
                easing: 'easeOutQuad'
            });
        });
    }

    // Navbar scroll effect
    const navbar = document.querySelector('.navbar');
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 50) {
                navbar.classList.add('navbar-scrolled');
            } else {
                navbar.classList.remove('navbar-scrolled');
            }
        });
    }
});

// Dark and Light mode switcher
document.addEventListener('DOMContentLoaded', function() {
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
  
    // Function to set theme
    function setTheme(isDark) {
      if (isDark) {
        document.body.classList.add('dark-mode');
        // Update desktop button text
        if (themeToggle) {
          themeToggle.querySelector('span').textContent = 'Light Mode';
        }
        // Update mobile button icon
        if (mobileThemeToggle) {
          mobileThemeToggle.innerHTML = '<i class="fas fa-sun"></i>';
        }
      } else {
        document.body.classList.remove('dark-mode');
        // Update desktop button text
        if (themeToggle) {
          themeToggle.querySelector('span').textContent = 'Dark Mode';
        }
        // Update mobile button icon
        if (mobileThemeToggle) {
          mobileThemeToggle.innerHTML = '<i class="fas fa-moon"></i>';
        }
      }
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
    }
  
    // Function to toggle theme
    function toggleTheme() {
      const isDark = !document.body.classList.contains('dark-mode');
      setTheme(isDark);
    }
  
    // Initialize theme
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    setTheme(savedTheme === 'dark');
  
    // Event listeners
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) mobileThemeToggle.addEventListener('click', toggleTheme);
  
    // Watch for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', e => {
      setTheme(e.matches);
    });
  });