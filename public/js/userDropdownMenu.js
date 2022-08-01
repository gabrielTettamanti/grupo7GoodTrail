window.addEventListener('load', () => {
    const dropdown = document.querySelector('.dropdown');
    const userSelect = dropdown.querySelector('.user-select');
    const userMenu = dropdown.querySelector('.user-menu');
    const arrow = dropdown.querySelector('.arrow');

    userSelect.addEventListener('click', () => {
        console.log('Hiciste click');
        userMenu.classList.toggle('menu-open');
        arrow.classList.toggle('arrow-rotate');
    });
});