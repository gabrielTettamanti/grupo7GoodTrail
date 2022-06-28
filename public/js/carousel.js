const slides = document.querySelectorAll('.slide');
const nextSlide = document.querySelector('.forward');
const backSlide = document.querySelector('.back');

let actualSlide = 0;
let maxSlide = slides.length - 1;

slides.forEach((slide, index) => {
    slide.style.transform = `translateX(${index * 100}%)`;
});

nextSlide.addEventListener('click', () => {
    if(actualSlide === maxSlide){
        actualSlide = 0;
    }else {
        actualSlide ++;
    }

    //***** move slide by -100% *****/
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - actualSlide)}%)`;
    })
});

backSlide.addEventListener('click', () => {
    if(actualSlide === 0){
        actualSlide = maxSlide;
    }else {
        actualSlide --;
    }

    //***** move slide by 100% *****/
    slides.forEach((slide, index) => {
        slide.style.transform = `translateX(${100 * (index - actualSlide)}%)`
    })
});





