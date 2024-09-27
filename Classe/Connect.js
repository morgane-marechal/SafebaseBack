//classe pour se connecter à la bdd postgres_database_version
const { Client } = require('pg');
require('dotenv').config();

class Connect {
    constructor() {
        // this.client = new Client({
        //     host: process.env.DB_HOST,
        //     user: process.env.DB_USER,
        //     password: process.env.DB_PASSWORD,
        //     port: process.env.DB_PORT,
        // });

        this.client = new Client({
            host: 'postgres_database_version',
            port: 5432,
            user: 'safebase',
            password: 'pass',
            database: 'safebase',
        });
    }

    //gestion connection
    async connect() {
        console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, process.env.DB_PORT);
        try {
            await this.client.connect();
            console.log('Connected to database');
        } catch (error) {
            console.error('Error connecting to database:', error);
            throw error; // Rethrow the error to handle it in the calling code
        }
    }

    async disconnect() {
        try {
            await this.client.end();
            console.log('Disconnected from database');
        } catch (error) {
            console.error('Error disconnecting from database:', error);
            throw error;
        }
    }
  
}

module.exports = Connect;