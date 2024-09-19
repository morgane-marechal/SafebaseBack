const SystemeneFunction = require('./Classe/SystemeFunction');
const BackupsManagement = require('./Classe/BackupsManagement');

async function autoSavePostGres() {
    const dbBackup = new SystemeneFunction(); 
    await dbBackup.importPostGres(); 
    const date = dbBackup.getFormattedTimestamp();
    const addBackup = new BackupsManagement();
    const newBackup = {
        type: 'postgres',
        path: `Sauvegardes/SauvegardesPosteGres/savebase_postgres_${date}.sql`,
        saved_date: new Date(), 
        database_id: 1
    }; 
    await addBackup.insertNewBackups(newBackup);
    console.log('newBackup',newBackup);
}

autoSavePostGres();

