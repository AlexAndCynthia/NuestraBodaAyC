let currentSlide = 1;
let slideInterval;

function showSlide(n) {
    const slides = document.querySelectorAll('.slides img');
    const tabs = document.querySelectorAll('.tab .circle');

    // Ocultar todas las imágenes y quitar la clase active de todos los tabs
    slides.forEach(slide => slide.classList.remove('active'));
    tabs.forEach(tab => tab.classList.remove('active'));

    // Mostrar la imagen correspondiente y añadir clase active al tab correspondiente
    document.getElementById('slide' + n).classList.add('active');
    document.getElementById('tab' + n).classList.add('active');

    // Actualizar la slide actual
    currentSlide = n;
}{}

function nextSlide() {
    let nextSlide = currentSlide + 1;
    const totalSlides = document.querySelectorAll('.slides img').length;

    if (nextSlide > totalSlides) {
        nextSlide = 1;
    }

    const lastSlide = document.getElementById('slide' + currentSlide);
    lastSlide.style.zIndex = '2';
    showSlide(nextSlide);
}

function startSlideShow() {
    slideInterval = setInterval(nextSlide, 5000);
}

function stopSlideShow() {
    clearInterval(slideInterval);
}

// Mostrar la primera imagen por defecto y empezar el slideshow
document.addEventListener('DOMContentLoaded', () => {
    showSlide(1);
    startSlideShow();

    // Añadir eventos de click a los tabs para parar el slideshow y mostrar la imagen correspondiente
    const tabs = document.querySelectorAll('.tab .circle');
    tabs.forEach((tab, index) => {
        tab.addEventListener('click', () => {
            stopSlideShow();
            showSlide(index + 1);
            startSlideShow(); // Reiniciar el slideshow después de seleccionar manualmente
        });
    });

    // Modificación de Scroll apra efecto parallax
    window.addEventListener('scroll',function(){
        let slidescontent=document.querySelector('.slides');
        let homelogo=document.querySelector('.home-logo');
        let homecontinue=document.querySelector('.home-continue');
        let value = window.scrollY;
        let altura = window.innerHeight * 0.8;
        slidescontent.style.top = value*0.5 + 'px';
        homelogo.style.opacity = 1 - (value/altura);
        homecontinue.style.opacity = 1 - (value/altura);
    })
});
