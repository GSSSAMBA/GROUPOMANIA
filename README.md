# GROUPOMANIA


Bienvenue sur Groupomania !

Le projet Groupomania a été réalisé dans le cadre de la formation OpenClassRoom "parcours développeur web".

Vous trouverez la mission du projet dans ce document pdf : https://course.oc-static.com/projects/DWJ_FR_P7/DW+P7+28-09-2022+Sce%CC%81nario.pdf

Quant au cahier des charge, vous le trouverez dans cet autre pdf : https://course.oc-static.com/projects/DWJ_FR_P7/Cahier+des+charges+Groupomania.pdf
Pour ce  projet , nous avions à réaliser un réseau social interne pour les employés de la société Groupomania (côté back et côté front).

Technologies utilisées :
NodeJs, React, Express, MongoDB, Sass.

Dépendences installées :
Backend :
Bcrypt, cookie-parser, cors, dotenv, express, jsonwebtoken, mongoose, multer, nodemon et validator.

Frontend :
Axios, dotenv, js-cookie, node-sass, react, react-dom, react-redux, react-router-dom, react-scripts, redux, redux-devtools-extension, redux-thunk et web-vitals.

Installation :
Clonez le projet puis ouvrez un premier terminal pour le backend :

Dans le repertoire Groupomania, entrez la ligne :

npm install

pour installer toutes les dépendences du back, puis

nodemon server

pour executer le serveur (qui sera sur le port 5000)

Gardez ce terminal ouvert.

A présent ourez un second terminal pour le frontend : Dans le repertoire Groupomania, entrez la ligne :

cd client

pour vous placer dans le repertoire du frontend, puis

npm install

pour installer toutes les dépendences du front, et enfin

npm start

pour executer l'application (qui sera sur le port 3000)

Gardez ce terminal ouvert.

Les modèles de mes deux fichiers .env sont disponibles, il vous faudra y entrer votre propre clé token et vos coordonées MongoDB pour le .env du back et le nom du rôle admin que vous aurez choisi pour le .env du front (et renommer ces deux fichiers .env.example par .env)

Tout est bon !
Vous pouvez dès à présent vous rendre à l'adresse "http://localhost:3000" pour vous créer un compte Groupomania, créer des posts et les modifier !

