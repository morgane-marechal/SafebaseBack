#!/bin/bash

# Définir la date et l'heure pour le nom du fichier
TIMESTAMP=$(date +'%y_%d_%m_%H_%M')

# Nom du conteneur
CONTAINER_NAME_POSTGRES="safebaseback-postgres_database_prod-1"
# Commande de sauvegarde
docker exec -t $CONTAINER_NAME_POSTGRES pg_dump -U dev dev > "/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesPosteGres/postgres_save_$TIMESTAMP.sql"

docker exec -t safebaseback-postgres_database_version-1 pg_dump -U safebase safebase > "/home/morgane/projets/SafebaseBack/SaveListeVersions/safebase_save_$TIMESTAMP.sql"
