🌿 Projet Système d'Arrosage Connecté

📌 Description du Projet

Un Groupement d'Intérêt Économique (GIE) souhaite améliorer son système d’arrosage pour sa pépinière. Cette pépinière produit des végétaux destinés à l'horticulture, l'agriculture et l'aménagement paysager.

L'objectif est de développer un système permettant aux utilisateurs de se connecter via une interface web et de contrôler l'arrosage des plantes.

🎯 Fonctionnalités Principales

Connexion utilisateur via carte RFID ou code keypad

Arrosage manuel via un bouton sur l’interface

Programmation de l’arrosage automatique selon :

Les heures d’arrosage

L’humidité du sol

Le volume d’eau nécessaire

Visualisation en temps réel :

Humidité du sol

Luminosité

Historique des actions

Gestion des utilisateurs (CRUD) pour le superAdmin

🛠️ Technologies Utilisées

📌 Matériels

Raspberry Pi

Module Wi-Fi

Capteur d’humidité du sol (Soil Moisture Sensor)

Module relais

Pompe à eau

Photoresistor

Keypad

Module RFID

Connexion Internet (Wi-Fi ou Ethernet)

📌 Logiciels & Langages

Frontend : Angular 18

Backend : Node.js + Express.js

Base de données : MongoDB

Protocole de communication : MQTT / WebSockets

Système embarqué : Python sur Raspberry Pi

🏗️ Architecture du Projet

Interface Web (Angular) : Gestion de l’authentification et de l’arrosage

Serveur Backend (Node.js + Express) : API REST et gestion des utilisateurs

Base de données (MongoDB) : Stockage des utilisateurs, paramètres d’arrosage et historiques

Raspberry Pi : Lecture des capteurs, activation de la pompe à eau, communication avec le serveur

📌 Compétences Visées

Utilisation des outils de travail collaboratif (GitHub, Trello)

Gestion de projet en méthodologie Agile

Conception de maquettes et mind maps

Câblage d’un circuit avec un microcontrôleur

Développement frontend et backend

Utilisation des API et microservices

📦 Livrables

✅ Mindmap de l’application

✅ Maquette de l’interface utilisateur

✅ Tableau Trello avec les tâches du projet

✅ Circuit correctement câblé et fonctionnel

✅ Code source sur GitHub/GitLab/Bitbucket

✅ Documentation du projet

✅ Présentation PowerPoint

📅 Délai

⏳ Le projet doit être livré sous 7 jours à compter de la date de démarrage.

🚀 Installation & Exécution

📌 1. Cloner le projet

 git clone https://github.com/nom_du_depot.git
 cd projet-arrosage

📌 2. Installation des dépendances

Backend (Node.js)

 cd SunuPointage_back
 npm install
 node server.js

Frontend (Angular)

 cd SunuPointages
 npm install
 ng serve --open

📌 3. Exécution sur Raspberry Pi

 python3 script_arrosage.py

👥 Équipe & Collaboration

Gestion de projet : Trello

Code source : GitHub/GitLab

Abdou Etienne Ba /
Fatoumata Hawa Ndiongue /
Fatou Bintou Sane /
Fatou Dieye

