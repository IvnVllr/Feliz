let arreglo = ['', '', ''];
let imagenSeleccionada = null;
const esDispositivoMovil = window.matchMedia("(max-width: 768px)").matches;

// Función para manejar el "drop" de las imágenes

function allowDrop(ev) {
    ev.preventDefault(); // Evita el comportamiento por defecto para permitir el drop
};

// Función para iniciar el drag de la imagen
function drag(ev) {
    if (!esDispositivoMovil) {
        ev.dataTransfer.setData('text', ev.target.id); // Almacenar el ID de la imagen arrastrada
    };
};

function drop(ev) {
        ev.preventDefault();
        
        if (esDispositivoMovil) {
            // Para dispositivos móviles, utilizamos la lógica de selección por clicks
            if (imagenSeleccionada) {
                if (arreglo[parseInt(ev.target.id)] === '') {
                    arreglo[parseInt(ev.target.id)] = imagenSeleccionada.id;
                    ev.target.appendChild(imagenSeleccionada);

                     // Remover la clase seleccionada al colocar la imagen
                    imagenSeleccionada.classList.remove('seleccionada');
                    imagenSeleccionada = null; // Resetear la selección
                };
    
                // Verificar si el div container-fotos está vacío
                const contenedorFotos = document.getElementById('container-fotos');
                if (contenedorFotos.children.length === 0) {
                    contenedorFotos.classList.add('hidden');
                };
            };
        } else {
            // Lógica para drag and drop en PC
            // Primero asegurarse de que ev.dataTransfer existe antes de usarlo
            if (ev.dataTransfer) {
                let data = ev.dataTransfer.getData('text');
                
                if (arreglo[parseInt(ev.target.id)] === '') {
                    arreglo[parseInt(ev.target.id)] = data;
                    ev.target.appendChild(document.getElementById(data));

                    const imagenArrastrada = document.getElementById(data);
                    imagenArrastrada.classList.remove('seleccionada');
    
    
                    // Verificar si el div container-fotos está vacío
                    const contenedorFotos = document.getElementById('container-fotos');
                    if (contenedorFotos.children.length === 0) {
                        contenedorFotos.classList.add('hidden');
                    };
                };
            };
        };
    
        // Si ya todas las imágenes están en su lugar, verificar combinaciones
        if (arreglo[0] !== '' && arreglo[1] !== '' && arreglo[2] !== '') {
            verificarCombinaciones();
    };
};


function seleccionarImagenEnMovil(imgElement) {
    if (esDispositivoMovil) {
        // Si hay una imagen seleccionada, quitar la clase de seleccionada
        if (imagenSeleccionada) {
            imagenSeleccionada.classList.remove('seleccionada'); // Quitar la selección de la imagen anterior
        }

        // Seleccionar la nueva imagen
        imagenSeleccionada = imgElement;
        imagenSeleccionada.classList.add('seleccionada'); // Agregar la clase de selección
        console.log('Imagen seleccionada:', imagenSeleccionada.id);
    }
}

document.addEventListener('DOMContentLoaded', function() {
    if (esDispositivoMovil) {
        // Agregar eventos de clic para las imágenes (en lugar de drag)
        const imagenes = document.querySelectorAll('.imagenes');
        imagenes.forEach(img => {
            img.addEventListener('click', () => seleccionarImagenEnMovil(img));
        });

        // Agregar eventos de clic para los espacios donde se colocan las imágenes (en lugar de drop)
        const cajas = document.querySelectorAll('.box');
        cajas.forEach(caja => {
            caja.addEventListener('click', (ev) => {
                drop(ev);  // Llamar la función drop manualmente en móviles
            });
        });
    }
});


