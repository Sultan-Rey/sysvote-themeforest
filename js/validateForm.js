// Sélectionner les formulaires et les champs de saisie
const voterForm = document.getElementById("access-code-form");
const adminForm = document.getElementById("admin-form");
const voterInputs = document.querySelectorAll(".code-input");
const validCode = "111111";
const validPwd = "password";
const validusername = "admin";

// Fonction pour masquer ou afficher les liens en fonction du rôle
function updateMenuVisibility(isAdmin) {
  // Stocker le rôle dans le localStorage pour pouvoir l'utiliser après redirection
  localStorage.setItem("userType", isAdmin ? "admin" : "voter");
}

// Fonction pour valider le code d'accès pour les électeurs
voterForm.addEventListener("submit", function (e) {
  e.preventDefault(); // Empêcher le comportement par défaut du formulaire

  // Récupérer la valeur du code entré
  let userCode = "";
  voterInputs.forEach(input => {
    userCode += input.value;
  });

  if (userCode === validCode) {
    updateMenuVisibility(false); // Enregistrer le rôle d'électeur
    window.location.href = "ballots.html"; // Redirection vers home.html
  } else {
    handleInvalidInput(voterInputs, voterForm);
  }
});

// Fonction pour gérer les erreurs d'entrée
function handleInvalidInput(inputs, form) {
  const allInputs = Array.isArray(inputs) ? inputs : Array.from(inputs);

  allInputs.forEach(input => {
    if (typeof input === 'string') return;
    input.classList.add("error");
    input.value = "";
  });

  // Appliquer l'animation de vibration
  form.classList.add("shake");

  setTimeout(() => {
    form.classList.remove("shake");
    allInputs.forEach(input => {
      if (typeof input !== 'string') {
        input.classList.remove("error");
      }
    });
  }, 500);
}

// Validation pour le formulaire admin
adminForm.addEventListener("submit", function (e) {
  e.preventDefault();

  const usernameInput = document.getElementById("username").value;
  const passwordInput = document.getElementById("pwd").value;

  if (usernameInput === validusername && passwordInput === validPwd) {
    updateMenuVisibility(true); // Enregistrer le rôle d'admin
    window.location.href = "home.html"; // Redirection vers home.html
  } else {
    handleInvalidInput([usernameInput, passwordInput], adminForm);
  }
});

// Gestion des animations pour le basculement des formulaires
$('.toggle-admin-form').click(function() {
  const loginContainer = $('#login-container');
  const adminLoginContainer = $('#admin-login-container');

  if (adminLoginContainer.is(':visible')) {
    adminLoginContainer.addClass('fall');
    setTimeout(() => {
      adminLoginContainer.hide();
      loginContainer.show();
      adminLoginContainer.removeClass('fall');
    }, 500);
  } else {
    loginContainer.addClass('fall');
    setTimeout(() => {
      loginContainer.hide();
      adminLoginContainer.show();
      loginContainer.removeClass('fall');
    }, 500);
  }
});


