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

    async importPostGres() {
        const CONTAINER_NAME = "safebaseback-postgres_database_prod-1";
        const TIMESTAMP = new Date().toISOString().replace(/T/, '_').replace(/:/g, '-').split('.')[0];
        const command = `docker exec -t ${CONTAINER_NAME} pg_dump -U dev dev > "/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesPosteGres/savebase_postgres_${TIMESTAMP}.sql"`;
        try {
            const output = await this.runCommand(command);
            console.log(`Backup successful: ${output}`);
        } catch (error) {
            console.error(`Backup failed: ${error}`);
        }
    }
}

module.exports = CommandExecutor;
