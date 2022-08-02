window.addEventListener('load', function() {

    let button = document.querySelector('#buyCartAdd')
    button.onclick = function(e){
        
        document.querySelector('#buyCartAddForm').submit()
        console.log('hiciste click en el button')
    }
    
  });