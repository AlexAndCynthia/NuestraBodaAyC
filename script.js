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
    });

    // PLAY BUTTON

    document.getElementById('play-button').addEventListener('click', function() {
        var audio = document.getElementById('song');
        audio.play();

        // Restaurar el estado de la música cuando la página se carga
        window.onload = function() {
            if (localStorage.getItem('musicPlaying') === 'true') {
            audio.play();
            }
        }

        // Guardar el estado de la música antes de salir
        function saveMusicState() {
            localStorage.setItem('musicPlaying', !audio.paused);
        }

        document.addEventListener('visibilitychange', function() {
            if (document.hidden) {
              audio.pause(); // Pausa la música si la pestaña no está activa
            } else {
              audio.play(); // Reanuda la música si la pestaña vuelve a estar activa
            }
        });

        const secciones = document.querySelectorAll(".hidden-element");
        secciones.forEach(seccion => {
            seccion.style.display = "flex";
        });
    });

    // COUNTDOWN

    const countdownDate = new Date("Sept 07, 2024 17:00:00").getTime();
    
    function formatNumber(number) {
        return number < 10 ? `0${number}` : number;
    }

    const interval = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownDate - now;

        // Cálculo de mes, días, horas, minutos y segundos
        // const months = Math.floor(distance / (1000 * 60 * 60 * 24 * 30.42));
        const remaining = distance % (1000 * 60 * 60 * 24 * 31);
        const days = Math.floor((remaining / (1000 * 60 * 60 * 24)));
        const hours = Math.floor((remaining % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        //document.getElementById("months").textContent = formatNumber(months);
        document.getElementById("days").textContent = formatNumber(days);
        document.getElementById("hours").textContent = formatNumber(hours);
        document.getElementById("minutes").textContent = formatNumber(minutes);
        document.getElementById("seconds").textContent = formatNumber(seconds);

        if (distance < 0) {
            clearInterval(interval);
            document.getElementById("countdown-title").innerHTML = "¡Recién casados!";
            document.getElementById("countdown").innerHTML = "";
        }
    }, 1000);

    // Schedule

    window.addEventListener('scroll', () => {
        const items = document.querySelectorAll('.timeline-item');
        const windowHeight = window.innerHeight;
    
        items.forEach(item => {
            const rect = item.getBoundingClientRect();
            const itemCenter = rect.top + rect.height / 2;
    
            if (itemCenter >= windowHeight / 2 - rect.height / 2 && itemCenter <= windowHeight / 2 + rect.height / 2) {
                item.classList.add('highlight');
            } else {
                item.classList.remove('highlight');
            }
        });
    });

    // Background animations
    // Función para agregar el observador de intersección a un contenedor
    function addIntersectionObserver(containerId) {
        const container = document.getElementById(containerId);
        if (!container) return;

        const hiddenElement = container.querySelector('.bg-item');

        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    container.classList.add('scrolled');
                } else {
                    container.classList.remove('scrolled');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(container);
    }

    addIntersectionObserver('home-continue');
    addIntersectionObserver('photo-data-husband'); 
    addIntersectionObserver('photo-data-bride'); 
    addIntersectionObserver('countdown-container');
    addIntersectionObserver('parents'); 
    addIntersectionObserver('place'); 
    addIntersectionObserver('schedule'); 
    addIntersectionObserver('attendance'); 
    addIntersectionObserver('dev-name'); 
    
    // Ir a la parte superior al actualizar
    window.onload = function() {
        window.location.hash = '#home';
    };

    // Loading screen
    const loadingScreen = document.getElementById('loading-screen');
    const mainContent = document.getElementById('main-content');

    setTimeout(() => {
        loadingScreen.style.opacity = '0';
    }, 5000); // 5 segundos

    loadingScreen.addEventListener('transitionend', () => {
        loadingScreen.style.display = 'none';
        mainContent.classList.add('show-content');
    });

    //FADE TRANSITION
    const elements = document.querySelectorAll('.fade-in');

    const checkVisibility = () => {
        elements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const isVisible = rect.top < (window.innerHeight*0.9) && rect.bottom > 0;

            if (isVisible) {
                el.classList.add('visible');
            } else {
                el.classList.remove('visible');
            }
        });
    };

    window.addEventListener('scroll', checkVisibility);
    checkVisibility(); // Para activar/desactivar la animación en la carga inicial.
});

