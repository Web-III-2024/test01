let timer = setTimeout(salir, 180000);

document.addEventListener('mousemove', resetTimer);
document.addEventListener('keypress', resetTimer);

function resetTimer() {
    clearTimeout(timer);
    timer = setTimeout(salir, 180000);
}

function salir() {
    firebase.auth().signOut().then(() => {
        console.log('Sesión cerrada por inactividad');
        window.location.href = 'login.html';
    }).catch((error) => {
        console.error('Error al cerrar sesión', error);
    });
}
