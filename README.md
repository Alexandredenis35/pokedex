# pokedex

A l'arrivée sur le pokedex, 20 pokémons sont chargés automatiquement. Le bouton more permets d'afficher 20 pokémons supplémentaires.
On peut effectuer une recherche en selectionnant un des pokémons de la liste. Pour s'aider l'input permet de trouver plus facilement le pokémon souhaité.

En cliquant sur l'image du pokémon, on obtient des informations complémentaires sur celui-ci (ces attaques, son type, sa description...)

L'ensemble des requêtes sont effectuées grâce à un service. Pour minimiser le temps de chargement de la page, à l'initialisation seulement 20 pokémons sont chargés et à chaque clique sur le bouton more 20 autres sont ajoutés au tableau des pokémons.

Pour faire passer les données entre les composants, j'ai décidé de mettre en place des inputs afin de faire communiquer le composant fils avec le parent. Les changements sont donc automatiquement détectés et affichés sur l'écran de l'utilisateur.
