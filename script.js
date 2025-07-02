// ===== MOBILE MENU FUNCTIONALITY - IMPROVED =====
document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing mobile menu...');
    
    const mobileMenuBtn = document.querySelector('.mobile-menu');
    const mobileNavOverlay = document.getElementById('mobileNavOverlay');
    let isMenuOpen = false;
    
    console.log('Mobile menu button:', mobileMenuBtn);
    console.log('Mobile nav overlay:', mobileNavOverlay);
    
    if (mobileMenuBtn && mobileNavOverlay) {
        // Remove any existing onclick attribute to prevent conflicts
        mobileMenuBtn.removeAttribute('onclick');
        
        // Add click event to mobile menu button
        mobileMenuBtn.addEventListener('click', function(e) {
            e.preventDefault();
            e.stopPropagation();
            console.log('Mobile menu clicked!');
            
            isMenuOpen = !isMenuOpen;
            
            if (isMenuOpen) {
                // Show menu with smooth animation
                mobileNavOverlay.style.display = 'block';
                setTimeout(() => {
                    mobileNavOverlay.classList.add('show');
                }, 10);
                mobileMenuBtn.classList.add('active');
                document.body.style.overflow = 'hidden';
                console.log('Menu opened');
            } else {
                // Hide menu with smooth animation
                mobileNavOverlay.classList.remove('show');
                setTimeout(() => {
                    mobileNavOverlay.style.display = 'none';
                }, 300);
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
                console.log('Menu closed');
            }
        });
        
        // Close menu when clicking on navigation links
        const mobileNavLinks = document.querySelectorAll('.mobile-nav-links a');
        console.log('Found', mobileNavLinks.length, 'mobile nav links');
        
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', function() {
                console.log('Nav link clicked, closing menu');
                if (isMenuOpen) {
                    mobileNavOverlay.classList.remove('show');
                    setTimeout(() => {
                        mobileNavOverlay.style.display = 'none';
                    }, 300);
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    isMenuOpen = false;
                }
            });
        });
        
        // Close menu when clicking overlay background
        mobileNavOverlay.addEventListener('click', function(e) {
            if (e.target === mobileNavOverlay) {
                console.log('Overlay clicked, closing menu');
                if (isMenuOpen) {
                    mobileNavOverlay.classList.remove('show');
                    setTimeout(() => {
                        mobileNavOverlay.style.display = 'none';
                    }, 300);
                    mobileMenuBtn.classList.remove('active');
                    document.body.style.overflow = 'auto';
                    isMenuOpen = false;
                }
            }
        });
        
        // Close menu on escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && isMenuOpen) {
                console.log('Escape pressed, closing menu');
                mobileNavOverlay.classList.remove('show');
                setTimeout(() => {
                    mobileNavOverlay.style.display = 'none';
                }, 300);
                mobileMenuBtn.classList.remove('active');
                document.body.style.overflow = 'auto';
                isMenuOpen = false;
            }
        });
        
    } else {
        console.error('Mobile menu elements not found!');
        console.log('Available elements:', {
            mobileMenuBtn: !!mobileMenuBtn,
            mobileNavOverlay: !!mobileNavOverlay
        });
    }
    
    // ===== RESPONSIVE NAVIGATION =====
    // Close menu when resizing to desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768 && isMenuOpen) {
            console.log('Resized to desktop, closing menu');
            mobileNavOverlay.classList.remove('show');
            setTimeout(() => {
                mobileNavOverlay.style.display = 'none';
            }, 300);
            mobileMenuBtn.classList.remove('active');
            document.body.style.overflow = 'auto';
            isMenuOpen = false;
        }
    });
});

// ===== SMOOTH SCROLLING =====
document.addEventListener('DOMContentLoaded', function() {
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
});

// ===== FORM VALIDATION =====
function validateForm(formId) {
    const form = document.getElementById(formId);
    if (!form) return false;
    
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            field.style.borderColor = '#dc3545';
            isValid = false;
        } else {
            field.style.borderColor = '#28a745';
        }
    });
    
    return isValid;
}

// ===== LOADING STATES =====
function showLoading(buttonId) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.innerHTML = '<span class="loading"></span> Memproses...';
        button.disabled = true;
    }
}

function hideLoading(buttonId, originalText) {
    const button = document.getElementById(buttonId);
    if (button) {
        button.innerHTML = originalText;
        button.disabled = false;
    }
}

