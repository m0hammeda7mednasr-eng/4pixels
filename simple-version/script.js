// Theme Toggle
function toggleTheme() {
    const body = document.body;
    const themeBtn = document.getElementById('themeBtn');
    
    if (body.classList.contains('light')) {
        body.classList.remove('light');
        body.classList.add('dark');
        themeBtn.textContent = '☀️';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark');
        body.classList.add('light');
        themeBtn.textContent = '🌙';
        localStorage.setItem('theme', 'light');
    }
}

// Language Toggle
let currentLang = 'ar';

function toggleLanguage() {
    const langBtn = document.getElementById('langBtn');
    const html = document.documentElement;
    
    if (currentLang === 'ar') {
        currentLang = 'en';
        html.setAttribute('lang', 'en');
        html.setAttribute('dir', 'ltr');
        langBtn.textContent = 'AR';
        updateTexts('en');
    } else {
        currentLang = 'ar';
        html.setAttribute('lang', 'ar');
        html.setAttribute('dir', 'rtl');
        langBtn.textContent = 'EN';
        updateTexts('ar');
    }
    
    localStorage.setItem('language', currentLang);
}

function updateTexts(lang) {
    const elements = document.querySelectorAll('[data-en][data-ar]');
    elements.forEach(el => {
        el.textContent = el.getAttribute('data-' + lang);
    });
}

// Menu Toggle
function toggleMenu() {
    const nav = document.getElementById('nav');
    nav.classList.toggle('open');
}

// Close menu when clicking on a link
document.querySelectorAll('.nav a').forEach(link => {
    link.addEventListener('click', () => {
        document.getElementById('nav').classList.remove('open');
    });
});

// Form Submit
function handleSubmit(event) {
    event.preventDefault();
    alert('شكراً لتواصلك معنا! سنرد عليك قريباً.');
    event.target.reset();
}

// Smooth Scroll
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

// Load saved preferences
window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedLang = localStorage.getItem('language') || 'ar';
    
    document.body.className = savedTheme;
    document.getElementById('themeBtn').textContent = savedTheme === 'light' ? '🌙' : '☀️';
    
    if (savedLang === 'en') {
        toggleLanguage();
    }
});

// Scroll Animation
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.service-card, .project-card, .mv-card').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'all 0.6s ease';
    observer.observe(el);
});
