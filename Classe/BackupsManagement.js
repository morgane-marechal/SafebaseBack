//classe pour le management des bases de données
const Connect = require('./Connect');


class BackupsManagement extends Connect {
    constructor() {
        super();
    }

    async  findBackups(){
        try {
            await this.connect();
            const res = await this.client.query(`SELECT * FROM backup_liste`);
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
            const res = await this.client.query(`SELECT * FROM backup_liste where id = '${id}'`);
            console.log(res.rows);
            await this.client.end();
            console.log(res.row);
            return res.rows;
        } catch (error) {
            console.error('Error fetching data from database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }finally {
            await this.disconnect(); 
        }
    }

    async  insertNewBackups(newBackup) {
        try {
            await this.connect();
            const { type, path, saved_date, database_id}  = newBackup
            const query = `
                INSERT INTO backup_liste (type, path, saved_date, database_id)
                VALUES ($1, $2, $3, $4)
                RETURNING *;
            `;
            const values = [type, path, saved_date, database_id];
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


async deleteBackup(idBackup){
    try {
        await this.connect();
        const id = idBackup
        const query = `
            DELETE FROM backup_liste where id = $1;
        `;
        const values = [idBackup];
        const res = await this.client.query(query, values);
        console.log('Backup deleted', res.rows[0]);
        return res.rows[0];
    } catch (error) {
        console.error('Error deleting this backup:', error);
        throw error;
    } finally {
        await this.disconnect(); 
    }
}

}

module.exports = BackupsManagement;