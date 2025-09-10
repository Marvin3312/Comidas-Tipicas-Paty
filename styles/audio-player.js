document.addEventListener('DOMContentLoaded', function() {
  const audioPlayer = document.getElementById('background-music');

  // Intento de reproducir el audio.
  const playPromise = audioPlayer.play();

  if (playPromise !== undefined) {
    playPromise.catch(error => {
      console.log('La reproducción automática fue bloqueada. Se requiere interacción del usuario.');
      // Fallback para reproducir en el primer clic si la reproducción automática falla.
      document.body.addEventListener('click', () => {
        audioPlayer.play();
      }, { once: true });
    });
  }
});