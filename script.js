document.addEventListener('DOMContentLoaded', function() {
    // ===== СОЗДАНИЕ ЗВЁЗДНОГО ФОНА =====
    function createStars() {
        const starfield = document.createElement('div');
        starfield.className = 'starfield';
        document.body.prepend(starfield);

        const starCount = 150;
        for (let i = 0; i < starCount; i++) {
            const star = document.createElement('div');
            star.className = 'star';
            const size = Math.random() * 4 + 1;
            star.style.width = size + 'px';
            star.style.height = size + 'px';
            star.style.left = Math.random() * 100 + '%';
            star.style.top = Math.random() * 100 + '%';
            star.style.setProperty('--duration', (Math.random() * 3 + 2) + 's');
            star.style.animationDelay = (Math.random() * 5) + 's';
            star.style.opacity = Math.random() * 0.6 + 0.2;
            starfield.appendChild(star);
        }
    }
    createStars();

    // ===== ДАННЫЕ ДЛЯ ЗАПОЛНЕНИЯ =====
    const data = {
        diplomas: [
            '🥇 Диплом I степени за победу в областном конкурсе IT-проектов',
            '🥈 Диплом II степени за разработку мобильного приложения "Эко-гид"',
            '🥉 Диплом III степени в хакатоне "Цифровой прорыв"',
            '🏅 Диплом за лучший командный проект на конференции "IT-start"'
        ],
        certificates: [
            '📜 Сертификат об участии в международной олимпиаде по программированию',
            '📜 Сертификат участника конференции "Информационные технологии в образовании"',
            '📜 Сертификат о прохождении курса "Введение в искусственный интеллект"'
        ],
        courseworks: [
            '📘 Курсовая работа: "Разработка базы данных для интернет-магазина"',
            '📘 Курсовая работа: "Создание веб-приложения на React"',
            '📘 Курсовая работа: "Разработка мобильного приложения на Kotlin"'
        ],
        practiceReports: [
            '📄 Отчёт по учебной практике: "Изучение основ Python"',
            '📄 Отчёт по производственной практике: "Разработка модуля учета товаров"',
            '📄 Отчёт по производственной практике: "Внедрение СУБД PostgreSQL"'
        ],
        research: [
            '🔬 Исследовательская работа: "Сравнение эффективности языков программирования"',
            '🔬 Проект: "Разработка системы рекомендаций для пользователей"',
            '🔬 Исследование: "Применение машинного обучения в образовании"'
        ],
        certificatesDocs: [
            '📜 Свидетельство об окончании курса "Инструменты искусственного интеллекта" (54 ак. часа) — ООО "Цифровое образование", 2025 г.'
        ],
        gratitude: [
            '📜 Благодарственное письмо от Министерства образования Свердловской области за активное участие в проекте "Амбассадоры Профессионалитета" (15.12.2023)'
        ],
        events: [
            '🎯 Участие в городском субботнике',
            '🎯 Организация студенческого IT-клуба',
            '🎯 Участие в благотворительной акции "Помоги детям"',
            '🎯 Выступление на научно-практической конференции'
        ],
        characteristics: [
            '📋 Характеристика с места производственной практики',
            '📋 Характеристика от руководителя проекта "Амбассадоры Профессионалитета"'
        ]
    };

    // ===== ФУНКЦИЯ ЗАПОЛНЕНИЯ СПИСКОВ =====
    function fillList(elementId, items) {
        const list = document.getElementById(elementId);
        if (!list) return;
        list.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            li.textContent = item;
            list.appendChild(li);
        });
    }

    fillList('diplomas-list', data.diplomas);
    fillList('certificates-list', data.certificates);
    fillList('courseworks-list', data.courseworks);
    fillList('practice-reports-list', data.practiceReports);
    fillList('research-list', data.research);
    fillList('certificates-docs-list', data.certificatesDocs);
    fillList('gratitude-list', data.gratitude);
    fillList('events-list', data.events);
    fillList('characteristics-list', data.characteristics);

    // ===== КАРТИНКИ-ЗАГЛУШКИ ДЛЯ ДОСТИЖЕНИЙ =====
    const diplomaImages = [
        { src: 'diplom1.jpg', caption: 'Диплом I степени — областный конкурс IT-проектов', link: '#' },
        { src: 'diplom2.jpg', caption: 'Диплом II степени — мобильное приложение "Эко-гид"', link: '#' },
        { src: 'diplom3.jpg', caption: 'Диплом III степени — хакатон "Цифровой прорыв"', link: '#' }
    ];

    const certificateImages = [
        { src: 'cert1.jpg', caption: 'Сертификат — международная олимпиада по программированию', link: '#' },
        { src: 'cert2.jpg', caption: 'Сертификат — конференция "Информационные технологии"', link: '#' }
    ];

    function renderDocImages(containerId, items) {
        const container = document.getElementById(containerId);
        if (!container) return;
        container.innerHTML = '';
        items.forEach(item => {
            const div = document.createElement('div');
            div.className = 'doc-image';
            div.innerHTML = `
                <a href="${item.link}" target="_blank">
                    <img src="${item.src}" alt="${item.caption}">
                </a>
                <p class="doc-caption">${item.caption}</p>
            `;
            container.appendChild(div);
        });
    }

    renderDocImages('diplomas-images', diplomaImages);
    renderDocImages('certificates-images', certificateImages);

    // ===== АКТИВНАЯ НАВИГАЦИЯ ПРИ СКРОЛЛЕ =====
    const sections = document.querySelectorAll('.section');
    const navLinks = document.querySelectorAll('.nav-menu a');

    function updateActiveLink() {
        let currentSection = '';
        const scrollPos = window.scrollY + 100;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                currentSection = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === '#' + currentSection) {
                link.classList.add('active');
            }
        });
    }

    window.addEventListener('scroll', updateActiveLink);
    updateActiveLink();

    // ===== БУРГЕР-МЕНЮ =====
    const navToggle = document.getElementById('nav-toggle');
    const navMenu = document.querySelector('.nav-menu');

    if (navToggle) {
        navToggle.addEventListener('click', function() {
            this.classList.toggle('active');
            navMenu.classList.toggle('active');
        });

        navMenu.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', function() {
                navToggle.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }

    // ===== КНОПКА "НАВЕРХ" =====
    const scrollBtn = document.getElementById('scroll-top');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            scrollBtn.classList.add('visible');
        } else {
            scrollBtn.classList.remove('visible');
        }
    });

    scrollBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ===== ПЛАВНЫЙ СКРОЛЛ ДЛЯ ЯКОРНЫХ ССЫЛОК =====
    document.querySelectorAll('.nav-menu a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                const navHeight = document.querySelector('.navigation').offsetHeight;
                const targetPosition = targetElement.offsetTop - navHeight - 10;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });
});