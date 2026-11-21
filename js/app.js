const song = document.getElementById("ourSong");
const playSong = document.getElementById("playSong");
const musicToggle = document.getElementById("musicToggle");
const musicLabel = document.getElementById("musicLabel");
const video = document.getElementById("myVideo");
const videoPlaceholder = document.getElementById("videoPlaceholder");
const openLetter = document.getElementById("openLetter");
const closeLetter = document.getElementById("closeLetter");
const letterPaper = document.getElementById("letterPaper");

function setMusicState(playing) {
  musicToggle.setAttribute("aria-pressed", String(playing));
  musicLabel.textContent = playing ? "Pausar nuestra canción" : "Escuchar nuestra canción";
  playSong.innerHTML = playing ? "Ⅱ <span>Pausar canción</span>" : "▶ <span>Reproducir canción</span>";
}
async function toggleMusic() {
  if (!song) return;
  if (song.paused) {
    try { await song.play(); }
    catch (error) {
      alert("Primero añade el archivo de audio en assets/musica/amor-del-bueno.mp3. Si aún no lo tienes, puedes dejar este reproductor preparado.");
    }
  } else song.pause();
}
playSong.addEventListener("click", toggleMusic);
musicToggle.addEventListener("click", toggleMusic);
song.addEventListener("play", () => setMusicState(true));
song.addEventListener("pause", () => setMusicState(false));
song.addEventListener("ended", () => setMusicState(false));

function openTheLetter() {
  letterPaper.classList.add("is-open");
  letterPaper.setAttribute("aria-hidden", "false");
  openLetter.textContent = "La carta está abierta";
  openLetter.disabled = true;
  letterPaper.scrollIntoView({ behavior: "smooth", block: "center" });
}
function closeTheLetter() {
  letterPaper.classList.remove("is-open");
  letterPaper.setAttribute("aria-hidden", "true");
  openLetter.textContent = "Abrir la carta ↗";
  openLetter.disabled = false;
}
openLetter.addEventListener("click", openTheLetter);
closeLetter.addEventListener("click", closeTheLetter);

video.addEventListener("loadedmetadata", () => { videoPlaceholder.hidden = true; });
video.addEventListener("play", () => { videoPlaceholder.hidden = true; });
video.addEventListener("error", () => { videoPlaceholder.hidden = false; });

const revealItems = document.querySelectorAll(".reveal");
if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });
  revealItems.forEach(item => observer.observe(item));
} else {
  revealItems.forEach(item => item.classList.add("visible"));
}
