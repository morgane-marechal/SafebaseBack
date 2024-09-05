const Connect = require('./Classe/Connect');
const DatabasesManagement = require('./Classe/DatabasesManagement');

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

testConnection();


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

getOneDatabase();