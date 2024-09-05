const { exec } = require('child_process');

class CommandExecutor {
    constructor() {
        // Vous pouvez initialiser des propriétés ici si nécessaire
    }

    runCommand(command) {
        return new Promise((resolve, reject) => {
            exec(command, (error, stdout, stderr) => {
                if (error) {
                    reject(`Error executing command: ${error.message}`);
                    return;
                }
                if (stderr) {
                    reject(`Command stderr: ${stderr}`);
                    return;
                }
                resolve(stdout);
            });
        });
    }


    getFormattedTimestamp() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(2); // Deux derniers chiffres de l'année
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Mois avec un zéro devant si nécessaire
        const day = String(date.getDate()).padStart(2, '0'); // Jour avec un zéro devant si nécessaire
        const hours = String(date.getHours()).padStart(2, '0'); // Heures avec un zéro devant si nécessaire
        const minutes = String(date.getMinutes()).padStart(2, '0'); // Minutes avec un zéro devant si nécessaire
        return `${year}_${day}_${month}_${hours}_${minutes}`;
    }

    async importPostGres() {
        const CONTAINER_NAME = "safebaseback-postgres_database_dev-1";
        const TIMESTAMP = this.getFormattedTimestamp();
        const command = `docker exec -t ${CONTAINER_NAME} pg_dump --clean -U dev dev > "/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesPosteGres/savebase_postgres_${TIMESTAMP}.sql"`;
        try {
            const output = await this.runCommand(command);
            console.log(`Backup successful: ${output}`);
        } catch (error) {
            console.error(`Backup failed: ${error}`);
        }
    }
}

module.exports = CommandExecutor;
