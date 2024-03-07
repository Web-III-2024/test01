var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

// Selecciona los elementos del DOM correspondientes a los nuevos campos
const txtPosic = document.querySelector('#txtPosic');
const txtSigno = document.querySelector('#txtSigno');
const txtRango = document.querySelector('#txtRango');
const selElemento = document.querySelector('#selElemento');
const selAstro = document.querySelector('#selAstro');
const selPiedra = document.querySelector('#selPiedra');
const txtArchi = document.querySelector('#txtArchi');
const btnLoad = document.querySelector('#btnLoad');

btnLoad.addEventListener('click', function () {
    const archivo = txtArchi.files[0];
    const nomarch = archivo ? archivo.name : null;

    // Verificar si se ha seleccionado la opción "Seleccionar" o si falta la imagen
    if (!archivo || !txtPosic.value || !txtSigno.value || !txtRango.value || selElemento.value === "" || selAstro.value === "" || selPiedra.value === "") {
        alert('Por favor, completa todos los campos y sube una imagen antes de cargar.');
    } else {
        const metadata = {
            contentType: archivo.type
        }
        const subir = container.child('zodiaco/' + nomarch).put(archivo, metadata);
        subir
            .then(snapshot => snapshot.ref.getDownloadURL())
            .then(url => {
                // Incluye los nuevos campos en el objeto que se añade a Firestore
                db.collection("datosZodiaco").add({
                    "posic": parseInt(txtPosic.value),
                    "signo": txtSigno.value,
                    "rango": txtRango.value,
                    "elemento": selElemento.options[selElemento.selectedIndex].value,
                    "astro": selAstro.options[selAstro.selectedIndex].value,
                    "piedra": selPiedra.options[selPiedra.selectedIndex].value,
                    "url": url
                }).then(function (docRef) {
                    alert("ID del registro: " + docRef.id);
                    limpiar();
                }).catch(function (FirebaseError) {
                    alert("Error al subir la imagen: " + FirebaseError);
                });
            });
    }
});

function limpiar() {
    txtPosic.value = '';
    txtSigno.value = '';
    txtRango.value = '';
    selElemento.value = ''; // Limpia el nuevo campo (lista desplegable)
    selAstro.value = ''; // Limpia el nuevo campo (lista desplegable)
    selPiedra.value = ''; // Limpia el nuevo campo (lista desplegable)
    txtArchi.value = '';
    txtPosic.focus();
}
