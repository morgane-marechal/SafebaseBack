const Connect = require('./Classe/Connect');
const DatabasesManagement = require('./Classe/DatabasesManagement');
const BackupsManagement = require('./Classe/BackupsManagement');
const SystemeFunction = require('./Classe/SystemeFunction');

// test-env.js
console.log(process.env.DB_HOST, process.env.DB_USER, process.env.DB_PASSWORD, process.env.DB_NAME, process.env.DB_PORT);


async function testConnection() {
    const db = new Connect();

    try {
        await db.connect();
        console.log('Connection to the database was successful!');
    } catch (error) {
        console.error('Failed to connect to the database:', error.message);
    } finally {
        await db.disconnect();
    }
}
// testConnection();


function getDatabase() {
    const findData = new DatabasesManagement();
   const data = findData.findDatabases();
//    console.log(data);
   return data
}
// getDatabase();

function getOneDatabase() {
    const findData = new DatabasesManagement();
   const data = findData.findDatabaseById('1');
//    console.log(data);
   return data
}
// getOneDatabase();

function newDatabase(){
    const newDatabase = {
        user: 'dbUser3_i',
        password: 'dbPassword',
        host: 'localhost',
        port: 5432,
        type: 'PostgreSQL',
        name: 'my_database_de_lenfer',
        container_name: 'my_postgres_container'
    };
    const databases = new DatabasesManagement();
    databases.insertNewDatabase(newDatabase)
        .then(result => console.log('Insertion réussie:', result))
        .catch(error => console.error('Erreur:', error));
}

// newDatabase();

function updateDatabase(){
    const updateDatabase = {
        user: 'user',
        password: 'dbPassword',
        host: 'localhost',
        port: 5432,
        type: 'PostgreSQL',
        name: 'my_database',
        container_name: 'my_postgres_container'
    };
    const id = 1;
    const databases = new DatabasesManagement();
    databases.updateDatabase(id, updateDatabase)
        .then(result => console.log('modification réussie:', result))
        .catch(error => console.error('Erreur:', error));
}

// updateDatabase();

async function testInsertNewBackups() {
    const databases = new BackupsManagement();
    const newBackup = {
        type: 'postgres',
        path: '/backups/full_backup_2024.sql',
        saved_date: new Date(), // Utiliser la date actuelle
        database_id: 1 // Assurez-vous que cet ID existe dans votre table de bases de données
    };
    try {
        const result = await databases.insertNewBackups(newBackup);
        console.log('Backup inséré avec succès:', result);
    } catch (error) {
        console.error('Erreur lors de l\'insertion du backup:', error);
    }
}

// testInsertNewBackups();

async function deleteBackup(){
    const backup = new BackupsManagement();
    try {
        const result = await backup.deleteBackup(3);
        console.log('Backup supprimé avec succès:', result);
    } catch (error) {
        console.error('Erreur lors de la suppression du backup:', error);
    }
}

// deleteBackup();

async function deleteDatabase(){
    const database = new DatabasesManagement();
    try {
        const result = await database.deleteDatabase(3);
        console.log('Database supprimé avec succès:', result);
    } catch (error) {
        console.error('Erreur lors de la suppression de la database:', error);
    }
}

// deleteDatabase();

async function getBackups(){
    const backups = new BackupsManagement();
    try {
        const result = await backups.findBackups();
        console.log('liste backups', result);
    } catch (error) {
        console.error('pb', error);
    }
}

// getBackups();

async function dumpPostgres(){
    const dumpPg = new SystemeFunction()
    const backups = new BackupsManagement();

    try {
        const result = await dumpPg.importPostGres();
        const date = dumpPg.getFormattedTimestamp()

        const newBackup = {
            type: 'postgres',
            path: `Sauvegardes/SauvegardesPosteGres/savebase_postgres_${date}.sql`,
            saved_date: new Date(), 
            database_id: 1 
        };        console.log('nouveau dump de postgres', result);
        const result2 = await backups.insertNewBackups(newBackup);
    } catch (error) {
        console.error('pb', error);
    }
}

// dumpPostgres()


async function getBackupById(id){
    const backups = new BackupsManagement();
    try {
        const result = await backups.findBackups();
        console.log('liste backups', result);
    } catch (error) {
        console.error('pb', error);
    }
}

// getPathById(2);

async function getPathById(){
    const backups = new BackupsManagement();
    try {
        const result = await backups.getPathById(2);
        console.log('liste backups', result);
    } catch (error) {
        console.error('pb', error);
    }
}

// getPathById();

async function getTypeById(){
    const backups = new BackupsManagement();
    try {
        const result = await backups.getTypeById(18);
        console.log('liste backups', result);
    } catch (error) {
        console.error('pb', error);
    }
}

getTypeById()