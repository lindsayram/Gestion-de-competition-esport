# Contexte

Vous êtes missionné(e) pour construire l'architecture backend d'une application dédiée à la gestion de
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

# Lancement du projet
## Initialiser le projet
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

Précédé de la commande **npm i**