#!/bin/bash

# Définir la date et l'heure pour le nom du fichier
TIMESTAMP=$(date +'%y_%d_%m_%H_%M')

docker exec -i safebaseback-mysql_database_prod-1 mysqldump -u prod -p'pass' prod > /home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesSQL/savebase_mysql_$TIMESTAMP.sql