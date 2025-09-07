document.addEventListener('DOMContentLoaded', () => {

    // --- Lógica para el menú móvil (hamburguesa) ---
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');

    if (mobileMenuButton && mobileMenu) {
        mobileMenuButton.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // --- Lógica para el filtro del menú ---
    const filterButtons = document.querySelectorAll('.filter-btn');
    const menuItems = document.querySelectorAll('.menu-item');

    if (filterButtons.length && menuItems.length) {
        filterButtons.forEach(button => {
            button.addEventListener('click', () => {
                const filter = button.dataset.filter;

                // Manejo del botón activo
                filterButtons.forEach(btn => {
                    btn.classList.remove('bg-paty-accent', 'text-white');
                    btn.classList.add('bg-gray-300', 'text-paty-text', 'hover:bg-paty-accent', 'hover:text-white');
                });
                button.classList.add('bg-paty-accent', 'text-white');
                button.classList.remove('bg-gray-300', 'text-paty-text');

                // Filtrar los items del menú
                menuItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.classList.remove('hidden');
                    } else {
                        item.classList.add('hidden');
                    }
                });
            });
        });
    }

    // --- Lógica para el desplazamiento suave (Smooth Scroll) ---
    const anchorLinks = document.querySelectorAll('a[href^="#"]');

    anchorLinks.forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Cierra el menú móvil si está abierto antes de desplazarse
                if (!mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                }

                targetElement.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

});