// JavaScript Document
var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

// Selecciona los elementos del DOM correspondientes a los nuevos campos
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const txtElemento = document.querySelector('#txtElemento'); // Nuevo campo
const txtAstro = document.querySelector('#txtAstro'); // Nuevo campo
const txtPiedra = document.querySelector('#txtPiedra'); // Nuevo campo
const txtArchi = document.querySelector('#txtArchi');
const btnLoad  = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function(){
    const archivo = txtArchi.files[0];
    const nomarch = archivo.name;
    if(archivo == null){
        alert('Debe seleccionar una imagen');
    }else{
        const metadata = {
            contentType : archivo.type
        }
        const subir = container.child('zodiaco/'+nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                // Incluye los nuevos campos en el objeto que se añade a Firestore
                db.collection("datosZodiaco").add({
                    "posic": parseInt(txtPosic.value),
                    "signo": txtSigno.value,
                    "rango": txtRango.value,
                    "elemento": txtElemento.value, // Agrega el valor del nuevo campo
                    "astro": txtAstro.value, // Agrega el valor del nuevo campo
                    "piedra": txtPiedra.value, // Agrega el valor del nuevo campo
                    "url": url
                }).then(function(docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function(FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar(){
    txtPosic.value = '';
    txtSigno.value = '';
    txtRango.value = '';
    txtElemento.value = ''; // Limpia el nuevo campo
    txtAstro.value = ''; // Limpia el nuevo campo
    txtPiedra.value = ''; // Limpia el nuevo campo
    txtArchi.value = '';
    txtPosic.focus();
}
