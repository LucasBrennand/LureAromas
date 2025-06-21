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

    // --- UPDATED JAVASCRIPT FOR DYNAMIC WHATSAPP LINKS ---
    function updateWhatsAppLinks() {
        // Get current hour in Brasília timezone (GMT-3)
        const currentHourBrasilia = new Date().toLocaleString('en-US', {
            timeZone: 'America/Sao_Paulo',
            hour: '2-digit',
            hourCycle: 'h23'
        });
        const hour = parseInt(currentHourBrasilia);

        // Define phone numbers for each shift by location
        const numbers = {
            tamarineira: {
                shift1: '558196620788', // Funcionária 1: 6h as 14h
                shift2: '5581983060227' // Funcionária 2: 14h as 6h (do outro dia)
            },
            plaza: {
                shift1: '558194190965', // Funcionária 1: 6h as 14h
                shift2: '558198765702'  // Funcionária 2: 14h as 6h (do outro dia)
            },
            riomar: {
                shift1: '558183229594', // Funcionária 1: 6h as 14h
                shift2: '558184299355'  // Funcionária 2: 14h as 6h (do outro dia)
            }
        };

        // Select the list items for Tamarineira, Plaza, and Riomar.
        // Assumes Boa Viagem is index 0, Tamarineira is 1, Plaza is 2, Riomar is 3.
        const whatsappLinks = document.querySelectorAll('#Contato .contato-info-card:nth-child(2) ul li a');

        if (whatsappLinks.length >= 4) { // Ensure all relevant links exist

            // Tamarineira (index 1)
            const tamarineiraLink = whatsappLinks[1];
            let tamarineiraNumber = (hour >= 6 && hour < 14) ? numbers.tamarineira.shift1 : numbers.tamarineira.shift2;
            const tamarineiraMessage = 'Ol%C3%A1%21%20Eu%20gostaria%20de%20falar%20com%20uma%20atendente%20da%20L%27ure%20Aromas%20na%20unidade%20de%20Tamarineira%20(Ferreira%20Costa).';
            tamarineiraLink.href = `https://wa.me/${tamarineiraNumber}?text=${tamarineiraMessage}`;

            // Plaza Shopping (index 2)
            const plazaLink = whatsappLinks[2];
            let plazaNumber = (hour >= 6 && hour < 14) ? numbers.plaza.shift1 : numbers.plaza.shift2;
            const plazaMessage = 'Ol%C3%A1%21%20Eu%20gostaria%20de%20falar%20com%20uma%20atendente%20da%20L%27ure%20Aromas%20na%20unidade%20do%20Plaza%20Shopping.';
            plazaLink.href = `https://wa.me/${plazaNumber}?text=${plazaMessage}`;

            // Riomar Shopping (index 3)
            const riomarLink = whatsappLinks[3];
            let riomarNumber = (hour >= 6 && hour < 14) ? numbers.riomar.shift1 : numbers.riomar.shift2;
            const riomarMessage = 'Ol%C3%A1%21%20Eu%20gostaria%20de%20falar%20com%20uma%20atendente%20da%20L%27ure%20Aromas%20na%20unidade%20do%20Riomar%20Shopping.';
            riomarLink.href = `https://wa.me/${riomarNumber}?text=${riomarMessage}`;
        }
    }

    // Run the function once on page load
    updateWhatsAppLinks();

    // Run the function every minute to update for shift changes
    setInterval(updateWhatsAppLinks, 60 * 1000); // 60 * 1000 milliseconds = 1 minute
});