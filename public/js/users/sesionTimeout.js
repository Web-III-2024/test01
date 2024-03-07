// let inactividad;
// const umbralMovimientoMouse = 5;

// function iniciarTemporizadorInactividad() {
//   document.addEventListener('mousemove', manejarMovimientoMouse);
//   document.addEventListener('keydown', reiniciarTemporizadorInactividad);
// }

// function reiniciarTemporizadorInactividad() {
//   clearTimeout(inactividad);
//   inactividad = setTimeout(cerrarSesion, 180000);
// }

// function manejarMovimientoMouse(evento) {
//   if (Math.abs(evento.movementX) > umbralMovimientoMouse || Math.abs(evento.movementY) > umbralMovimientoMouse) {
//     reiniciarTemporizadorInactividad();
//     document.removeEventListener('mousemove', manejarMovimientoMouse);
//     document.removeEventListener('keydown', reiniciarTemporizadorInactividad);
//   }
// }

// function cerrarSesion() {
//   firebase.auth().signOut().then(function() {
//     alert('Sesión cerrada debido a inactividad');
//     window.location.href = 'login.html'; 
//   }).catch(function(error) {
//     console.error('Error al cerrar sesión:', error);
//   });
// }

// document.addEventListener('mousemove', iniciarTemporizadorInactividad);

// window.addEventListener('beforeunload', cerrarSesion);
