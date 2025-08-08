// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for all internal links (buttons, etc.)
document.querySelectorAll('a[href^="#"], .btn[href^="#"]').forEach(link => {
    link.addEventListener('click', function (e) {
        const href = this.getAttribute('href');
        if (href && href !== '#') {
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerOffset = 80;
                const elementPosition = target.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Enhanced smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const headerOffset = 80; // Account for fixed navbar
            const elementPosition = target.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Navbar background change on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(255, 255, 255, 0.2)';
    } else {
        navbar.style.background = 'rgba(255, 255, 255, 0.1)';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(this);
        const name = this.querySelector('input[type="text"]').value;
        const email = this.querySelector('input[type="email"]').value;
        const interest = this.querySelector('select').value;
        const message = this.querySelector('textarea').value;
        
        // Simple validation
        if (!name || !email || !message) {
            alert('Please fill in all required fields.');
            return;
        }
        
        // Email validation
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert('Please enter a valid email address.');
            return;
        }
        
        // Simulate form submission
        const submitBtn = this.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        
        // Simulate API call
        setTimeout(() => {
            alert('Thank you for your message! We will get back to you soon.');
            this.reset();
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
        }, 2000);
    });
}

// Product card hover effects
document.querySelectorAll('.product-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-10px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Add to cart functionality
document.querySelectorAll('.btn-primary').forEach(btn => {
    if (btn.textContent === 'Add to Cart') {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            const productName = this.closest('.product-card').querySelector('h3').textContent;
            
            // Animate button
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = 'scale(1)';
            }, 150);
            
            // Show success message
            const originalText = this.textContent;
            this.textContent = 'Added!';
            this.style.background = '#4CAF50';
            
            setTimeout(() => {
                this.textContent = originalText;
                this.style.background = '';
            }, 2000);
            
            console.log(`Added ${productName} to cart`);
        });
    }
});

// Animate elements on scroll
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe all cards and sections
document.querySelectorAll('.glass-card, .section-title').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Counter animation for stats
function animateCounter(element, target, duration = 2000) {
    let start = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        start += increment;
        if (start >= target) {
            element.textContent = target;
            clearInterval(timer);
        } else {
            element.textContent = Math.floor(start);
        }
    }, 16);
}

// Animate stats when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statNumber = entry.target.querySelector('h3');
            const target = parseInt(statNumber.textContent);
            animateCounter(statNumber, target);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat').forEach(stat => {
    statsObserver.observe(stat);
});

// WhatsApp CTA functionality
document.querySelectorAll('.btn-whatsapp').forEach(btn => {
    btn.addEventListener('click', function(e) {
        // The href is already set in HTML, this is just for additional functionality
        console.log('Opening WhatsApp chat...');
    });
});

// Parallax effect for hero section
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero) {
        const rate = scrolled * -0.5;
        hero.style.transform = `translateY(${rate}px)`;
    }
});

// Loading animation
window.addEventListener('load', () => {
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.5s ease';
    
    setTimeout(() => {
        document.body.style.opacity = '1';
    }, 100);
});

// Add some interactive hover effects for coaching cards
document.querySelectorAll('.coaching-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-5px) scale(1.02)';
        this.style.boxShadow = '0 20px 40px rgba(31, 38, 135, 0.5)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
        this.style.boxShadow = '';
    });
});

// Testimonial carousel functionality (if needed)
let currentTestimonial = 0;
const testimonials = document.querySelectorAll('.testimonial-card');

function showTestimonial(index) {
    testimonials.forEach((testimonial, i) => {
        testimonial.style.display = i === index ? 'block' : 'none';
    });
}

// Auto-rotate testimonials on mobile
if (window.innerWidth <= 768) {
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        showTestimonial(currentTestimonial);
    }, 5000);
}

// Add keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        // Close mobile menu if open
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Add touch support for mobile
let touchStartY = 0;
let touchEndY = 0;

document.addEventListener('touchstart', (e) => {
    touchStartY = e.changedTouches[0].screenY;
});

document.addEventListener('touchend', (e) => {
    touchEndY = e.changedTouches[0].screenY;
    handleSwipe();
});

function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartY - touchEndY;
    
    if (Math.abs(diff) > swipeThreshold) {
        if (diff > 0) {
            // Swipe up - could be used for navigation
            console.log('Swipe up detected');
        } else {
            // Swipe down - could be used for navigation
            console.log('Swipe down detected');
        }
    }
}