function verificarCombinaciones() {
    const box1 = document.getElementById('0');
    const box2 = document.getElementById('1');
    const box3 = document.getElementById('2');
    const mensaje = document.getElementById('textoTesInteligencia');
    const ContenedorFinal = document.getElementById('container-final');
    const audioCorrecto = document.getElementById('audioCorrecto');
    const audioDosIncorrectos = document.getElementById('audioDosIncorrectos');
    const audioTodosIncorrectos = document.getElementById('audioTodosIncorrectos');


    //bajo sonido
    audioCorrecto.volume = 0.3;
    audioDosIncorrectos.volume = 0.3;
    audioTodosIncorrectos.volume = 0.3;

    // Limpiar clases anteriores
    box1.classList.remove('correct', 'incorrect');
    box2.classList.remove('correct', 'incorrect');
    box3.classList.remove('correct', 'incorrect');

    const combinaciones = [
        { combo: ['perro', 'raton', 'gato'], resultados: ['correct', 'correct', 'correct'], texto: 'Felicidades, haz acertado, pulsa el botón para reclamar tu premio.', audio: audioCorrecto,  titulo: '¡Felicidades, Lo lograste!', icono: 'img/favicoins/festejo/favicon.ico' },
        { combo: ['raton', 'perro', 'gato'], resultados: ['incorrect', 'incorrect', 'correct'], texto: 'Casi lo logras, andá, hacelo de nuevo.', audio: audioDosIncorrectos, titulo: '¡Casi, intenta de nuevo!', icono: 'img/favicoins/serio/favicon.ico' },
        { combo: ['perro', 'gato', 'raton'], resultados: ['correct', 'incorrect', 'incorrect'], texto: 'Casi lo logras, andá, hacelo de nuevo.', audio: audioDosIncorrectos, titulo: '¡Casi, intenta de nuevo!', icono: 'img/favicoins/serio/favicon.ico' },
        { combo: ['gato', 'raton', 'perro'], resultados: ['incorrect', 'correct', 'incorrect'], texto: 'Casi lo logras, andá, hacelo de nuevo.', audio: audioDosIncorrectos, titulo: '¡Casi, intenta de nuevo!', icono: 'img/favicoins/serio/favicon.ico' },
        { combo: ['gato', 'perro', 'raton'], resultados: ['incorrect', 'incorrect', 'incorrect'], texto: 'Hasta un caracol es más inteligente que vos, andá, hacelo de nuevo.', audio: audioTodosIncorrectos, titulo: '¡BURROOO 🫏!', icono: 'img/favicoins/riendose/favicon.ico'}
    ];

    let combinacionCorrecta = false;
    let totalIncorrectos = 0;

    // Verificar combinaciones
    for (const { combo, resultados, texto, audio, titulo, icono  } of combinaciones) {
        if (arreglo[0] === combo[0] && arreglo[1] === combo[1] && arreglo[2] === combo[2]) {
            combinacionCorrecta = true;

            box1.classList.add(resultados[0]);
            box2.classList.add(resultados[1]);
            box3.classList.add(resultados[2]);

             // Cambiar título y icono de la página
             document.title = titulo;
             const iconLink = document.querySelector("link[rel='icon']");
             if (iconLink) {
                 iconLink.href = icono;
            }


            if (resultados.every(result => result === 'correct')) {
                sacarConfettiCorrect();
                setInterval(sacarConfettiCorrect, 3000);

                ContenedorFinal.classList.remove('hidden');

                if (window.matchMedia("(max-width: 768px)").matches) {
                    // Cambiar a "row" si la combinación es correcta y la pantalla es pequeña
                    const contenedorFotosFigura = document.getElementById('id-fotos-figura');
                    contenedorFotosFigura.classList.add('flex-column');
                };

            };

            if(!resultados.every(result => result === 'correct')) {

                if (window.matchMedia("(max-width: 768px)").matches) {
                    // Cambiar a "row" si la combinación es correcta y la pantalla es pequeña

                    const contenedorFotosFigura = document.getElementById('id-fotos-figura');

                    contenedorFotosFigura.classList.add('flex-column');
                }

                sacarConfettiTodosIncorrect();
                setTimeout(() => {
                    window.location.reload();
                }, 5000);
            };

            if (audio) {
                audio.play();
            }

            mensaje.innerHTML = texto;
            break;
        } else {
            totalIncorrectos += resultados.filter(r => r === 'incorrect').length;
        };
    };
};


function sacarConfettiCorrect(){
    const canvas = document.querySelector('#confetti');
    const jsConfetti = new JSConfetti(canvas);

    jsConfetti.addConfetti({
        emojis: ['🌈', '⚡️', '💥', '✨', '💫', '🌸', '🎉', '🩲', '💣', '😍'],
    }).then(() => jsConfetti.addConfetti());
};


function sacarConfettiTodosIncorrect(){
    const canvas = document.querySelector('#confetti');
    const jsConfetti = new JSConfetti(canvas);

    jsConfetti.addConfetti({
        emojis: ['🫏', '🤣', '🤡', '😒', '🙄', '🤦‍♀️', '😐', '👌', '🤌'],
    });
};

document.addEventListener('DOMContentLoaded', function() {
    
    const btnRecompensa = document.getElementById('botonFinal');
    
    function CambiarPagina(){
        window.location.href='feliz_dia_mama.html';
    }

    btnRecompensa.onclick = CambiarPagina;

});

document.addEventListener('DOMContentLoaded', function() {

    var audioElement = document.getElementById('audioMorzart');
    
  
    audioElement.volume = 0.01;
});
