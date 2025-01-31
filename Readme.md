Système d'Arrosage Automatique - GIE
Description du Projet
Ce projet vise à améliorer le système d'arrosage d'une pépinière produisant des végétaux destinés à l'horticulture, l'agriculture, ou l'aménagement paysager. L'objectif est de mettre en place un système de contrôle de l'arrosage via une interface web permettant à l'utilisateur de gérer le système d'arrosage en temps réel.

Fonctionnalités Principales :
Connexion Utilisateur : L'utilisateur se connecte via une carte RFID ou un code.
Arrosage Manuel : L'utilisateur peut arroser directement les plantes via un bouton dans l'interface.
Arrosage Automatique : L'utilisateur peut programmer un arrosage automatique en fonction de plusieurs paramètres comme les heures d'arrosage, l'humidité du sol, et le volume d'eau.
Surveillance en Temps Réel : Affichage en temps réel de l'humidité du sol, de la luminosité, et de l'historique des arrosages.
Gestion des Utilisateurs : Le superAdmin peut gérer les utilisateurs avec des fonctionnalités CRUD (Créer, Lire, Mettre à jour, Supprimer).
Compétences Visées
Utilisation d'outils de travail collaboratif (Git, GitHub, Trello, etc.).
Gestion du projet avec la méthode Agile.
Création du mind map et des mockups du projet.
Câblage d'un circuit avec un microcontrôleur.
Développement frontend avec Angular.
Développement backend avec Node.js et Express.
Utilisation de microservices et d'API.
Gestion de la base de données (MongoDB).
Outils et Technologies Utilisés
Carte Raspberry Pi
Module Wi-Fi
Capteur d'humidité du sol (Soil Moisture Sensor)
Module relais
Pompe à eau
Photoresistor
Keypad pour la saisie des codes
RFID pour la gestion des utilisateurs
Base de données MongoDB
Frontend : Angular 18
Backend : Node.js avec Express
API : Création et gestion des API avec Express
Outils de développement : Git, GitHub, Visual Studio Code, Postman (pour tester les API)
Architecture du Projet
Le projet est composé de deux parties principales :

Frontend : Application web développée avec Angular 18 pour l'interface utilisateur.
Backend : API RESTful construite avec Node.js et Express pour gérer la logique du système et interagir avec la base de données MongoDB.
Fonctionnement :
Frontend : Angular 18 /L'utilisateur interagit avec l'application via un navigateur web. Il peut se connecter, voir les informations en temps réel, et interagir avec le système d'arrosage.
Backend : Node.js Express /L'API reçoit les demandes de l'utilisateur (comme démarrer l'arrosage, programmer un arrosage automatique) et les transmet au Raspberry Pi qui gère les capteurs et actionne les relais pour l'arrosage.
Base de donnee : MongoDB
Installation et Lancement
Prérequis :
Node.js (version 14.x ou supérieure)
Angular CLI (version 12.x ou supérieure)
MongoDB installé et en fonctionnement
1. Cloner le dépôt GitHub
git clone https://github.com/ton-utilisateur/arrosage-automatique.git
cd arrosage-automatique