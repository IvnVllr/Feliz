
document.addEventListener('DOMContentLoaded', function() {
    let btnSi0 = document.getElementById('btn-si-0');
    let btnSi1 = document.getElementById('btn-si-1');
    let btnSi2 = document.getElementById('btn-si-2');
    let contenedorIncio0 = document.getElementById('inicio-0');
    let contenedorIncio1 = document.getElementById('inicio-1');
    let contenedorIncio2 = document.getElementById('inicio-2');

    // Función para avanzar a la siguiente pantalla
    function siguienteDiv() {
        if (!contenedorIncio0.classList.contains('hidden') && contenedorIncio1.classList.contains('hidden')) {
            contenedorIncio1.classList.remove('hidden');
            contenedorIncio0.classList.add('hidden');
        } else if (!contenedorIncio1.classList.contains('hidden') && contenedorIncio2.classList.contains('hidden')) {
            contenedorIncio2.classList.remove('hidden');
            contenedorIncio1.classList.add('hidden');
        } 
    }

    function SigueintePag() {
        window.location.href = "test_inteligencia.html";
        }

    // Vincular botones a la función de avanzar
    btnSi0.onclick = siguienteDiv;
    btnSi1.onclick = siguienteDiv;
    btnSi2.onclick = SigueintePag;
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
});

document.addEventListener('DOMContentLoaded', function() {

    var audioTension = document.getElementById('audio-tension');
    
  
    audioTension.volume = 0.04;
});
