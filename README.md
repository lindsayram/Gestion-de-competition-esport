# Contexte

Construire l'architecture backend d'une application dédiée à la gestion de
compétitions e-sport, un domaine en pleine expansion.

Cette plateforme permettra à des joueurs passionnés de s'inscrire, de créer ou de rejoindre des
équipes, et de participer à des tournois organisés autour de jeux vidéo populaires.
Les organisateurs pourront quant à eux publier des événements compétitifs, définir les règles des
tournois et gérer les inscriptions des équipes.

Enfin, les administrateurs du système auront une vue d'ensemble sur les utilisateurs, les compétitions
et les performances globales de la plateforme, leur permettant d'assurer le bon fonctionnement de
l'application, de modérer les contenus et d'analyser les statistiques de participation.

Le système devra donc gérer plusieurs rôles avec des droits différenciés, garantir l'intégrité des
données échangées, et permettre des opérations fiables sur les équipes, les utilisateurs et les
tournois.

# Fonctionnalités
- Gestion des utilisateurs (inscription, connexion, authentification JWT)
- Gestion des rôles et des permissions (autorisation par middleware)
- Gestion des inscriptions, de la création, des modifications et de la suppression des tournois
- Gestion des inscriptions, de la création, des modifications et de la suppression des équipes
- Validation des données entrantes

# Technologies utilisées
- **Node.js** : environnement d'execution
- **Express**: framework backend
- **MongoDB** / **Mongoose**: base de données et librairie
- **JWT** : authentification via token

# Prérequis
- Node.js (v18 ou supérieur recommandé)
- npm
- MongoDB 

# Initialiser le projet
## Lancement du projet
```bash
git clone https://github.com/lindsayram/Gestion-de-competition-esport.git
```

## Configuration
Créer un fichier `.env` à la racine du projet :

```env
MONGODB_URI=mongodb://...
JWT_SECRET=ton_secret_jwt
```

Création d'un fichier json pour pouvoir déplacer les dépendances sur un autre ordinateur
```bash
npm init -y
```

## Installer Express
```bash
npm install express
```

## Installation des packages
Les différents packages à installer:
- validator
- bcryptjs
- jsonwebtoken
- mongoose
- cors
- dotenv
- express-rate-limit
- helmet
- -g nodemon

Précédé de la commande **npm i**

## Lancer le serveur
```bash
node app.js #ou
nodemon app.js
```

# Auteur
**Lindsay** [@lindsayram] https://github.com/lindsayram