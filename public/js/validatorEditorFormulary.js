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
      //const passwordValidation = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&][^'\s]/;
      const element = e.srcElement;
      const p = document.querySelector('#error' + element.id);
      if(element.value === '' && element.name !== 'offer' && element.name !== 'limit_date'){
          element.classList.add('invalid');
          p.innerHTML = `El campo ${element.id} no puede estar vacio.`;
      } else if(element.name === 'name' && element.value.length <= 4 ) {
          p.innerHTML = `El campo ${element.id} debe tener al menos 5 caracteres.`;
      } else if(element.name === 'description' && element.value.length <= 19) {
        p.innerHTML = `El campo ${element.id} debe tener al menos 20 caracteres.`;
      } else if(element.name === 'location' && element.value.length <= 1) {
        p.innerHTML = `El campo ${element.id} debe tener al menos 2 caracteres.`;
      } else if(element.name === 'people_quantity' && element.value <= 1) {
        p.innerHTML = `El campo ${element.id} debe tener un valor igual o superior a 1.`;
      } else if(element.name === 'duration' && element.value <= 1) {
        p.innerHTML = `El campo ${element.id} debe tener un valor igual o superior a 1.`;
      } else if(element.name === 'price' && element.value !== "" && element.value < 0) {
        p.innerHTML = `El campo ${element.id} debe tener un valor mayor o igual a 0.`;
      } else if(element.name === 'offer' && element.value !== "" && element.value >= 101) {
        p.innerHTML = `El campo ${element.id} debe tener un valor menor o igual a 100.`;
      } else if(element.name === 'offer' && element.value !== "" && element.value < 0) {
        p.innerHTML = `El campo ${element.id} debe tener un valor mayor o igual a 0.`;
      } else if(element.name === 'map_direction' && element.value.length <= 4) {
        p.innerHTML = `El campo ${element.id} debe tener al menos 5 caracteres.`;
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