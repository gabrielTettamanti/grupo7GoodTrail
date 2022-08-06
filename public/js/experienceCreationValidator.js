window.addEventListener('load', () => {
    const form = document.querySelector('.forms');
    const formElements = document.querySelectorAll('.formElement');
    const button = document.querySelector('#submit-button');

    form.addEventListener('submit', e => {
        let errors = [];

        formElements.forEach(input => {
            if(input.value === ''){
                errors.push(input);
            }
        });

        if(errors.length > 0){
            e.preventDefault();
        }
    });

    formElements.forEach(input => input.addEventListener('blur', e => {
        const element = e.srcElement;
        const p = document.querySelector('#error' + element.id);
        if(element.value === ''){
            manageStyle(element);
            p.innerHTML = `El campo ${element.id} no puede estar vacio`;
        } else if(element.name === 'name' && element.value.length < 5) {
            manageStyle(element);
            p.innerHTML = `El campo ${element.id} debe tener más de 5 caracteres`;
        } else if(element.name === 'description' && element.value.length < 20){
            manageStyle(element);
            p.innerHTML = `El campo ${element.id} debe tener más de 20 caracteres`;
        } else {
            element.classList.remove('invalid');
            element.classList.add('valid');
            p.innerHTML = "";
        }
    }));

    const manageStyle = element => {
        element.classList.remove('normal-border');
        element.classList.add('invalid');
        element.classList.remove('valid');
    }
});