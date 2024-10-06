// Sélectionner le formulaire et les champs de saisie
const form = document.getElementById("access-code-form");
const inputs = document.querySelectorAll(".code-input");

// Code d'accès valide
const validCode = "111111";

// Fonction pour valider le code d'accès
form.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêcher le comportement par défaut du formulaire

  // Récupérer la valeur du code entré
  let userCode = "";
  inputs.forEach(input => {
    userCode += input.value;
  });

  // Vérifier si le code est valide
  if (userCode === validCode) {
    // Rediriger l'utilisateur vers la page home.html si le code est correct
    window.location.href = "home.html";
  } else {
    // Si le code est incorrect, ajouter la classe 'error' aux inputs
    inputs.forEach(input => {
      input.classList.add("error");  // Ajoute une classe pour changer la bordure en rouge
      input.value = "";  // Efface le contenu de chaque champ
    });

    // Appliquer l'animation de vibration
    form.classList.add("shake");

    // Retirer l'animation et la classe rouge après un court délai
    setTimeout(() => {
      form.classList.remove("shake");
      inputs.forEach(input => {
        input.classList.remove("error");
      });
    }, 500);  // 500 ms d'animation
  }
});
