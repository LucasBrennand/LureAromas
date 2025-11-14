 document.addEventListener('DOMContentLoaded', function() {
        // Hamburger menu toggle logic (existing from previous steps)
        const hamburgerToggle = document.querySelector('.hamburger-toggle');
        const navList = document.querySelector('.nav-list');

        if (hamburgerToggle && navList) {
            hamburgerToggle.addEventListener('click', function() {
                hamburgerToggle.classList.toggle('active');
                navList.classList.toggle('active');
            });

            navList.querySelectorAll('a').forEach(link => {
                link.addEventListener('click', () => {
                    if (window.innerWidth <= 600 || navList.classList.contains('active')) {
                        hamburgerToggle.classList.remove('active');
                        navList.classList.remove('active');
                    }
                });
            });
        }

        // Header scroll shadow logic (existing from previous steps)
        const mainNav = document.querySelector('.main-nav');
        const scrollThreshold = 50;

        if (mainNav) {
            window.addEventListener('scroll', () => {
                if (window.scrollY > scrollThreshold) {
                    mainNav.classList.add('scrolled');
                } else {
                    mainNav.classList.remove('scrolled');
                }
            });

            if (window.scrollY > scrollThreshold) {
                mainNav.classList.add('scrolled');
            }
        }

        // Dynamic WhatsApp links logic (existing from previous steps)
        function updateWhatsAppLinks() {
            const currentHourBrasilia = new Date().toLocaleString('en-US', {
                timeZone: 'America/Sao_Paulo',
                hour: '2-digit',
                hourCycle: 'h23'
            });
            const hour = parseInt(currentHourBrasilia);

            const numbers = {
                tamarineira: {
                    shift1: '558196620788', //Georgia
                    shift2: '5581983060227' //Amanda FC
                },
                plaza: {
                    shift1: '558194190965', //Renata
                    shift2: '558198765702' // Adriana
                },
                riomar: {
                    shift1: '558183229594', //Amanda Riomar
                    // shift2: '558184299355' // Marilia
                    // shift2: '558194190965' // Renata
                    shift2: '558187127458' //Marcela
                }
            };

            const whatsappLinks = document.querySelectorAll('#Contato .contato-info-card ul li a');

            if (whatsappLinks.length >= 4) {
                const tamarineiraLink = whatsappLinks[1];
                let tamarineiraNumber = (hour >= 6 && hour < 15) ? numbers.tamarineira.shift1 : numbers.tamarineira.shift2;
                const tamarineiraMessage = 'Ol%C3%A1%21%20Eu%20gostaria%20de%20falar%20com%20uma%20atendente%20da%20L%27ure%20Aromas%20na%20unidade%20de%20Tamarineira%20(Ferreira%20Costa).';
                tamarineiraLink.href = `https://wa.me/${tamarineiraNumber}?text=${tamarineiraMessage}`;

                const plazaLink = whatsappLinks[2];
                let plazaNumber = (hour >= 6 && hour < 15) ? numbers.plaza.shift1 : numbers.plaza.shift2;
                const plazaMessage = 'Ol%C3%A1%21%20Eu%20gostaria%20de%20falar%20com%20uma%20atendente%20da%20L%27ure%20Aromas%20na%20unidade%20do%20Plaza%20Shopping.';
                plazaLink.href = `https://wa.me/${plazaNumber}?text=${plazaMessage}`;

                const riomarLink = whatsappLinks[3];
                let riomarNumber = (hour >= 6 && hour < 15) ? numbers.riomar.shift1 : numbers.riomar.shift2;
                const riomarMessage = 'Ol%C3%A1%21%20Eu%20gostaria%20de%20falar%20com%20uma%20atendente%20da%20L%27ure%20Aromas%20na%20unidade%20do%20Riomar%20Shopping.';
                riomarLink.href = `https://wa.me/${riomarNumber}?text=${riomarMessage}`;
            }
        }

        updateWhatsAppLinks();
        setInterval(updateWhatsAppLinks, 60 * 1000);

        const sections = document.querySelectorAll('section');

        const observerOptions = {
            root: null, // viewport
            rootMargin: '0px',
            threshold: 0.1 // 10% of section visible to trigger
        };

        const sectionObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in-visible');
                    observer.unobserve(entry.target); // Stop observing once it's visible
                }
            });
        }, observerOptions);

        sections.forEach(section => {
            sectionObserver.observe(section);
        });
    });