// Footer link functions
function showProductInfo(product) {
    const productInfo = {
        'turmeric-powder': {
            title: 'Premium Organic Turmeric Powder',
            description: 'Hand-harvested and sun-dried turmeric with maximum curcumin content. Perfect for cooking, wellness, and traditional remedies.',
            price: '₹299/250g',
            benefits: ['High curcumin content', 'Organic certified', 'Traditional processing', 'Versatile usage']
        },
        'fresh-root': {
            title: 'Fresh Organic Turmeric Root',
            description: 'Fresh, hand-picked turmeric roots with maximum freshness and potency. Ideal for juicing, cooking, and natural remedies.',
            price: '₹199/500g',
            benefits: ['Maximum freshness', 'High potency', 'Natural form', 'Multiple uses']
        },
        'turmeric-tea': {
            title: 'Turmeric Wellness Tea Blend',
            description: 'Premium turmeric tea blend with ginger, honey, and black pepper for enhanced absorption and maximum health benefits.',
            price: '₹399/100 tea bags',
            benefits: ['Enhanced absorption', 'Ginger blend', 'Honey infused', 'Black pepper added']
        },
        'turmeric-supplements': {
            title: 'Turmeric Curcumin Supplements',
            description: 'High-potency turmeric curcumin supplements with black pepper for enhanced bioavailability. 95% curcuminoids.',
            price: '₹599/60 capsules',
            benefits: ['95% curcuminoids', 'Enhanced bioavailability', 'Black pepper included', 'High potency']
        }
    };
    
    showModal(productInfo[product]);
}

function showServiceInfo(service) {
    const serviceInfo = {
        'business-coaching': {
            title: 'Business Coaching',
            description: 'Master proven sales techniques and strategies to boost your revenue and grow your customer base.',
            price: '₹15,000/month',
            features: ['Customer psychology', 'Sales funnel optimization', 'Conversion rate improvement', 'One-on-one sessions']
        },
        'sales-training': {
            title: 'Sales Training',
            description: 'Comprehensive sales training program designed to improve your team\'s performance and increase revenue.',
            price: '₹25,000/program',
            features: ['Team training', 'Sales techniques', 'Role-playing exercises', 'Performance tracking']
        },
        'leadership-development': {
            title: 'Leadership Development',
            description: 'Develop essential leadership skills to build and manage high-performing teams effectively.',
            price: '₹20,000/month',
            features: ['Team building strategies', 'Communication skills', 'Performance management', 'Leadership workshops']
        },
        'consulting': {
            title: 'Business Consulting',
            description: 'Strategic business consulting to help you optimize operations, improve efficiency, and scale your business.',
            price: '₹50,000/project',
            features: ['Strategic planning', 'Process optimization', 'Market analysis', 'Growth strategies']
        }
    };
    
    showModal(serviceInfo[service]);
}

function showSupportInfo(support) {
    const supportInfo = {
        'shipping': {
            title: 'Shipping Information',
            description: 'We offer fast and reliable shipping across India with multiple delivery options.',
            details: ['Free shipping on orders above ₹999', 'Standard delivery: 3-5 business days', 'Express delivery: 1-2 business days', 'Cash on delivery available'],
            price: 'Free shipping on ₹999+'
        },
        'returns': {
            title: 'Returns & Refunds',
            description: 'We want you to be completely satisfied with your purchase. Easy returns and refunds available.',
            details: ['30-day return policy', 'No questions asked returns', 'Full refund within 7 days', 'Free return shipping'],
            price: '30-day return policy'
        },
        'faq': {
            title: 'Frequently Asked Questions',
            description: 'Find answers to common questions about our products and services.',
            details: ['How to use turmeric products?', 'What are the health benefits?', 'How to store turmeric?', 'Is it safe for everyone?'],
            price: '24/7 Support'
        }
    };
    
    showModal(supportInfo[support]);
}

function showModal(info) {
    // Remove existing modal if any
    const existingModal = document.querySelector('.info-modal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Create modal
    const modal = document.createElement('div');
    modal.className = 'info-modal';
    modal.innerHTML = `
        <div class="modal-overlay">
            <div class="modal-content glass-card">
                <div class="modal-header">
                    <h3>${info.title}</h3>
                    <button class="modal-close" onclick="closeModal()">&times;</button>
                </div>
                <div class="modal-body">
                    <p>${info.description}</p>
                    <div class="modal-price">
                        <strong>${info.price}</strong>
                    </div>
                    <div class="modal-features">
                        <h4>Key Features:</h4>
                        <ul>
                            ${info.benefits ? info.benefits.map(benefit => `<li>${benefit}</li>`).join('') : 
                              info.features ? info.features.map(feature => `<li>${feature}</li>`).join('') :
                              info.details ? info.details.map(detail => `<li>${detail}</li>`).join('') : ''}
                        </ul>
                    </div>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" onclick="closeModal()">Close</button>
                </div>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Add animation
    setTimeout(() => {
        modal.style.opacity = '1';
    }, 10);
}

function closeModal() {
    const modal = document.querySelector('.info-modal');
    if (modal) {
        modal.style.opacity = '0';
        setTimeout(() => {
            modal.remove();
        }, 300);
    }
} 