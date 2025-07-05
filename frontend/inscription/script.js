const form = document.getElementById('registrationForm');
const message = document.getElementById('message');

form.addEventListener('submit', function(e) {
  e.preventDefault(); // Empêche l'envoi du formulaire

  // Récupère les valeurs
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const password = form.password.value;
  const confirmPassword = form.confirmPassword.value;

  // Vérifie que tous les champs sont remplis
  if (!name || !email || !password || !confirmPassword) {
    message.style.color = "red";
    message.textContent = "Veuillez remplir tous les champs.";
    return;
  }

  // Vérifie la longueur du mot de passe
  if (password.length < 6) {
    message.style.color = "red";
    message.textContent = "Le mot de passe doit contenir au moins 6 caractères.";
    return;
  }

  // Vérifie la correspondance des mots de passe
  if (password !== confirmPassword) {
    message.style.color = "red";
    message.textContent = "Les mots de passe ne correspondent pas.";
    return;
  }

  // Si tout est bon, on affiche un message puis on redirige
  message.style.color = "green";
  message.textContent = "Inscription réussie ! Redirection vers la connexion...";

  // Redirection vers login.html après 2 secondes
  setTimeout(() => {
    window.location.href = "../connexion/login.html";
  }, 2000);
});
