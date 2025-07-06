# *Projet de Location de Véhicules*  

## *📌 Description*  
Ce projet est une API RESTful de gestion de location de véhicules, développée avec :  
- *Backend* : Node.js + Express + MySQL  
- *Tests* : Vitest (unitaires/intégration) + Supertest (E2E)  
- *Interfaces* : Tests Playwright (UI)  

---

## *🚀 Installation & Lancement*  

### *1. Prérequis*  
- Node.js (v18+)  
- MySQL (v8+)  
- Git  

### *2. Configuration*  
1. *Cloner le dépôt*  
   sh
   git clone https://github.com/sorelled/tp34-vehicule_api.gitt
   cd tp34-vehicule_api
   

2. *Installer les dépendances*  
   sh
   npm install
   

3. *Configurer la base de données*  
   - Créer une base MySQL et importer le schéma (database/schema.sql)  
   - Configurer les variables d'environnement (.env) :  
     env
     DB_HOST=localhost
     DB_USER=root
     DB_PASSWORD=votre_mot_de_passe
     DB_NAME=location_vehicules
     JWT_SECRET=votre_secret_jwt
     

4. *Lancer l'API*  
   sh
   npm start
   
   *(L'API sera disponible sur http://localhost:3000)*  

---

## *🧪 Tests*  

### *1. Tests Unitaires (Vitest)*  
sh
npm run test:unit

*Couverture* :  
- Modèles (Vehicle, User)  
- Utilitaires (validation, JWT)  

### *2. Tests d'Intégration (Supertest)*  
sh
npm run test:integration

*Couverture* :  
- Routes API (/api/vehicles, /api/users)  
- Interaction avec la base de données  

### *3. Tests End-to-End (Playwright)*  
sh
npm run test:e2e

*Couverture* :  
- Flux utilisateur (inscription → connexion → location)  
- UI (Playwright vérifie les pages et interactions)  

---

## *📋 Plan de Test*  

### *🔹 Tests Unitaires*  
| *Module*       | *Cas testés*                          | *Statut* |
|------------------|----------------------------------------|------------|
| Vehicle        | Création, lecture, mise à jour, suppression | ✅         |
| User           | Inscription, connexion, token JWT      | ✅         |
| AuthMiddleware | Vérification token, accès sécurisé     | ✅         |

### *🔹 Tests d'Intégration*  
| *Endpoint*       | *Scénario*                          | *Statut* |
|--------------------|--------------------------------------|------------|
| POST /vehicles   | Création véhicule (succès/erreur)    | ✅         |
| GET /vehicles    | Récupération liste véhicules         | ✅         |
| PUT /vehicles/:id| Mise à jour véhicule                 | ✅         |
| POST /users/login| Connexion utilisateur valide/invalide| ✅         |

### *🔹 Tests E2E (Playwright)*  
| *Scénario*                     | *Statut* |
|----------------------------------|------------|
| Inscription → Connexion → Location | ✅         |
| Gestion véhicules (admin)        | ✅         |
| Recherche véhicules (filtres)    | ✅         |

---

## *📊 Rapport de Test*  
- *Générer un rapport de couverture* :  
  sh
  npm run test:coverage
  
- *Rapports Playwright* :  
  sh
  npx playwright show-report
  

---

## *🔧 Déploiement*  
- *En production* : Utiliser PM2 + Nginx  
  sh
  npm install -g pm2
  pm2 start server.js --name "location-api"
  

---
