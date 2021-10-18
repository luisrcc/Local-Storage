//variables
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// event listeners
eventListeners();

function eventListeners(){
    //cuando el usuario agrega un nuevo twwet
    formulario.addEventListener('submit', agregarTweet);

    //cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', ()=>{
        tweets = JSON.parse(localStorage.getItem('tweets') || [])

        console.log(tweets);

        crearHTML()
    });
}

//funciones

function agregarTweet(e){
    e.preventDefault();

    //area de escritura
    const tweet = document.querySelector('#tweet').value;


    //validacion
    if(tweet === ''){
        mostrarError('El Mensaje No Puede Estar Vacio');

        return;//Evita que se ejecute codigo
    }

    const tweetObj = {
        id: Date.now(),
        tweet
    }
    //Añadir tweet
    tweets = [...tweets, tweetObj];

    //Agregando el tweet
    crearHTML();

    //reiniciar el formulario
    formulario.reset();
}

 //Mostrar mensaje de error
function mostrarError(error){
    const mensajeError = document.createElement('p');
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //insertarlo en el contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    //eliminar mensaje despues de 3 segundos
    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

function crearHTML(){

    limpiarHTML();

    if(tweets.length > 0){
        tweets.forEach( tweet =>{

            //agregar un boton de eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.innerText = 'X';

            //Añadir funcion de eliminar
            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }


            //crear HTML
            const li = document.createElement('li');

            //añadir el texto
            li.innerText = tweet.tweet;
            
            //Asignar el Bton
            li.appendChild(btnEliminar);

            //insertarlo en el html
            listaTweets.appendChild(li);

        });
    }
    sincronizarStorage();
}

//sincronizar en localStorage

function sincronizarStorage(){
    localStorage.setItem('tweets', JSON.stringify(tweets));
}
//elimina un tweet
function borrarTweet(id){
    tweets = tweets.filter( tweet => tweet.id !== id);
    
    crearHTML();
}

//limpiar HTML
function limpiarHTML(){
    while(listaTweets.firstChild){
        listaTweets.removeChild(listaTweets.firstChild);
    }
}