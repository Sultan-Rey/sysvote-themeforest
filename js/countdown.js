// Sélectionner les éléments HTML
const hoursSpan = document.getElementById("hours");
const minutesSpan = document.getElementById("minutes");
const secondsSpan = document.getElementById("seconds");
const countdownPill = document.getElementById("countdown");

// Définir la durée totale (12 heures en secondes)
let totalSeconds = 12 * 60 * 60; // 12 heures

function updateCountdown() {
  // Calculer les heures, minutes et secondes restantes
  const hours = Math.floor(totalSeconds / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = totalSeconds % 60;

  // Mettre à jour les éléments HTML
  hoursSpan.textContent = String(hours).padStart(2, "0");
  minutesSpan.textContent = String(minutes).padStart(2, "0");
  secondsSpan.textContent = String(seconds).padStart(2, "0");

  // Changer la couleur du pill 30 secondes avant la fin
  if (totalSeconds <= 30) {
    countdownPill.classList.add("red");
  } else {
    countdownPill.classList.remove("red");
  }

  // Si le temps est écoulé, recommencer à 12 heures
  if (totalSeconds === 0) {
    totalSeconds = 12 * 60 * 60;
  } else {
    totalSeconds--;
  }
}

// Mettre à jour le compte à rebours toutes les secondes
setInterval(updateCountdown, 1000);
