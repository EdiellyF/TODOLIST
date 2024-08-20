function geraNovoSerial() {
    let valorSerial = parseInt(localStorage.getItem("serial") || "0");
    valorSerial++;
    localStorage.setItem("serial", valorSerial.toString());
    return valorSerial;
  }

function lidarComErros(message) {
      if(message === null || message === undefined){
        return; 
    }
    const div = document.getElementById('alert');
     div.classList.add('alert')
     div.classList.add('alert-danger')
   
     div.innerHTML = ` ${message}`

     setTimeout(function (){
        location.reload();
     }, 10000)
}

function typeWriter(elemento) {
  const textoArray = elemento.innerHTML.split('');
  elemento.innerHTML = '';
  textoArray.forEach((letra, i) => {
    setTimeout(() => elemento.innerHTML += letra, 75 * i);
  });
}



export {geraNovoSerial, lidarComErros, typeWriter}

