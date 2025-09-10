document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = document.createElement('audio');
  // Usando una ruta relativa desde el archivo HTML al recurso
  audioPlayer.src = 'assets/music/Marimba Maderas Chapinas - El Rey Quiche - Difosa Music.mp3';
  audioPlayer.loop = true;
  audioPlayer.autoplay = true;
  audioPlayer.controls = false; // No mostrar los controles del reproductor
  document.body.appendChild(audioPlayer);

  // Intento de reproducir el audio.
  // Los navegadores modernos a menudo bloquean la reproducción automática hasta que el usuario interactúa con la página.
  const playPromise = audioPlayer.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('La reproducción automática fue bloqueada por el navegador. Se necesita una interacción del usuario para iniciar el audio.');
      // Agrega un detector de eventos de un solo uso para reproducir el audio en el primer clic del usuario.
      document.body.addEventListener('click', () => {
        audioPlayer.play();
      }, { once: true });
    });
  }
});
