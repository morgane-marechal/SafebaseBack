const { exec } = require('child_process');

class CommandExecutor {
    constructor() {
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
        const year = date.getFullYear().toString().slice(2); 
        const month = String(date.getMonth() + 1).padStart(2, '0'); 
        const day = String(date.getDate()).padStart(2, '0'); 
        const hours = String(date.getHours()).padStart(2, '0'); 
        const minutes = String(date.getMinutes()).padStart(2, '0'); 
        return `${year}_${day}_${month}_${hours}_${minutes}`;
    }

    //mettre user, name et container_name en variables
    async importPostGres() {
        const CONTAINER_NAME = "safebaseback-postgres_database_dev-1";
        const TIMESTAMP = this.getFormattedTimestamp();
        const command = `docker exec -t ${CONTAINER_NAME} pg_dump --clean --if-exists -U dev dev > "/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesPosteGres/savebase_postgres_${TIMESTAMP}.sql"`;
        try {
            const output = await this.runCommand(command);
            console.log(`Backup successful: ${output}`);
        } catch (error) {
            console.error(`Backup failed: ${error}`);
        }
    }

    //mettre user, name, pass et container_name en variables
    async importMySql() {
        const CONTAINER_NAME = "safebaseback-mysql_database_prod-1";
        const TIMESTAMP = this.getFormattedTimestamp();
        const command = `docker  exec -i ${CONTAINER_NAME} mysqldump --clean -u prod -p'pass' prod > "/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesSQL/savebase_mysql_${TIMESTAMP}.sql"`;
        // const command = `docker exec -t ${CONTAINER_NAME} pg_dump --clean -U dev dev > "/home/morgane/projets/SafebaseBack/Sauvegardes/SauvegardesPosteGres/savebase_postgres_${TIMESTAMP}.sql"`;
        try {
            const output = await this.runCommand(command);
            console.log(`Backup successful: ${output}`);
        } catch (error) {
            console.error(`Backup failed: ${error}`);
        }
    }

    async deleteFile(path){
        const command = `rm ${path}`;
        try {
            const output = await this.runCommand(command);
            console.log(`Fichier supprimé avec succès: ${output}`);
        } catch (error) {
            console.error(`Echec de la suppression: ${error}`);
        }
    }


    async restorePostgres(path){
        const CONTAINER_NAME = "safebaseback-postgres_database_dev-1";
        const PATH_FILE_NAME = path
        const command = `docker exec -i ${CONTAINER_NAME} psql -U dev -d dev < ${PATH_FILE_NAME}`;
        try {
            const output = await this.runCommand(command);
            console.log(`Restore Backup successful: ${output}`);
        } catch (error) {
            console.error(`Backup failed: ${error}`);
        }

    }

    async restoreMysql(){

    }
}

module.exports = CommandExecutor;
