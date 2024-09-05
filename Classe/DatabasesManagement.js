//classe pour le management des bases de données
const Connect = require('./Connect');


class DatabasesManagement extends Connect {
    constructor() {
        super();
    }

    async  findDatabases(){
        try {
            await this.connect();
            const res = await this.client.query(`SELECT * FROM database_liste`);
            console.log(res.rows);
            await this.client.end();
            console.log(res.row);
            return res.rows;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }finally {
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
        }
    }

    async  findDatabaseById(id){
        try {
            await this.connect();
            const res = await this.client.query(`SELECT * FROM database_liste where id = '${id}'`);
            console.log(res.rows);
            await this.client.end();
            console.log(res.row);
            return res.rows;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }finally {
            await this.disconnect(); // Utiliser la méthode de déconnexion de la classe parente
        }
    }

}

module.exports = DatabasesManagement;