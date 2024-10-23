
document.addEventListener('DOMContentLoaded', function() {

    const texto = document.querySelector('.tituloFelizdia');

    const cargaTexto = () =>{
        setTimeout(()=>{
            texto.textContent = 'Feliz día mamá. ❤️.';
        }, 0);
        setTimeout(()=>{
            texto.textContent = 'Te amo mucho 💕.';
        }, 4000);
        setTimeout(()=>{
            texto.textContent = 'Gracias por ser mi mamá 💋.';
        }, 8000);
    
    }
    
    cargaTexto();
    setInterval(cargaTexto,12000);

})

document.addEventListener('DOMContentLoaded', function() {

    var audioElement = document.getElementById('audio');
    
  
    audioElement.volume = 0.04;
});
