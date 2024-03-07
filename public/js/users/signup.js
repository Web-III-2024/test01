// JavaScript Document
// create local database firestore variable
var db = firebase.apps[0].firestore();
var auth = firebase.apps[0].auth();

// create local from webpage inputs
const txtNombre = document.querySelector("#txtNombre");
const txtEmail = document.querySelector("#txtEmail");
const txtContra = document.querySelector("#txtContra");

// create local insert button
const btnInsUser = document.querySelector("#btnInsUser");

// assign button listener
btnInsUser.addEventListener("click", function () {
  auth
    .createUserWithEmailAndPassword(txtEmail.value, txtContra.value)
    .then((userCredential) => {
      // Usuario ha sido creado, ahora agregamos a Firestore
      const user = userCredential.user;
      const fechaActual = firebase.firestore.Timestamp.fromDate(new Date()); // Esto crea un timestamp de Firestore
      
      db.collection("datosUsuarios")
        .doc(user.uid) // Usar el UID como clave del documento para un fácil acceso
        .set({
          usuario: txtNombre.value,
          email: user.email,
          fechaCreacion: fechaActual,
          ultimoAcceso: fechaActual,
        })
        .then(() => {
          alert("Usuario agregado satisfactoriamente en Firestore");
          limpiar();
        })
        .catch((FirebaseError) => {
          alert("Error al registrar datos del usuario en Firestore." + FirebaseError);
        });
    })
    .catch((error) => {
      alert("Error al crear el usuario en Authentication: " + error.message);
    });
});

function limpiar() {
  txtNombre.value = "";
  txtEmail.value = "";
  txtContra.value = "";
  txtNombre.focus();
}
