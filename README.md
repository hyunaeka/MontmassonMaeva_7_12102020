# Lancer Le Projet GROUPAMANIA

## Lancer le BACKEND

```
Made with: MySQL , Sequelize, NodeJs, Express
```


## Pour la base de donnée

1 / Se connecter à MySQL ( Worchbench ou via l'invit de commande)

```
si vous utilisez l'invit de commande : mysql -h localhost -u root -p
```

2 / Ouvrir le dossier MontmassonMaeva_7_12102020 dans visual studio code et naviguer avec le terminal sur le dossier Backend 

```
cd backend 
```

3 / installer Sequelize ( Si sequelize est déjà mis en place, passer cette étape.) 

```
npm install --save sequelize

npm i mysql2
```

4 / Rendez-vous dans le dossier .env.example pour prendre connaissance du modéle.

5/ Créez un fichier .env et remplire celui-ci comme indiqué dans le fichier .env.example.

6/ Si tout va bien et que le dossier config.js est bien configuré, vous pouvez lancer la création de la base de donnée dans le terminal: 

```
sequelize db:create
```

si la base de donnée n'arrive pas à se créer, faites le manuellement depuis l'invite de commande de votre ordinateur : 

```
CREATE DATABASE NomDeVotreBaseDeDonnée
```

7 / Enfin on en voit le bout ! Il ne reste plus qu'à migrer le modèle Sequelize dans la base de donnée en effectuant cette commande :

```
sequelize db:migrate
```


La base de donnée est normalement opérationnelle et fonctionnelle !


## Pour démarrer le backend


1 / Installer nodemon à l'aide du terminal si cela n'est pas déjà fait : 

```
npm install -g nodemon 
```

2 / lancer nodemon : 

```
nodemon server.js (vérifiez que vous lancez bien la manipulation depuis le dossier backend) 
```

3 / Le serveur doit vous retourner une réponse similaire: 

```
[nodemon] 2.0.9
[nodemon] to restart at any time, enter `rs`
[nodemon] watching path(s): *.*
[nodemon] watching extensions: js,mjs,json  
[nodemon] starting `node server.js`
```

Et voilà le backend est lancé !


## Lancer le FRONTEND

1 / Ouvrez un second terminal dans Visual studio code 

2 / naviguez dans le dossier frontend : 

```
cd MontmassonMaeva_7_12102020
cd frontend
```

3 / Une fois le terminal au bon emplacement, lancez la commande suivante si vue/cli n'est pas installé sur votre machine: 

```
npm install -g @vue/cli
```
4 / Une fois l'installation compléte lancez la commande suivante pour démarrer le frontend : 

```
npm run serve
```

Vous devriez pouvoir ouvrir l'application depuis : 
```
  App running at:
  - Local:   http://localhost:8080/
  - Network: http://192.168.1.14:8080/
```

# Plan de test des fonctionnalités

```
Voici le plan de test des fonctionnalités de l'application 
```

## Se connecter ou créer un compte

### Désormais sur la page de l'application, switchez entre les boutons créer un compte et connexion pour vérifier le bon fonctionnement des éléments.

1 / Créez un compte en entrant les données demandez 

2 / Vous êtes automatiquement redirigé vers la page profile

3 / Déconnectez-vous depuis le profil en intéragissant avec le bouton déconnexion. 

4 / Vous vous retrouvez de nouveau sur la page d'accueil : il ne reste plus qu'à vous connecter.

( Il est conseillé de créer deux comptes différents pour la suite des tests )

## Créer du contenu et afficher le fil d'actualité

### Désormais connecté, dirigez vous grâce à la barre de navigation ou depuis Home , à la page : Créer une publication.

1 / Remplissez les champs ( avec ou sans média à ajouter dans un premier temps. ) 

2 / Envoyez en intéragissant avec le boutton de la page créer une publication. 

3 / Vous êtes redirigé via une page de validation ! Retournez donc sur le fil d'actualité pour admirer votre nouvelle publication.

4 / Réitéré l'expérience en créant cette fois-ci un contenu avec média ou sans selon votre premier choix. 


## Afficher une publication, la modifier ou la supprimer. 

### Vous avez désormais deux publications c'est le moment de tester les fonctionnalitées modifier ou supprimer. 

1 / Dirigez vous vers la publication de votre choix en cliquant sur son titre.

2 / Vu que votre identitée est confirmée, il vous ait possible d'intéragir avec la publication. Cliquez sur Supprimer.

3 / Si la publication est bien supprimée, vous serez redirigé vers une page de confirmation. Retournez ensuite au fil d'actualité. 

4 / Cliquez sur la publication restante. Modifiez là en ajoutant/modifiant le média ou encore le contenu.

5 / Intéagissez avec le bouton modifier. 

6 / Vous êtes de nouveau redirigé vers une page de confirmation ! Décidez de retourner au profile pour vous déconnecter. 

## Afficher une publication depuis un autre compte, commenter et naviguer.  

### Connexion et navigation avec un autre compte

1 / Connectez-vous au deuxième compte précédemment créé. 

2 / Retournez sur le fil d'actualité, et rendez-vous sur la publication modifiée. 

3 / Vu que vous n'êtes pas administrateur du post, la possibilitée de modifier et supprimer n'apparaît pas. 

4 / En revanche, il est possible de déposer un commentaire. Laissez libre cours à votre imagination. Créez-en 2. La page se rechargera à chaque fois. 

5 / Supprimez l'un des commentaires à l'aide de la petite crois en haut à droite du bloc. 

6 / Déconnectez-vous pour retourner sur le compte précédent. 

7 / Retournez sur votre publication pour vérifier que le commentaire apparaît toujours. Tentez de supprimer le commentaire : cela ne marchera pas. 

( Dans le futur, il sera possible de signaler les commentaires aux Administrateurs pour gérer la suppression. )

## Modifier le profile utilisateur et le supprimer

### Désormais vous pouvez retourner sur le profile pour tester les fonctionnalités. 

1 / Pour modifier votre profile, intéragissez avec l'icon à côté de modifier mes informations personnelles. 

2 / Modifiez votre bio ou votre pseudo. La page se rechargera.

3 / Dirigez-vous ensuite sur supprimer un compte qui va vous redirigé vers un message de validation avant de retourner sur l'accueil.

4 / Essayez de nouveau de vous connecter, il est impossible de trouver l'utilisateur. 














