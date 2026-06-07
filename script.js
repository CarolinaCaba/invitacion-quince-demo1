const portadaContainer = document.getElementById('portadaContainer');
const invitacionContainer = document.getElementById('invitacionContainer');
const musicBtn = document.getElementById('musicBtn');
const musica = document.getElementById('musicaFondo');
let musicaActivada = false;

function abrirRevista() {
    portadaContainer.style.opacity = '0';
    portadaContainer.style.visibility = 'hidden';
    invitacionContainer.classList.add('visible');
    musicBtn.style.display = 'flex';
    
    canvasConfetti({
        particleCount: 100,
        spread: 60,
        origin: { y: 0.6 },
        colors: ['#5c0a20', '#d4af37', '#ffffff', '#8b1a35']
    });
    
    musica.play().catch(e => console.log('Interacción necesaria'));
    musicaActivada = true;
    musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
}

portadaContainer.addEventListener('click', abrirRevista);
portadaContainer.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        abrirRevista();
    }
});
portadaContainer.setAttribute('tabindex', '0');

musicBtn.addEventListener('click', () => {
    if (musicaActivada) {
        musica.pause();
        musicaActivada = false;
        musicBtn.innerHTML = '<i class="fas fa-music"></i>';
    } else {
        musica.play();
        musicaActivada = true;
        musicBtn.innerHTML = '<i class="fas fa-pause"></i>';
    }
});

function actualizarCountdown() {
    const fechaEvento = new Date("August 4, 2026 20:00:00").getTime();
    const ahora = new Date().getTime();
    const distancia = fechaEvento - ahora;

    if (distancia < 0) {
        document.getElementById("dias").innerText = "00";
        document.getElementById("horas").innerText = "00";
        document.getElementById("minutos").innerText = "00";
        document.getElementById("segundos").innerText = "00";
        return;
    }

    const dias = Math.floor(distancia / (1000 * 60 * 60 * 24));
    const horas = Math.floor((distancia % (86400000)) / (3600000));
    const minutos = Math.floor((distancia % 3600000) / 60000);
    const segundos = Math.floor((distancia % 60000) / 1000);

    document.getElementById("dias").innerText = dias < 10 ? "0" + dias : dias;
    document.getElementById("horas").innerText = horas < 10 ? "0" + horas : horas;
    document.getElementById("minutos").innerText = minutos < 10 ? "0" + minutos : minutos;
    document.getElementById("segundos").innerText = segundos < 10 ? "0" + segundos : segundos;
}

setInterval(actualizarCountdown, 1000);
actualizarCountdown();

const swiper = new Swiper('.mySwiper', {
    loop: true,
    autoplay: { delay: 4000, disableOnInteraction: false },
    pagination: { el: '.swiper-pagination', clickable: true },
    navigation: { nextEl: '.swiper-button-next', prevEl: '.swiper-button-prev' },
});

const rsvpForm = document.getElementById('rsvpForm');
const mensajeRSVP = document.getElementById('mensajeRSVP');

rsvpForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const nombre = rsvpForm.querySelector('input[placeholder="Tu nombre completo"]').value.trim();
    if (!nombre) {
        alert('Por favor, ingresa tu nombre completo');
        return;
    }
    mensajeRSVP.style.display = 'block';
    mensajeRSVP.innerHTML = `Gracias ${nombre}! Tu confirmacion ha sido registrada. Te esperamos para celebrar con Daniela.`;
    mensajeRSVP.style.background = '#e8f5e9';
    mensajeRSVP.style.color = '#2e7d32';
    mensajeRSVP.style.padding = '12px';
    mensajeRSVP.style.borderRadius = '60px';
    rsvpForm.reset();
    setTimeout(() => { mensajeRSVP.style.display = 'none'; }, 5000);
});
