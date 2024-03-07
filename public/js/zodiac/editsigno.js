var db = firebase.apps[0].firestore();
var container = firebase.apps[0].storage().ref();

const urlParams = new URLSearchParams(window.location.search);
const signoId = urlParams.get('id');

// Recupera y muestra los datos del signo zodiacal
db.collection("datosZodiaco").doc(signoId).get().then(function(doc) {
  if (doc.exists) {
    const data = doc.data();
    
    // Construir el formulario HTML para editar los datos
    const formHTML = `
      <label for="posicion">Posición:</label>
      <input type="text" id="posicion" value="${data.posic}" readonly><br>

      <label for="signo">Signo:</label>
      <input type="text" id="signo" value="${data.signo}" required><br>

      <label for="rango">Rango:</label>
      <input type="text" id="rango" value="${data.rango}" required><br>

      <label for="elemento">Elemento:</label>
      <input type="text" id="elemento" value="${data.elemento}" required><br>

      <label for="astro">Astro Regente:</label>
      <input type="text" id="astro" value="${data.astro}" required><br>

      <label for="piedra">Piedra Preciosa:</label>
      <input type="text" id="piedra" value="${data.piedra}" required><br>

      <!-- Eliminamos el campo para "Arcano" -->

      <button id="guardarCambios">Guardar Cambios</button>
      <button id="cancelarEdicion">Cancelar</button>
    `;

    // Agregar el formulario al div editarForm
    editarForm.innerHTML = formHTML;

    // Agregar evento para el botón de guardar cambios
    document.querySelector('#guardarCambios').addEventListener('click', function() {
      // Obtener los valores de los campos
      const nuevoSigno = document.querySelector('#signo').value;
      const nuevoRango = document.querySelector('#rango').value;
      const nuevoElemento = document.querySelector('#elemento').value;
      const nuevoAstro = document.querySelector('#astro').value;
      const nuevaPiedra = document.querySelector('#piedra').value;

      // Validar que los campos no estén vacíos
      if (nuevoSigno !== '' && nuevoRango !== '' && nuevoElemento !== '' && nuevoAstro !== '' && nuevaPiedra !== '') {
        // Actualizar los datos en Firestore
        db.collection("datosZodiaco").doc(signoId).update({
          signo: nuevoSigno,
          rango: nuevoRango,
          elemento: nuevoElemento,
          astro: nuevoAstro,
          piedra: nuevaPiedra
        }).then(function() {
          alert('Cambios guardados correctamente.');
          // Redirigir a la página lista.html después de guardar
          window.location.href = 'lista.html';
        }).catch(function(error) {
          console.error('Error al guardar cambios: ', error);
        });
      } else {
        alert('Por favor, completa todos los campos.');
      }
    });

    // Agregar evento para el botón de cancelar edición
    document.querySelector('#cancelarEdicion').addEventListener('click', function() {
      // Redirigir a la página lista.html sin realizar cambios
      window.location.href = 'lista.html';
    });
  } else {
    console.log("No such document!");
  }
}).catch(function(error) {
  console.log("Error getting document:", error);
});
