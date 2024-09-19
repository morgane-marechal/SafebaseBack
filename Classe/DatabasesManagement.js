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
            throw error; 
        }finally {
            await this.disconnect(); 
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

    async  insertNewDatabase(newDatabase) {
        try {
            await this.connect();
            const { user, password, host, port, type, name, container_name}  = newDatabase
            const query = `
                INSERT INTO database_liste ("user", password, host, port, type, name, container_name)
                VALUES ($1, $2, $3, $4, $5, $6, $7)
                RETURNING *;
            `;
            const values = [user, password, host, port, type, name, container_name];
            const res = await this.client.query(query, values);
            console.log('Reservation inserted:', res.rows[0]);
            return res.rows[0];
        } catch (error) {
            console.error('Error inserting this new database:', error);
            throw error;
        } finally {
            await this.disconnect(); 
        }
      }


      async  updateDatabase(id, newDatabase) {
        try {
            await this.connect();
            const { user, password, host, port, type, name, container_name}  = newDatabase
            const query = `
            UPDATE database_liste 
            SET "user" = $1, password = $2, host = $3, port = $4, type = $5, name = $6, container_name = $7
            WHERE id = $8
            RETURNING *;
            `;
            const values = [user, password, host, port, type, name, container_name, id];
            const res = await this.client.query(query, values);
            console.log('Reservation inserted:', res.rows[0]);
            return res.rows[0];
        } catch (error) {
            console.error('Error inserting this new database:', error);
            throw error;
        } finally {
            await this.disconnect(); 
        }
      }

      async deleteDatabase(idDatabase){
        try {
            await this.connect();
            const id = idDatabase
            const query = `
                DELETE FROM database_liste where id = $1;
            `;
            const values = [idDatabase];
            const res = await this.client.query(query, values);
            console.log('Database deleted', res.rows[0]);
            return res.rows[0];
        } catch (error) {
            console.error('Error deleting this Database:', error);
            throw error;
        } finally {
            await this.disconnect(); 
        }
    }


    async getTypeById(id){
        try {
            await this.connect();
            const res = await this.client.query(`SELECT * FROM database_liste where id = '${id}'`);
            if (res.rows.length > 0) {
                const type = res.rows[0].type;
                console.log(type); 
                return type;
            } else {
                console.log('No record found with the provided ID.');
                return null; 
            }
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; 
        }finally {
            await this.disconnect(); 
        }     
    }

}

module.exports = DatabasesManagement;