// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Menu Toggle
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
            const icon = menuBtn.querySelector('i');
            if (icon.classList.contains('fa-bars')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    // Close mobile menu when clicking on a nav link
    const navItems = document.querySelectorAll('.nav-links li a');
    navItems.forEach(item => {
        item.addEventListener('click', function() {
            if (navLinks.classList.contains('active')) {
                navLinks.classList.remove('active');
                const icon = menuBtn.querySelector('i');
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    });

    // Sticky Header
    const header = document.querySelector('header');
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            header.classList.add('sticky');
        } else {
            header.classList.remove('sticky');
        }
    });

    // Smooth Scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const headerHeight = document.querySelector('header').offsetHeight;
                const targetPosition = targetElement.offsetTop - headerHeight;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Form Submission
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Basic form validation
            if (!name || !email || !subject || !message) {
                alert('Please fill in all fields');
                return;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address');
                return;
            }
            
            // In a real application, you would send this data to a server
            // For now, we'll just show a success message
            alert('Thank you for your message! I will get back to you soon.');
            contactForm.reset();
        });
    }

    // Add animation to elements when they come into view
    const animateOnScroll = function() {
        const elements = document.querySelectorAll('.timeline-item, .skill-category, .about-image, .about-text');
        
        elements.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const windowHeight = window.innerHeight;
            
            if (elementPosition < windowHeight - 100) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // Tab switching for skills section
    const tabButtons = document.querySelectorAll('.skills-tabs .tab-btn');
    const tabContents = document.querySelectorAll('.skills-tabs .tab-content');
    
    // Tab switching for work experience tabs
    const expTabButtons = document.querySelectorAll('.experience-tab-buttons .experience-tab-btn');
    const expTabContents = document.querySelectorAll('.experience-tab-content');
    
    // Tab switching for project tabs within experience
    const projTabButtons = document.querySelectorAll('.project-tab-buttons .project-tab-btn');
    const projTabContents = document.querySelectorAll('.project-tab-content');

    // Function to handle tab switching for skills section
    function switchTab(tabId) {
        // Remove active class from all buttons and contents
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabContents.forEach(content => content.classList.remove('active'));

        // Add active class to clicked button and show corresponding content
        const activeButton = document.querySelector(`.skills-tabs .tab-btn[data-tab="${tabId}"]`);
        const activeContent = document.getElementById(`${tabId}-tab`);
        
        if (activeButton && activeContent) {
            activeButton.classList.add('active');
            activeContent.classList.add('active');
        }
    }
    
    // Function to handle experience tab switching
    function switchExpTab(tabId) {
        // Hide all experience tab contents
        expTabContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Deactivate all experience tab buttons
        expTabButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show the selected tab content
        const selectedContent = document.getElementById(`${tabId}-tab`);
        if (selectedContent) {
            selectedContent.classList.add('active');
        }
        
        // Activate the clicked button
        const selectedButton = document.querySelector(`.experience-tab-btn[data-tab="${tabId}"]`);
        if (selectedButton) {
            selectedButton.classList.add('active');
        }
        
        // Reset project tabs within the experience
        if (selectedContent) {
            const projTabs = selectedContent.querySelectorAll('.project-tab-content');
            const projBtns = selectedContent.querySelectorAll('.project-tab-btn');
            if (projTabs.length > 0) {
                projTabs[0].classList.add('active');
                if (projBtns.length > 0) {
                    projBtns[0].classList.add('active');
                }
            }
        }
    }
    
    // Function to handle project tab switching within experience
    function switchProjTab(tabId, parentContent) {
        // Hide all project tab contents within the parent experience
        const allProjContents = parentContent.querySelectorAll('.project-tab-content');
        allProjContents.forEach(content => {
            content.classList.remove('active');
        });
        
        // Deactivate all project tab buttons within the parent experience
        const allProjButtons = parentContent.querySelectorAll('.project-tab-btn');
        allProjButtons.forEach(button => {
            button.classList.remove('active');
        });
        
        // Show the selected project tab content
        const selectedProjContent = document.getElementById(tabId);
        if (selectedProjContent) {
            selectedProjContent.classList.add('active');
        }
        
        // Activate the clicked project button
        const selectedProjButton = parentContent.querySelector(`.project-tab-btn[data-tab="${tabId}"]`);
        if (selectedProjButton) {
            selectedProjButton.classList.add('active');
        }
    }

    // Add click event listeners to all skills tab buttons
    tabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchTab(tabId);
        });
    });
    
    // Add click event listeners to all experience tab buttons
    expTabButtons.forEach(button => {
        button.addEventListener('click', () => {
            const tabId = button.getAttribute('data-tab');
            switchExpTab(tabId);
            // Update URL hash without page jump
            history.pushState(null, null, `#${tabId}`);
        });
    });
    
    // Add click event listeners to all project tab buttons
    projTabButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const tabId = button.getAttribute('data-tab');
            const parentContent = button.closest('.experience-tab-content');
            if (parentContent) {
                switchProjTab(tabId, parentContent);
            }
            e.stopPropagation(); // Prevent event from bubbling up to parent elements
        });
    });

    // Set the first tab as active by default if no tab is active
    const activeTab = document.querySelector('.tab-btn.active');
    if (tabButtons.length > 0 && !activeTab) {
        const firstTabId = tabButtons[0].getAttribute('data-tab');
        switchTab(firstTabId);
    }
    
    // Initialize experience tabs
    function initializeExpTabs() {
        const expTabButtons = document.querySelectorAll('.experience-tab-buttons .experience-tab-btn');
        const expTabContents = document.querySelectorAll('.experience-tab-content');
        
        // Set the first experience tab as active by default if none is active
        if (expTabButtons.length > 0) {
            const activeExpTab = document.querySelector('.experience-tab-btn.active');
            if (!activeExpTab) {
                const firstExpTabId = expTabButtons[0].getAttribute('data-tab');
                switchExpTab(firstExpTabId);
            } else {
                // If there's already an active tab, make sure its content is shown
                const activeTabId = activeExpTab.getAttribute('data-tab');
                switchExpTab(activeTabId);
            }
        }
    }
    
    // Initialize experience tabs when the page loads
    initializeExpTabs();

    // Handle URL hash for direct linking to tabs
    function handleHashChange() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            // Check if it's an experience tab
            const expTabButton = document.querySelector(`.experience-tab-btn[data-tab="${hash}"]`);
            if (expTabButton) {
                switchExpTab(hash);
                return;
            }
            
            // Check if it's a skills tab
            const skillsTabButton = document.querySelector(`.skills-tabs .tab-btn[data-tab="${hash}"]`);
            if (skillsTabButton) {
                switchTab(hash);
            }
        } else {
            // Default to first tab if no hash
            if (expTabButtons.length > 0) {
                const firstTabId = expTabButtons[0].getAttribute('data-tab');
                switchExpTab(firstTabId);
            }
        }
    }

    // Initial check for hash
    handleHashChange();

    // Listen for hash changes
    window.addEventListener('hashchange', handleHashChange);

    // Set initial styles for animation
    const elementsToAnimate = document.querySelectorAll('.timeline-item, .skill-category, .about-image, .about-text');
    
    // Make sure vibe items are visible
    const vibeItems = document.querySelectorAll('.vibe-item');
    vibeItems.forEach(item => {
        item.style.opacity = '1';
        item.style.transform = 'none';
    });
    elementsToAnimate.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    });
    
    // Run animation on load and scroll
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
});