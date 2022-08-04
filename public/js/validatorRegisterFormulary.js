window.onload = function(){
    ///// QUERYSLECTORS /////
    let emailWarningList = document.querySelector("#emailWarningList")
    let nameWarningList = document.querySelector("#nameWarningList")
    let passwordWarningList = document.querySelector("#passwordWarningList")
    let passwordConfirmWarningList = document.querySelector("#passwordConfirmWarningList")

    let email = document.querySelector("#email")
    let name = document.querySelector("#userName")
    let password = document.querySelector("#password")
    let passwordConfirm = document.querySelector("#passwordConfirm")
    let image = document.querySelector("#image")

    let submitButton = document.querySelector("#register-submit-button")

    // submitButton.addEventListener('click', (event) => {
    //     event.preventDefault();
    // });

    ///// EMAIL /////
    email.addEventListener('blur', e =>{
          if(email.value.length < 1){
            if(emailWarningList.innerHTML == "") {
                emailWarningList.innerHTML += "<p class='text-danger'>Debe tener un email.</p>"
            }
          }else{
              if(!email.value.includes("@")){
                if(emailWarningList.innerHTML == "") {
                    emailWarningList.innerHTML += "<p class='text-danger'>Debe tener formato de email.</p>"
                }
              }else{
                emailWarningList.innerHTML = ""
              }
          }
    });
    ///// NAME /////
    name.addEventListener('blur', e =>{
    if(name.value.length < 1){
        if(nameWarningList.innerHTML == "") {
            nameWarningList.innerHTML += "<p class='text-danger'>Debe tener un nombre.</p>"
        }
      }else{
          if(!name.value.length <= 2){
            if(nameWarningList.innerHTML == "") {
                nameWarningList.innerHTML += "<p class='text-danger'>Debe tener por lo menos 2 caracteres.</p>"
            }
          }else{
            nameWarningList.innerHTML = ""
          }
      }
    });
    ///// PASSWORD /////
    ///// PASSWORD CONFIRM /////
    ///// IMAGE /////
    ///// SUBMIT BUTTON IF /////
}
