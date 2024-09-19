const SystemeneFunction = require('./Classe/SystemeFunction');
const BackupsManagement = require('./Classe/BackupsManagement');

async function autoSaveMySql() {
    const dbBackup = new SystemeneFunction(); 
    await dbBackup.importMySql(); 
    //pour le format date
    const date = dbBackup.getFormattedTimestamp();
    const addBackup = new BackupsManagement();
    //info de la bdd mysql
    const newBackup = {
        type: 'mysql',
        path: `Sauvegardes/SauvegardesSQL/savebase_mysql_${date}.sql`,
        saved_date: new Date(), 
        database_id: 2
    }; 
    await addBackup.insertNewBackups(newBackup);
}

autoSaveMySql();