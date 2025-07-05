document.addEventListener('DOMContentLoaded', function () {
  const form = document.getElementById('loginForm');
  const message = document.getElementById('loginMessage');

  form.addEventListener('submit', function (e) {
    e.preventDefault();

    const email = form.email.value.trim();
    const password = form.password.value.trim();

    // Vérifie que les deux champs sont remplis
    if (!email || !password) {
      message.textContent = "Veuillez remplir tous les champs.";
      message.style.color = "red";
      return;
    }

    // Si les champs sont remplis, redirection vers le tableau de bord
    message.style.color = "green";
    message.textContent = "Connexion en cours...";
    
    setTimeout(() => {
      window.location.href = "../dashbord/dashbord.html";
    }, 1500);
  });
});
