window.onload = function(){
    ///// QUERYSLECTORS /////
    let warningList = document.querySelector("#warningList")
    let email = document.querySelector("#email")
    let name = document.querySelector("#userName")
    let password = document.querySelector("#password")
    let passwordConfirm = document.querySelector("#passwordConfirm")
    let image = document.querySelector("#image")
    let submitButton = document.querySelector("#register-submit-button")

    submitButton.addEventListener('click', (event) => {
        event.preventDefault();
    });

    ///// EMAIL /////
    email.addEventListener('blur', e =>{
          if(email.value.length < 1){
            if(warningList.innerHTML == "") {
                warningList.innerHTML += "<p class='text-danger'>Debe tener un email</p>"
            }
          }else{
              if(!email.value.includes("@")){
                if(warningList.innerHTML == "") {
                    warningList.innerHTML += "<p class='text-danger'>Debe tener formato de email</p>"
                }
              }else{
                warningList.innerHTML = ""
              }
          }
    
    });
    ///// NAME /////
    ///// PASSWORD /////
    ///// PASSWORD CONFIRM /////
    ///// IMAGE /////
    ///// SUBMIT BUTTON IF /////
}
