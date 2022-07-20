window.addEventListener('load', () => {
    
    const radioButtons = document.querySelectorAll('#radio-button');

    radioButtons.forEach(button => {
        button.addEventListener('change', () => {
            document.querySelector('.filter-form').submit();
        }); 
    });
    
});