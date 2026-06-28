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
        // ⭐ КУРСОВЫЕ — БЕЗ ССЫЛОК (просто текст)
        courseworks: [
            'Курсовая работа: Еще в разработке!'
        ],
        // ⭐ ОТЧЁТЫ — ССЫЛКИ НА .DOCX
        practiceReports: [
            { text: 'Отчёт по учебной практике', link: 'Отчет_уп_забелина.docx' },
            { text: 'Дневник-отчет по учебной практике', link: 'pr_32_zabelina_dnevnik-otchet.docx' }
        ],
        // ⭐ ПРОЕКТЫ — ССЫЛКИ НА GITHUB (СЮДА ПЕРЕНЁС!)
        research: [
            { text: 'Работа с XamarinForms', link: 'https://github.com/annazabelina76712zb/zd5_1zabelinaa' },
            { text: 'Разработка приложения для Smart TV', link: 'https://github.com/annazabelina76712zb/zd3_2zabelinaAnna' }
            
        ],
        certificatesDocs: [
            'Свидетельство об окончании курса "Инструменты искусственного интеллекта" (54 ак. часа) — ООО "Цифровое образование", 2025 г.'
        ],
        gratitude: [
            'Благодарственное письмо от Министерства образования Свердловской области за активное участие в проекте "Амбассадоры Профессионалитета" (15.12.2023)'
        ],
        events: [
            'Скоро будут добавлены мероприятия!'
        ],
        characteristics: [
            'Характеристика с места производственной практики'
            
        ]
    };

    // ===== ФУНКЦИЯ ДЛЯ ОБЫЧНЫХ СПИСКОВ (БЕЗ ССЫЛОК) =====
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

    // ===== ФУНКЦИЯ ДЛЯ СПИСКОВ СО ССЫЛКАМИ =====
    function fillListWithLinks(elementId, items) {
        const list = document.getElementById(elementId);
        if (!list) return;
        list.innerHTML = '';
        items.forEach(item => {
            const li = document.createElement('li');
            if (item.link && item.link !== '#') {
                const a = document.createElement('a');
                a.href = item.link;
                a.target = '_blank';
                a.textContent = item.text;
                a.style.color = '#6c5ce7';
                a.style.textDecoration = 'none';
                a.style.transition = 'color 0.3s ease';
                a.onmouseover = function() { this.style.color = '#f9ca24'; };
                a.onmouseout = function() { this.style.color = '#6c5ce7'; };
                li.appendChild(a);
            } else {
                li.textContent = item.text || item;
                li.style.color = '#999';
                li.style.fontStyle = 'italic';
            }
            list.appendChild(li);
        });
    }

    // ===== ЗАПОЛНЯЕМ =====
    // Курсовые — без ссылок
    fillList('courseworks-list', data.courseworks);
    
    // Отчёты — ссылки на .docx
    fillListWithLinks('practice-reports-list', data.practiceReports);
    
    // Проекты — ссылки на GitHub (СЮДА ПЕРЕНЕСЛИ!)
    fillListWithLinks('research-list', data.research);

    // Обычные списки
    fillList('certificates-docs-list', data.certificatesDocs);
    fillList('gratitude-list', data.gratitude);
    fillList('events-list', data.events);
    fillList('characteristics-list', data.characteristics);

    // ===== КАРТИНКИ-ЗАГЛУШКИ ДЛЯ ДОСТИЖЕНИЙ =====
    const diplomaImages = [
        { src: 'diplom1.jpg', caption: 'Диплом I ', link: '#' },
        { src: 'diplom2.jpg', caption: 'Диплом II ', link: '#' },
        { src: 'diplom3.jpg', caption: 'Диплом III ', link: '#' }
    ];

    const certificateImages = [
        { src: 'cert1.jpg', caption: 'Сертификат ', link: '#' },
        { src: 'cert2.jpg', caption: 'Сертификат ', link: '#' }
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