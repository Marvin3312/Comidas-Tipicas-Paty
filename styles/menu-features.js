document.addEventListener('DOMContentLoaded', () => {
    const editMenuButton = document.getElementById('edit-menu-btn');
    const antojitoItems = document.querySelectorAll('#collapseAntojitos .antojito-item > span[contenteditable]');
    let isEditing = false;

    const toggleEditing = () => {
        isEditing = !isEditing;
        antojitoItems.forEach(item => {
            item.setAttribute('contenteditable', isEditing);
            if (isEditing) {
                item.style.border = '1px solid #D95323';
                item.style.padding = '0.25rem';
            } else {
                item.style.border = 'none';
                item.style.padding = '0';
            }
        });
        editMenuButton.textContent = isEditing ? 'Finalizar Edición' : 'Editar Menú';
    };

    editMenuButton.addEventListener('click', toggleEditing);

    // Guardar como imagen
    const saveImageButton = document.getElementById('save-menu-image-btn');

    if (saveImageButton) {
        saveImageButton.addEventListener('click', () => {
            if(isEditing) {
                toggleEditing();
            }
            
            const menuToCapture = document.querySelector('#menu-capture-area');
            const editButton = document.getElementById('edit-menu-btn');
            const originalDisplay = editButton.style.display;
            editButton.style.display = 'none';


            html2canvas(menuToCapture, {
                width: 1200,
                height: 1200,
                backgroundColor: null
            }).then(canvas => {
                editButton.style.display = originalDisplay;

                const fecha = new Date().toISOString().split('T')[0];
                const link = document.createElement('a');
                link.download = `menu-comidas-paty-${fecha}.png`;
                link.href = canvas.toDataURL('image/png');
                link.click();
            });
        });
    }
});
