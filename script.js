// Обработка формы
document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Получаем кнопку отправки
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.textContent;
            
            // Показываем состояние загрузки
            submitBtn.textContent = 'Отправка...';
            submitBtn.disabled = true;
            
            // Сбор данных формы
            const formData = {
                name: document.getElementById('name').value,
                email: document.getElementById('email').value,
                phone: document.getElementById('phone').value,
                interest: document.getElementById('interest').value,
                message: document.getElementById('message').value
            };
            
            // Симуляция отправки (задержка 1.5 секунды)
            setTimeout(() => {
                // Показ сообщения об успехе
                alert('Спасибо! Ваша заявка отправлена. Мы свяжемся с вами в ближайшее время.');
                
                // Очистка формы
                contactForm.reset();
                
                // Восстановление кнопки
                submitBtn.textContent = originalText;
                submitBtn.disabled = false;
            }, 1500);
        });
    }
    
    // Мобильное меню
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
        
        // Закрываем меню при клике на ссылку
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
        anchor.addEventListener('click', function (e) {
            const href = this.getAttribute('href');
            
            // Пропускаем ссылки с id=""
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
    
    // Добавляем класс активного пункта меню при прокрутке
    let scrollTimeout;
    window.addEventListener('scroll', function() {
        // Дебаунс для оптимизации
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
            
            // Для главной страницы
            if (current === '' && linkHref === 'index.html') {
                link.classList.add('active');
            }
            // Для якорных ссылок
            else if (current && linkHref.includes(`#${current}`)) {
                link.classList.add('active');
            }
            // Для секции помощи
            else if (current === 'help' && linkHref.includes('#help')) {
                link.classList.add('active');
            }
        });
    }
    
    // Инициализация при загрузке
    updateActiveNav();
    
    // Закрытие меню при изменении размера окна (если перешли с мобильного на десктоп)
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            if (burgerMenu) burgerMenu.classList.remove('active');
            if (mainNav) mainNav.classList.remove('active');
            if (navOverlay) navOverlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
});
