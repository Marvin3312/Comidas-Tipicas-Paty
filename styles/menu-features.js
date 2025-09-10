document.addEventListener('DOMContentLoaded', () => {
    // Característica 1: Alternador de Disponibilidad
    const menuItems = document.querySelectorAll('.menu-item-list');

    menuItems.forEach(item => {
        const availabilityButton = document.createElement('button');
        availabilityButton.textContent = 'Disponible';
        availabilityButton.className = 'bg-green-500 text-white text-xs font-bold py-1 px-2 rounded-full ml-4';
        
        let isAvailable = true;

        availabilityButton.addEventListener('click', (e) => {
            e.stopPropagation();
            isAvailable = !isAvailable;
            if (isAvailable) {
                availabilityButton.textContent = 'Disponible';
                availabilityButton.classList.remove('bg-red-500');
                availabilityButton.classList.add('bg-green-500');
                item.classList.remove('unavailable');
            } else {
                availabilityButton.textContent = 'No Disponible';
                availabilityButton.classList.remove('bg-green-500');
                availabilityButton.classList.add('bg-red-500');
                item.classList.add('unavailable');
            }
        });

        item.appendChild(availabilityButton);
    });

    // Característica 2: Guardar como Imagen
    const saveImageButton = document.getElementById('save-menu-image-btn');

    if (saveImageButton) {
        saveImageButton.addEventListener('click', () => {
            const menuToCapture = document.querySelector('#menu-capture-area');
            
            // Guardar estilos originales
            const originalWidth = menuToCapture.style.width;
            const originalHeight = menuToCapture.style.height;
            const originalOverflow = menuToCapture.style.overflowY;

            // Aplicar estilos para la captura
            menuToCapture.style.width = '1200px';
            menuToCapture.style.height = 'auto';
            menuToCapture.style.overflowY = 'visible';

            const unavailableItems = menuToCapture.querySelectorAll('.unavailable');
            unavailableItems.forEach(item => {
                item.style.display = 'none';
            });

            html2canvas(menuToCapture, {
                width: 1200,
                scale: 1,
                backgroundColor: null,
                windowHeight: menuToCapture.scrollHeight
            }).then(capturedCanvas => {
                // Restaurar estilos originales
                menuToCapture.style.width = originalWidth;
                menuToCapture.style.height = originalHeight;
                menuToCapture.style.overflowY = originalOverflow;
                unavailableItems.forEach(item => {
                    item.style.display = 'flex';
                });

                // Crear canvas final con la altura del contenido
                const finalCanvas = document.createElement('canvas');
                finalCanvas.width = 1200;
                finalCanvas.height = capturedCanvas.height;
                const ctx = finalCanvas.getContext('2d');

                ctx.drawImage(capturedCanvas, 0, 0);

                const link = document.createElement('a');
                link.download = 'menu-disponible-comidas-paty.png';
                link.href = finalCanvas.toDataURL('image/png');
                link.click();
            });
        });
    }

    // Característica 3: Lógica de Filtro
    const filterButtons = document.querySelectorAll('.filter-btn');
    const allMenuItems = document.querySelectorAll('#menu-list .menu-item-list');

    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Manejar el estado activo del botón
            filterButtons.forEach(btn => btn.classList.remove('bg-paty-accent', 'text-white'));
            filterButtons.forEach(btn => btn.classList.add('bg-gray-300', 'text-paty-text', 'hover:bg-paty-accent'));
            button.classList.add('bg-paty-accent', 'text-white');
            button.classList.remove('bg-gray-300', 'text-paty-text', 'hover:bg-paty-accent');

            const filter = button.dataset.filter;

            allMenuItems.forEach(item => {
                if (filter === 'all' || item.dataset.category === filter) {
                    item.style.display = 'flex';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
});