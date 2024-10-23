let arreglo = ['', '', ''];

document.addEventListener('DOMContentLoaded', function() {
    let btnSi0 = document.getElementById('btn-si-0');
    let btnSi1 = document.getElementById('btn-si-1');
    let btnSi2 = document.getElementById('btn-si-2');
    let contenedorIncio0 = document.getElementById('inicio-0');
    let contenedorIncio1 = document.getElementById('inicio-1');
    let contenedorIncio2 = document.getElementById('inicio-2');
    let contenedorFotos = document.getElementById('contenedor-Fotos');
    let contenedorDivsFotos = document.getElementById('contenedor-Divs-Fotos');

    function siguienteDiv() {
        if (!contenedorIncio0.classList.contains('hidden') && contenedorIncio1.classList.contains('hidden')) {
            // Mostrar inicio-1 y ocultar inicio-0
            contenedorIncio1.classList.remove('hidden');
            contenedorIncio0.classList.add('hidden');
            console.log('boton-incio0');
        } else if (!contenedorIncio1.classList.contains('hidden') && contenedorIncio2.classList.contains('hidden')) {
            // Mostrar inicio-2 y ocultar inicio-1
            contenedorIncio2.classList.remove('hidden');
            contenedorIncio1.classList.add('hidden');
            console.log('boton-incio1');
        } else if (!contenedorIncio2.classList.contains('hidden')) {
            // Ocultar inicio-2 y mostrar contenedorFotos y contenedorDivsFotos
            contenedorIncio2.classList.add('hidden');
            contenedorFotos.classList.remove('hidden');
            contenedorDivsFotos.classList.remove('hidden');
            console.log('boton-incio2');
        }
    }

    // Asignar la función al botón "Sí" de cada sección
    btnSi0.onclick = siguienteDiv;
    btnSi1.onclick = siguienteDiv;
    btnSi2.onclick = siguienteDiv;
});

document.addEventListener('DOMContentLoaded', function() {
    let btnNo0 = document.getElementById('btn-no-0');
    let btnNo1 = document.getElementById('btn-no-1');
    let btnNo2 = document.getElementById('btn-no-2');

    function PresionarNo(){
        alert('¿Qué pasó? ¿jugó cagoneta?');
    }

    btnNo0.onclick = PresionarNo;
    btnNo1.onclick = PresionarNo;
    btnNo2.onclick = PresionarNo;
})

// Permitir el drop
function allowDrop(ev) {
    ev.preventDefault();
}

// Función para iniciar el drag de la imagen
function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

// Función para manejar el drop de la imagen en los contenedores
function drop(ev) {
    if (arreglo[parseInt(ev.target.id)] === '') {
        var data = ev.dataTransfer.getData('text');
        arreglo[parseInt(ev.target.id)] = data;
        ev.target.appendChild(document.getElementById(data));

        // Verificar si el div container-fotos está vacío
        var containerFotos = document.getElementById('container-fotos');
        if (containerFotos.children.length === 0) {
            containerFotos.classList.add('hidden');  // Agrega la clase hidden si está vacío
        }
    }

    if (arreglo[0] !== '' && arreglo[1] !== '' && arreglo[2] !== '') {
        verificarCombinaciones();
    }
}

// Verificar combinaciones
function verificarCombinaciones() {
    const box1 = document.getElementById('0');
    const box2 = document.getElementById('1');
    const box3 = document.getElementById('2');
    const mensaje = document.getElementById('textoTesInteligencia');
    const containerFotos = document.getElementById('container-fotos');

    // Limpiar clases anteriores
    box1.classList.remove('correct', 'incorrect');
    box2.classList.remove('correct', 'incorrect');
    box3.classList.remove('correct', 'incorrect');

    const combinaciones = [
        { combo: ['perro', 'raton', 'gato'], resultados: ['correct', 'correct', 'correct'], texto: 'Felicidades, haz acertado, pulsa el botón para reclamar tu premio.' },
        { combo: ['raton', 'perro', 'gato'], resultados: ['incorrect', 'incorrect', 'correct'], texto: 'Casi lo logras, andá, hacelo de nuevo.' },
        { combo: ['perro', 'gato', 'raton'], resultados: ['correct', 'incorrect', 'incorrect'], texto: 'Casi lo logras, andá, hacelo de nuevo.' },
        { combo: ['gato', 'raton', 'perro'], resultados: ['incorrect', 'correct', 'incorrect'], texto: 'Casi lo logras, andá, hacelo de nuevo.' },
        { combo: ['gato', 'perro', 'raton'], resultados: ['incorrect', 'incorrect', 'incorrect'], texto: 'Hasta un caracol es más inteligente que vos, andá, hacelo de nuevo.' }
    ];

    let combinacionCorrecta = false;
    let totalIncorrectos = 0;

    // Verificar combinaciones
    for (const { combo, resultados, texto } of combinaciones) {
        if (arreglo[0] === combo[0] && arreglo[1] === combo[1] && arreglo[2] === combo[2]) {
            combinacionCorrecta = true;

            // Añadir clases correctas
            box1.classList.add(resultados[0]);
            box2.classList.add(resultados[1]);
            box3.classList.add(resultados[2]);

            mensaje.innerHTML = texto;

            break; // Salir del bucle si se encuentra la combinación correcta
        } else {
            // Si no es correcta, contar los incorrectos
            totalIncorrectos += resultados.filter(r => r === 'incorrect').length;
        }
    }

    // Lógica para determinar si se debe recargar
    if (!combinacionCorrecta || totalIncorrectos > 0) {
        // Mostrar mensaje según el total de incorrectos
        if (totalIncorrectos === 3) {
            mensaje.innerHTML = 'Hasta un caracol es más inteligente que vos, andá, hacelo de nuevo.';
        } else {
            mensaje.innerHTML = 'Casi lo logras, andá, hacelo de nuevo.';
        }

        // Recargar solo el div actual después de 1 segundo
        setTimeout(() => {
            // Limpiar el contenido de los boxes
            box1.innerHTML = '';
            box2.innerHTML = '';
            box3.innerHTML = '';
            box1.classList.remove('correct', 'incorrect');
            box2.classList.remove('correct', 'incorrect');
            box3.classList.remove('correct', 'incorrect');
            // Mover las imágenes de vuelta al contenedor original
            const imgGato = document.getElementById('gato');
            const imgPerro = document.getElementById('perro');
            const imgRata = document.getElementById('raton');

            // Solo agregar si los elementos existen
            if (imgGato && imgPerro && imgRata) {
                containerFotos.appendChild(imgGato);
                containerFotos.appendChild(imgPerro);
                containerFotos.appendChild(imgRata);
            }

            // Reiniciar el arreglo si es necesario
            arreglo = ['', '', ''];
            mensaje.innerHTML = 'Arrastrá las imágenes a su espacio correspondiente.';
            containerFotos.classList.remove('hidden'); // Mostrar contenedor si estaba oculto
        }, 1000);
    }
}