# Utiliser une image de base Node.js
FROM node:16

# Définir le répertoire de travail
WORKDIR /usr/src/app/SafebaseBack

# Copier les fichiers de package
COPY package*.json ./

# Installer les dépendances
RUN npm install

# Copier le reste de l'application
COPY . .

# Exposer le port de l'application
EXPOSE 3001

# Commande pour démarrer l'application
CMD ["node", "index.js"]
