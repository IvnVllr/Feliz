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


function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
}

function drop(ev) {
    if (arreglo[parseInt(ev.target.id)] == '') {
        var data = ev.dataTransfer.getData('text');
        arreglo[parseInt(ev.target.id)] = data;
        ev.target.appendChild(document.getElementById(data));

        // Verificar si el div container-fotos está vacío
        const containerFotos = document.getElementById('container-fotos');
        if (containerFotos.children.length === 0) {
            containerFotos.classList.add('hidden');  // Agrega la clase hidden si está vacío
        }
    }

    if(arreglo[0]!='' && arreglo[1]!='' && arreglo[2]!=''){
        verificarCombinaciones();
    }
}


// Crear un objeto para almacenar las posiciones originales de las imágenes
const posicionesOriginales = {};

document.addEventListener('DOMContentLoaded', function() {

    // Guardar la posición original de las imágenes
    function guardarPosicionesOriginales() {
        const imagenes = document.querySelectorAll('#container-fotos img');
        imagenes.forEach(img => {
            posicionesOriginales[img.id] = img.parentElement.id;  // Guarda el id del div contenedor original
        });
    }

    // Llama a esta función cuando se cargue la página
    window.onload = guardarPosicionesOriginales;

})


// Nueva función para verificar las combinaciones
function verificarCombinaciones() {
    const box1 = document.getElementById('0');
    const box2 = document.getElementById('1');
    const box3 = document.getElementById('2');
    const mensaje = document.getElementById('textoTesInteligencia');

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

    // Verificar cada combinación
    for (const { combo, resultados, texto } of combinaciones) {
        if (arreglo[0] === combo[0] && arreglo[1] === combo[1] && arreglo[2] === combo[2]) {
            combinacionCorrecta = true;

            box1.classList.add(resultados[0]);
            box2.classList.add(resultados[1]);
            box3.classList.add(resultados[2]);

            mensaje.innerHTML = texto;
            break;
        }
    }

    // Si la combinación no es correcta, devolver las imágenes a su posición original
    if (!combinacionCorrecta) {
        arreglo.forEach((item, index) => {
            if (item !== '') {
                const img = document.getElementById(item);
                const divOriginal = document.getElementById(posicionesOriginales[item]);
                divOriginal.appendChild(img);  // Mover la imagen a su div original
                arreglo[index] = '';  // Limpiar el arreglo
            }
        });

        mensaje.innerHTML = 'Combinación incorrecta. Las imágenes han sido devueltas a su lugar original.';
    }
}

