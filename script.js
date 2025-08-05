// SupportStack Landing Page JavaScript
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth scrolling for anchor links (if any are added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // Email link handlers (now using mailto links)
    const emailLinks = document.querySelectorAll('a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const linkText = this.textContent.trim();
            
            // Show confirmation notification
            if (linkText === 'Try the Demo') {
                showNotification('Opening email to request a demo...', 'info');
            } else if (linkText === 'Contact the Team') {
                showNotification('Opening email to contact the team...', 'info');
            }
        });
    });

    // Video placeholder click handlers
    const videoPlaceholders = document.querySelectorAll('.video-placeholder');
    videoPlaceholders.forEach(placeholder => {
        placeholder.addEventListener('click', function() {
            const videoTitle = this.querySelector('p').textContent;
            handleVideoPlay(videoTitle);
        });
    });

    // Simple fade-in animation (removed complex intersection observer that was causing issues)
    const animateElements = document.querySelectorAll('.tool-section, .stat-item, .step, .benefit-item');
    animateElements.forEach((el, index) => {
        // Simple staggered fade-in without hiding elements initially
        el.style.opacity = '1';
        el.style.transform = 'translateY(0)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        
        // Optional: Add a subtle entrance animation with delay
        setTimeout(() => {
            el.classList.add('animate-in');
        }, index * 100);
    });

    // Add scroll progress indicator
    createScrollProgress();

    // Video demo handler for individual tool videos
    function handleVideoPlay(videoTitle) {
        // Simulate video play for individual tool demos
        showNotification(`Loading ${videoTitle}...`, 'info');
        
        setTimeout(() => {
            console.log(`Would play: ${videoTitle}`);
            // In real implementation, replace placeholder with actual video embed
        }, 1000);
    }

    // Notification system
    function showNotification(message, type = 'info') {
        // Remove existing notifications
        const existingNotifications = document.querySelectorAll('.notification');
        existingNotifications.forEach(notif => notif.remove());

        // Create notification element
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.innerHTML = `
            <div class="notification-content">
                <span class="notification-message">${message}</span>
                <button class="notification-close">&times;</button>
            </div>
        `;

        // Add styles
        notification.style.cssText = `
            position: fixed;
            top: 20px;
            right: 20px;
            background: ${type === 'success' ? '#48bb78' : type === 'error' ? '#f56565' : '#667eea'};
            color: white;
            padding: 16px 20px;
            border-radius: 8px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1000;
            transform: translateX(400px);
            transition: transform 0.3s ease;
            max-width: 300px;
        `;

        // Add to page
        document.body.appendChild(notification);

        // Animate in
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);

        // Handle close button
        const closeBtn = notification.querySelector('.notification-close');
        closeBtn.addEventListener('click', () => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        });

        // Auto remove after 3 seconds
        setTimeout(() => {
            if (notification.parentNode) {
                notification.style.transform = 'translateX(400px)';
                setTimeout(() => notification.remove(), 300);
            }
        }, 3000);
    }

    // Scroll progress indicator
    function createScrollProgress() {
        const progressBar = document.createElement('div');
        progressBar.className = 'scroll-progress';
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #667eea, #764ba2);
            z-index: 1000;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);

        window.addEventListener('scroll', () => {
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            progressBar.style.width = scrollPercent + '%';
        });
    }

    // Add loading states to buttons
    function addLoadingState(button) {
        const originalText = button.textContent;
        button.textContent = 'Loading...';
        button.disabled = true;
        button.style.opacity = '0.7';

        setTimeout(() => {
            button.textContent = originalText;
            button.disabled = false;
            button.style.opacity = '1';
        }, 2000);
    }

    // Enhanced button interactions
    buttons.forEach(button => {
        button.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-2px)';
        });

        button.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // Keyboard navigation support
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Tab') {
            document.body.classList.add('keyboard-navigation');
        }
    });

    document.addEventListener('mousedown', function() {
        document.body.classList.remove('keyboard-navigation');
    });

    // Add keyboard navigation styles
    const keyboardStyles = document.createElement('style');
    keyboardStyles.textContent = `
        .keyboard-navigation *:focus {
            outline: 2px solid #667eea;
            outline-offset: 2px;
        }
        
        .keyboard-navigation .btn:focus {
            outline: 3px solid #667eea;
            outline-offset: 3px;
        }
    `;
    document.head.appendChild(keyboardStyles);

    // Performance optimization: Debounce scroll events
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }

    // Optimize scroll performance
    const optimizedScrollHandler = debounce(() => {
        // Any scroll-based animations or updates can go here
        requestAnimationFrame(() => {
            // Update scroll progress
            const scrollTop = window.pageYOffset;
            const docHeight = document.body.scrollHeight - window.innerHeight;
            const scrollPercent = (scrollTop / docHeight) * 100;
            const progressBar = document.querySelector('.scroll-progress');
            if (progressBar) {
                progressBar.style.width = scrollPercent + '%';
            }
        });
    }, 10);

    window.addEventListener('scroll', optimizedScrollHandler);

    console.log('SupportStack landing page loaded successfully!');
});