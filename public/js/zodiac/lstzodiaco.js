var db = firebase.apps[0].firestore();

const tabla = document.querySelector('#tabla');

db.collection("datosZodiaco").orderBy('posic', 'asc').get().then(function(query){
    tabla.innerHTML = "";
    var salida = "";
    query.forEach(function(doc){
        salida += '<div class="divAnuncio m-3">';
        salida += '<div class="imgBlock"><img src="' + doc.data().url + '" width="100%" /></div>';
        salida += '<div>';
        salida += '<strong>Signo:</strong> ' + doc.data().signo + '<br/>';
        salida += '<strong>Rango:</strong> ' + doc.data().rango + '<br/>';
        salida += '<strong>Posición:</strong> ' + doc.data().posic + '<br/>';
        salida += '<strong>Piedra:</strong> ' + doc.data().piedra + '<br/>';
        salida += '<strong>Astro:</strong> ' + doc.data().astro + '<br/>';
        salida += '<strong>Elemento:</strong> ' + doc.data().elemento;
        salida += '</div><br/>';
        salida += '<button class="btn btn-primary" onclick="editarSigno(\'' + doc.id + '\')">Editar</button>';
        salida += '</div>';
    });
    tabla.innerHTML = salida;
});
