window.addEventListener('load', () => {
    const dropdown = document.querySelector('.dropdown');
    const userSelect = dropdown.querySelector('.user-select');
    const userMenu = dropdown.querySelector('.user-menu');

    userSelect.addEventListener('click', () => {
        console.log('Hiciste click');
        userMenu.classList.toggle('menu-open');
    });
});