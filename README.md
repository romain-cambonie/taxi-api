# Taxi Gestion Api

> Ce dépot est obsolète. Le projet Taxi Gestion est hébergé sur son [organisation dédiée](https://github.com/taxi-gestion)

Outil de gestion à destination des flottes de taxi, particulièrement des vsl (véhicules sanitaires légers).

> Ce dépot est responsable de la partie applicative serveur.

## Table des matières

- 🪧 [À propos](#à-propos)
- 📦 [Prérequis](#prérequis)
- 🚀 [Installation](#installation)
- 🛠️ [Utilisation](#utilisation)
- 🤝 [Contribution](#contribution)

## Prérequis

- [Git](https://git-scm.com/) : Système de contrôle de versions distribué d'un ensemble de fichiers
- [Node](https://nodejs.org/) : Environnement d'exécution pour Javascript

> Node peut être installé via [nvm](https://github.com/nvm-sh/nvm) qui permet d'obtenir et d'utiliser rapidement différentes versions de Node via la ligne de commande.

## Installation

### Mise en place des sources

Cloner le projet

## Utilisation

Ces commandes servent dans un contexte de développement de l'application et doivent être exécutées depuis la racine de l'espace de travail.

### Mise en place des prérequis

```bash
npm install
```

#### Lancer le serveur

```bash
npm run build
npm run start-local
```

### Développement local

Les commandes communes de développement se trouvent dans le champ scripts du package.json
L'api se repose sur un service de base de données postgresql qui peut être monté en local sur docker, voir [Taxi-DB](https://github.com/romain-cambonie/taxi-db)

### Contribution

Le projet n'est actuellement pas ouvert à la contribution
