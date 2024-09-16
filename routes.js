/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

// const { exec } = require('child_process');
const DatabasesManagement = require('./Classe/DatabasesManagement');
const BackupsManagement = require('./Classe/BackupsManagement');
const SystemeFunction = require('./Classe/SystemeFunction')

const CommandExecutor = require('./Classe/SystemeFunction');

async function routes (fastify, options) {

    fastify.get('/', function (request, reply) {
        reply.send({ hello: 'world 2' })
      })
      
      
    fastify.get('/api/bdd', function (request, reply) {
          reply.send({ bdd:'liste des bases de données disponibles' })
      
    })

    // fastify.get('/api/test', async (request, reply) => {
    //   return { hello: 'world en capsule pour le test' }
    // })



      //------------------------API/databases

    /* faire un CRUD propre*/ 

    //récupérer toute les bdd
    fastify.get("/api/database", async (request, reply) => {
        const databases = new DatabasesManagement();
            try {
            const allData = await databases.findDatabases({});
            console.log(allData); // Assurez-vous que vous affichez correctement les données
            reply.send(allData);
        } catch (err) {
            console.error('Error fetching databases:', err);
            reply.status(500).send({ error: err.message });
        }
    });

    //récupérer une bdd spécifique
    fastify.get("/api/database/:databaseId", async (request, reply) => {
        const id  = request.params.databaseId;
        const databases = new DatabasesManagement();
            try {
            const allData = await databases.findDatabaseById(id);
            console.log(allData); // Assurez-vous que vous affichez correctement les données
            reply.send(allData);
        } catch (err) {
            console.error('Error fetching databases:', err);
            reply.status(500).send({ error: err.message });
        }
    })

    //créer une nouvelle connection à une bdd
    // fastify.post("/api/database", (request, reply) => {
    //     //a changer quand front fait
    //     const newDatabase = {
    //         user: 'dbUser2',
    //         password: 'dbPassword',
    //         host: 'localhost',
    //         port: 5432,
    //         type: 'PostgreSQL',
    //         name: 'my_database',
    //         container_name: 'my_postgres_container2'
    //       };
    //     const databases = new DatabasesManagement();
    //     databases.insertNewDatabase(newDatabase)
    //     .then(result => console.log('Insertion réussie:', result))
    //     .catch(error => console.error('Erreur:', error));
    // })

    fastify.post("/api/database", (request, reply) => {
        const newDatabase = request.body; 
            if (!newDatabase || !newDatabase.user || !newDatabase.password || !newDatabase.host) {
            return reply.status(400).send({ error: "Données de base de données manquantes ou invalides" });
        }
            const databases = new DatabasesManagement();
            databases.insertNewDatabase(newDatabase)
            .then(result => {
                console.log('Insertion réussie:', result);
                reply.status(201).send({ message: 'Base de données ajoutée avec succès', result });
            })
            .catch(error => {
                console.error('Erreur lors de l\'insertion:', error);
                reply.status(500).send({ error: 'Erreur lors de l\'insertion de la base de données' });
            });
    });
    

    //éditer connection base de donnée spécifique
    fastify.put("/api/database/:databaseId", (request, reply) => {

        // const updateDatabase = {
        //     user: 'dbUser2',
        //     password: 'dbPassword',
        //     host: 'localhost',
        //     port: 5432,
        //     type: 'PostgreSQL',
        //     name: 'my_database',
        //     container_name: 'my_postgres_container2'
        //   };
          const id = 1;
        const databases = new DatabasesManagement();
        databases.updateDatabase(id, updateDatabase)
        .then(result => console.log('Insertion réussie:', result))
        .catch(error => console.error('Erreur:', error));
    })

    //supprimer une bdd specifique
    fastify.delete("/api/database/delete/:databaseId", (request, reply) => {
        const databaseId = request.params.backupId; 
        const database = new DatabasesManagement();
        database.deleteDatabase(databaseId)
        .then(result => {
            console.log('Connexion à la bdd supprimée:', result);
            reply.send({ success: true, message: 'Connecion à la BDD supprimée', result });
        })
        .catch(error => {
            console.error('Erreur:', error);
            reply.status(500).send({ success: false, error: 'Erreur lors de la suppression de la BDD' });
        });
    
    })



//
//----------------------------pour tester le backup

    //backup test bdd postgres
      fastify.get('/api/importPostGres', async (request, reply) => {
        const executor = new CommandExecutor();
        executor.importPostGres() /*pour telecharger la base de données postgres*/
            .then(output => {
                console.log('Command Output:', output);
                return { hello: 'postgres' }
            })
            .catch(error => {
                console.error('Error:', error);
            });
      })




            //------------------------API/backup

       //récupérer toutes les sauvegardes

       fastify.get('/api/backup', async (request, reply) => {
            const backups = new BackupsManagement();
                try {
                const allData = await backups.findBackups({});
                console.log(allData); // Assurez-vous que vous affichez correctement les données
                reply.send(allData);
            } catch (err) {
                console.error('Error fetching databases:', err);
                reply.status(500).send({ error: err.message });
            }
      })
       
       //récupérer les sauvegardes par database (mysql ou postgres)
       fastify.get('/api/backup/:databaseId', async (request, reply) => {

      })

       //créer une sauvegarde
       fastify.post("/api/backup", (request, reply) => {
        const newBackup = {
            type: 'Full',
            path: '/backups/full_backup_2024.sql',
            saved_date: new Date(), // Utiliser la date actuelle
            database_id: 1 // Assurez-vous que cet ID existe dans votre table de bases de données
        };
        const backups = new BackupsManagement();
        backups.insertNewBackups(newBackup)
        .then(result => console.log('Insertion réussie:', result))
        .catch(error => console.error('Erreur:', error));
    })

      // modifier une sauvegarde

     //supprimer un backup specifique
     fastify.delete("/api/backup/delete/:backupId", async(request, reply) => {
        const backupId = request.params.backupId; 
        const backups = new BackupsManagement();
        path = await backups.getPathById(backupId);
        console.log("chement du backup",path);
        const system = new SystemeFunction();
        system.deleteFile(path);
        const backup = new BackupsManagement();
        await backup.deleteBackup(backupId)
        .then(result => {
            console.log('Sauvegarde supprimée:', result);
            reply.send({ success: true, message: 'Sauvegarde supprimée', result });
        })
        .catch(error => {
            console.error('Erreur:', error);
            reply.status(500).send({ success: false, error: 'Erreur lors de la suppression de la sauvegarde' });
        });
    });
    
    


       //------------------------API/actionSysteme
       //dump de bdd
       fastify.get('/api/systeme/dump/:databaseId', async (request, reply) => {
        try {
            const databaseId = request.params.databaseId;
            console.log('Database ID:', databaseId);
            const database = new DatabasesManagement();
            const databaseInfo = await database.findDatabaseById(databaseId);
            if(databaseInfo[0].type==="postgres"){
                const dumpPg = new SystemeFunction()
                const backups = new BackupsManagement();
                try {
                    const result = await dumpPg.importPostGres();
                    const date = dumpPg.getFormattedTimestamp()      
                    const newBackup = {
                        type: 'postgres',
                        path: `Sauvegardes/SauvegardesPosteGres/savebase_postgres_${date}.sql`,
                        saved_date: new Date(), 
                        database_id: databaseId
                    };        
                    console.log('nouveau dump de postgres', result);
                    const result2 = await backups.insertNewBackups(newBackup);
                } catch (error) {
                    console.error('pb', error);
                }
            }else if(databaseInfo[0].type==="mysql"){
                const dumpMysql = new SystemeFunction()
                const backups = new BackupsManagement();
                try {
                    const result = await dumpMysql.importMySql();
                    const date = dumpMysql.getFormattedTimestamp()      
                    const newBackup = {
                        type: 'mysql',
                        path: `Sauvegardes/SauvegardesSQL/savebase_mysql_${date}.sql`,
                        saved_date: new Date(), 
                        database_id: databaseId
                    };        
                    console.log('nouveau dump de postgres', result);
                    const result2 = await backups.insertNewBackups(newBackup);
                } catch (error) {
                    console.error('pb', error);
                }

            }
            reply.send({ success: true, message: 'Le backup a été enregistré' });
        } catch (error) {
            console.error('Error processing request:', error);
            reply.status(500).send({ error: 'Internal Server Error' });
        }
    });


       //restauration d'un bdd precise
       fastify.get("/api/systeme/restauration/:backupId",async (request, reply)=>{
        const backupId = request.params.backupId; 
        const backupType = new BackupsManagement();
        type = await backupType.getTypeById(backupId);
        console.log("type",type);
        const backupPath = new BackupsManagement();
        path = await backupPath.getPathById(backupId);

        if (type==='postgres'){
            const system = new SystemeFunction();
            console.log("path",path);
            await system.restorePostgres(path)
        .then(result => {
            console.log('restauration de la base de donnée postgres:', result);
            reply.send({ success: true, message: 'Sauvegarde restaurée', result });
        })
        .catch(error => {
            console.error('Erreur:', error);
            reply.status(500).send({ success: false, error: 'Erreur lors de la restauration de la sauvegarde' });
        }
        );

       }
    });


  }
  

  module.exports = routes