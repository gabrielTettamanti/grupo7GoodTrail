window.addEventListener('load', () => {
    const form = document.querySelector('.forms');
    const formElements = document.querySelectorAll('.formElement');
  
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
        const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&][^'\s]/;
        const element = e.srcElement;
        const p = document.querySelector('#error' + element.id);
        if(element.value === ''){
            element.classList.add('invalid');
            p.innerHTML = `El campo ${element.id} no puede estar vacio.`;
        } else if(element.name === 'userEmail' && !isEmail(element.value)) {
            p.innerHTML = `Debe tener formato de email.`;
        } else {
            p.innerHTML = "";
        }
    }));
  
    const isEmail = email => {
      const emailSplit = email.split("@")
      if(!email.includes("@")){
        return false
      }
      if(!email.includes(".com")){
        return false
      }
      if(emailSplit[0] == ""){
        return false
      }
      if(emailSplit){
        const dotcomSplit = emailSplit[1].split(".com")
        if(dotcomSplit[0] == ""){
          return false
        }
      }
      return true
    }
  });