// ===== ALERT FUNCTIONS =====
function showAlert(message, type = 'info') {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type}`;
    alertDiv.innerHTML = message;
    
    // Insert at the top of the page
    const container = document.querySelector('.container');
    if (container) {
        container.insertBefore(alertDiv, container.firstChild);
        
        // Auto remove after 5 seconds
        setTimeout(() => {
            if (alertDiv && alertDiv.parentNode) {
                alertDiv.remove();
            }
        }, 5000);
    }
}

// ===== FORM HANDLERS =====
document.addEventListener('DOMContentLoaded', function() {
    // Registration Form
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('registerForm')) {
                showLoading('submitBtn');
                
                setTimeout(() => {
                    hideLoading('submitBtn', 'Daftar Sekarang');
                    showAlert('Pendaftaran berhasil! Kami akan menghubungi Anda segera.', 'success');
                    this.reset();
                }, 2000);
            } else {
                showAlert('Mohon lengkapi semua field yang wajib diisi.', 'error');
            }
        });
    }
    
    // Contact Form
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            if (validateForm('contactForm')) {
                showLoading('sendBtn');
                
                setTimeout(() => {
                    hideLoading('sendBtn', 'Kirim Pesan');
                    showAlert('Pesan Anda telah terkirim! Kami akan merespons dalam 24 jam.', 'success');
                    this.reset();
                }, 2000);
            } else {
                showAlert('Mohon lengkapi semua field yang wajib diisi.', 'error');
            }
        });
    }
    
    // Login Form
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('username')?.value;
            const password = document.getElementById('password')?.value;
            
            if (username && password) {
                showLoading('loginBtn');
                
                setTimeout(() => {
                    hideLoading('loginBtn', 'Masuk');
                    if (username === 'admin' && password === 'admin123') {
                        showAlert('Login berhasil! Selamat datang Administrator.', 'success');
                        setTimeout(() => {
                            showAlert('Fitur admin dashboard akan segera tersedia.', 'info');
                        }, 2000);
                    } else {
                        showAlert('Username atau password salah.', 'error');
                    }
                }, 1500);
            } else {
                showAlert('Mohon masukkan username dan password.', 'error');
            }
        });
    }
});

// ===== SCHEDULE FILTER =====
document.addEventListener('DOMContentLoaded', function() {
    const filterSpecialty = document.getElementById('filterSpecialty');
    const filterDay = document.getElementById('filterDay');
    
    if (filterSpecialty || filterDay) {
        function filterSchedule() {
            const specialty = filterSpecialty?.value || '';
            const day = filterDay?.value || '';
            const rows = document.querySelectorAll('tbody tr');
            
            rows.forEach(row => {
                const specialtyCell = row.cells[1]?.textContent || '';
                const dayCell = row.cells[2]?.textContent || '';
                
                const matchSpecialty = !specialty || specialtyCell.includes(specialty);
                const matchDay = !day || dayCell.includes(day);
                
                if (matchSpecialty && matchDay) {
                    row.style.display = '';
                } else {
                    row.style.display = 'none';
                }
            });
        }
        
        filterSpecialty?.addEventListener('change', filterSchedule);
        filterDay?.addEventListener('change', filterSchedule);
    }
});

// ===== SERVICE MODAL =====
function openServiceModal(serviceTitle, serviceDescription) {
    const modal = document.getElementById('serviceModal');
    const modalTitle = document.getElementById('modalTitle');
    const modalDescription = document.getElementById('modalDescription');
    
    if (modal && modalTitle && modalDescription) {
        modalTitle.textContent = serviceTitle;
        modalDescription.textContent = serviceDescription;
        modal.style.display = 'block';
    }
}

function closeServiceModal() {
    const modal = document.getElementById('serviceModal');
    if (modal) {
        modal.style.display = 'none';
    }
}

// Close modal when clicking outside
window.addEventListener('click', function(e) {
    const modal = document.getElementById('serviceModal');
    if (e.target === modal) {
        closeServiceModal();
    }
});

// ===== SCROLL ANIMATIONS =====
function animateOnScroll() {
    const elements = document.querySelectorAll('.service-card, .feature, .doctor-card');
    
    elements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;
        
        if (elementTop < window.innerHeight - elementVisible) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Initialize scroll animations
document.addEventListener('DOMContentLoaded', function() {
    const elements = document.querySelectorAll('.service-card, .feature, .doctor-card');
    elements.forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    window.addEventListener('scroll', animateOnScroll);
    animateOnScroll(); // Run once on load
});