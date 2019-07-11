var listaFotos = document.getElementById('fotos');
var back = document.getElementById('back');
var next = document.getElementById('next');
var siguientePagina;
var paginaAnterior;
var conjuntoPersonajes;
var arrayPersonajesCargados = [];

function clickImagenActual(event) {
  console.log(event.target.src);
  console.log(arrayPersonajesCargados);
  for (var j = 0; j < arrayPersonajesCargados.length; j++) {
    if (event.target.src === arrayPersonajesCargados[j].image) {
      console.log(arrayPersonajesCargados[j].name);
      console.log(arrayPersonajesCargados[j].species);
      console.log(arrayPersonajesCargados[j].name);
    }
  }
}

function crearElementos(grupoImagenes) {
  for (var i = 0; i < grupoImagenes.length; i++) {
    var listItem = document.createElement('div');
    var tagimagen = document.createElement('img');
    var dataCard = document.createElement('div');
    //DOS ALITERNATIVAS PARA CREAR CLASES
    //var imageClass = document.createAttribute('class');
    //imageClass.value = 'personajes';

    //Crear clase
    listItem.classList.add('contenedor');
    tagimagen.classList.add('personajes');
    dataCard.classList.add('datos');

    listItem.appendChild(tagimagen);
    listItem.appendChild(dataCard);
    //AQUI SE USO UNA FORMA DIFERENTE Y MAS PRACTICA DE UNNER HTML CON UNAS COMAS QUE ESTAN EN LA TECLA AL LADO DEL 1
    tagimagen.src = grupoImagenes[i].image;
    dataCard.innerHTML = `
      <h3>Name: ${grupoImagenes[i].name}</h3>
      <h3>Species: ${grupoImagenes[i].species}</h3>
      <h3>Type: ${grupoImagenes[i].type}</h3>
      <h3>Gender: ${grupoImagenes[i].gender}</h3>
      <h3>Origin: ${grupoImagenes[i].origin.name}</h3>
      <h3>Location: ${grupoImagenes[i].location.name}</h3>
      
    `;
    // grupoImagenes[i].name +
    // '     Status: ' +
    // grupoImagenes[i].status +
    // '     Species: ' +
    // grupoImagenes[i].spacies +
    // '     Type: ' +
    // grupoImagenes[i].type +
    // '     Gender: ' +
    // grupoImagenes[i].gender +
    // '     Origin: ' +
    // grupoImagenes[i].origin.name +
    // '     Location: ' +
    // grupoImagenes[i].location.name;
    //dataCard.innerText = grupoImagenes[i].name + " Status:" + grupoImagenes[i].status + "Species" + grupoImagenes[i].spacies +
    //"Type" + grupoImagenes[i].type + "Gender" +  grupoImagenes[i].gender + "Origin" + dataCard.innerText = grupoImagenes[i].origin.name
    //+ "Location:" + dataCard.innerText = grupoImagenes[i].location.name;

    listaFotos.appendChild(listItem);

    tagimagen.addEventListener('click', clickImagenActual);

    arrayPersonajesCargados.push(grupoImagenes[i]);
  }
}

//LLAMADO A LA PAGINA PRINCIPAL CON LOS PERSONAJES
fetch('https://rickandmortyapi.com/api/character/')
  .then(res => res.json())
  .then(function(resultadoApi) {
    console.log(resultadoApi);
    conjuntoPersonajes = resultadoApi.results;
    console.log(conjuntoPersonajes);
    siguientePagina = resultadoApi.info.next;
    crearElementos(conjuntoPersonajes);
  });

var listaPaginas = document.getElementsByClassName('paginas');

console.log(listaPaginas);

// LISTADO DE PAGINAS //
for (var i = 0; i < listaPaginas.length; i++) {
  listaPaginas[i].addEventListener('click', function(evento) {
    // listaFotos.parentNode.removeChild(listaFotos);

    fetch(
      'https://rickandmortyapi.com/api/character/?page=' +
        evento.target.innerText
    )
      .then(res => res.json())
      .then(function(resultadoApi) {
        console.log(resultadoApi);
        var conjuntoPersonajes = resultadoApi.results;
        console.log(conjuntoPersonajes);
        crearElementos(conjuntoPersonajes);
      });
  });
}
var tagimagen = document.cr;
/*next.addEventListener('click', function(event) {
  fetch('https://rickandmortyapi.com/api/character/?page=')
    .then(res => res.json())
    .then(function(resultadoApi) {
      console.log(resultadoApi);
      var conjuntoPersonajes = resultadoApi.info;
      console.log(conjuntoPersonajes);
      for (var i = 0; i < 20; i++) {
        var listItem = document.createElement('div');
        var tagimagen = document.createElement('img');

        listItem.appendChild(tagimagen);

        tagimagen.src = conjuntoPersonajes[i].image;

        listaFotos.appendChild(listItem);
      }
    });
});*/

//BOTON MAS PERSONAJES ///
next.addEventListener('click', function() {
  fetch(siguientePagina)
    .then(resp => resp.json())
    .then(function(resultadoPagina) {
      console.log(resultadoPagina);
      siguientePagina = resultadoPagina.info.next;
      paginaAnterior = resultadoPagina.info.prev;
      crearElementos(resultadoPagina.results);
    });
});

/*back.addEventListener('click', function() {
  fetch(paginaAnterior)
    .then((resp = resp.json()))
    .then(function(resultadoPagina) {
      siguientePagina = resultadoPagina.info.next;
      paginaAnterior = resultadoPagina.info.prev;
      crearElementos(resultadoPagina);
    });
});
*/
//INFORMACION DE LA IMAGEN//
