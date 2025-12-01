// Обработка Google Forms
function handleFormSubmit(form) {
    const submitBtn = document.getElementById('submitBtn');
    const loading = document.getElementById('loading');
    const successMessage = document.getElementById('success-message');
    
    // Показываем индикатор загрузки
    submitBtn.style.display = 'none';
    loading.style.display = 'block';
    
    // Скрываем предыдущее сообщение об успехе
    successMessage.style.display = 'none';
    
    // Обработка успешной отправки
    document.getElementById('hidden_iframe').onload = function() {
        setTimeout(() => {
            // Скрываем индикатор загрузки
            loading.style.display = 'none';
            
            // Показываем сообщение об успехе
            successMessage.style.display = 'block';
            
            // Прокручиваем к сообщению
            successMessage.scrollIntoView({ 
                behavior: 'smooth', 
                block: 'center' 
            });
            
            // Скрываем сообщение через 8 секунд
            setTimeout(() => {
                successMessage.style.display = 'none';
                submitBtn.style.display = 'block';
            }, 8000);
            
            // Очищаем форму (опционально)
            form.reset();
        }, 1500);
    };
    
    return true;
}

// Основной код JavaScript
document.addEventListener('DOMContentLoaded', function() {
    // Анимация спиннера
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    // Валидация формы перед отправкой
    const contactForm = document.querySelector('.contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            // Проверка email
            const email = document.getElementById('email');
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            
            if (!emailRegex.test(email.value)) {
                e.preventDefault();
                alert('Пожалуйста, введите корректный email адрес.');
                email.focus();
                email.style.borderColor = '#ff6b6b';
                return false;
            }
            
            // Проверка выбора опции
            const select = document.getElementById('interest');
            if (!select.value) {
                e.preventDefault();
                alert('Пожалуйста, выберите вариант "Я хочу..."');
                select.focus();
                select.style.borderColor = '#ff6b6b';
                return false;
            }
            
            return true;
        });
        
        // Убираем красную обводку при вводе
        const inputs = contactForm.querySelectorAll('input, select, textarea');
        inputs.forEach(input => {
            input.addEventListener('input', function() {
                this.style.borderColor = '';
            });
        });
    }
    
    // Мобильное меню (остается без изменений)
    const burgerMenu = document.getElementById('burgerMenu');
    const mainNav = document.getElementById('mainNav');
    const navOverlay = document.getElementById('navOverlay');
    
    if (burgerMenu && mainNav && navOverlay) {
        burgerMenu.addEventListener('click', function() {
            this.classList.toggle('active');
            mainNav.classList.toggle('active');
            navOverlay.classList.toggle('active');
            document.body.style.overflow = mainNav.classList.contains('active') ? 'hidden' : '';
        });
        
        navOverlay.addEventListener('click', function() {
            burgerMenu.classList.remove('active');
            mainNav.classList.remove('active');
            this.classList.remove('active');
            document.body.style.overflow = '';
        });
        
        const navLinks = document.querySelectorAll('.nav-link');
        navLinks.forEach(link => {
            link.addEventListener('click', function() {
                burgerMenu.classList.remove('active');
                mainNav.classList.remove('active');
                navOverlay.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }
    
    // Уменьшение шапки при скролле
    window.addEventListener('scroll', function() {
        const header = document.querySelector('.header');
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });
    
    // Плавная прокрутка для якорных ссылок
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            if (href === '#') return;
            
            e.preventDefault();
            const target = document.querySelector(href);
            if (target) {
                const headerHeight = document.querySelector('.header').offsetHeight;
                const targetPosition = target.offsetTop - headerHeight - 20;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
                
                // Закрываем меню на мобильных
                if (window.innerWidth <= 992) {
                    if (burgerMenu) burgerMenu.classList.remove('active');
                    if (mainNav) mainNav.classList.remove('active');
                    if (navOverlay) navOverlay.classList.remove('active');
                    document.body.style.overflow = '';
                }
            }
        });
    });
    
    // Обновление активного пункта меню при прокрутке
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        clearTimeout(scrollTimeout);
        scrollTimeout = setTimeout(updateActiveNav, 100);
    });
    
    function updateActiveNav() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.nav-link');
        const scrollPosition = window.scrollY + 100;
        
        let current = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            const linkHref = link.getAttribute('href');
            
            if (current === '' && linkHref === 'index.html') {
                link.classList.add('active');
            } else if (current && linkHref.includes(`#${current}`)) {
                link.classList.add('active');
            } else if (current === 'help' && linkHref.includes('#help')) {
                link.classList.add('active');
            }
        });
    }
    
    updateActiveNav();
});
