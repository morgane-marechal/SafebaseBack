/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

// const { exec } = require('child_process');
const DatabasesManagement = require('./Classe/DatabasesManagement');
const BackupsManagement = require('./Classe/BackupsManagement');

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
        //changer l'id pour que ça soit une variable
        const id = 1;
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
    fastify.post("/api/database", (request, reply) => {
        //a changer quand front fait
        const newDatabase = {
            user: 'dbUser2',
            password: 'dbPassword',
            host: 'localhost',
            port: 5432,
            type: 'PostgreSQL',
            name: 'my_database',
            container_name: 'my_postgres_container2'
          };
        const databases = new DatabasesManagement();
        databases.insertNewDatabase(newDatabase)
        .then(result => console.log('Insertion réussie:', result))
        .catch(error => console.error('Erreur:', error));
    })

    //éditer connection base de donnée spécifique
    fastify.put("/api/database/:databaseId", (request, reply) => {

        const updateDatabase = {
            user: 'dbUser2',
            password: 'dbPassword',
            host: 'localhost',
            port: 5432,
            type: 'PostgreSQL',
            name: 'my_database',
            container_name: 'my_postgres_container2'
          };
          const id = 1;
        const databases = new DatabasesManagement();
        databases.updateDatabase(id, updateDatabase)
        .then(result => console.log('Insertion réussie:', result))
        .catch(error => console.error('Erreur:', error));
    })

    //supprimer une bdd specifique
    fastify.delete("/api/database/:databaseId", (request, reply) => {
        // var userId = request.params.userId
        // User.findById(userId, (err, user) => {
        //     if(!err) {
        //         user.remove((er) => {
        //             if(!er) {
        //                 reply.send("USER DELETED")
        //             } else {
        //                 reply.send({ error: er })
        //             }
        //         })
        //     } else {
        //         reply.send({ error: err })
        //     }
        // })
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

       fastify.get('/api/database/backup/:databaseId', async (request, reply) => {
        // const executor = new CommandExecutor();
        // executor.importPostGres() /*pour telecharger la base de données postgres*/
        //     .then(output => {
        //         console.log('Command Output:', output);
        //         return { hello: 'postgres' }
        //     })
        //     .catch(error => {
        //         console.error('Error:', error);
        //     });
      })

       //créer une sauvegarde

       fastify.post("/api/backup", (request, reply) => {
        const newBackup = {
            type: 'Full',
            path: '/backups/full_backup_2024.sql',
            saved_date: new Date(), // Utiliser la date actuelle
            database_id: 1 // Assurez-vous que cet ID existe dans votre table de bases de données
        };
        const databases = new BackupsManagement();
        databases.insertNewBackups(newBackup)
        .then(result => console.log('Insertion réussie:', result))
        .catch(error => console.error('Erreur:', error));
    })

      // modifier une sauvegarde

       //supprimer une sauvegarde

       //------------------------API/actionSysteme


  }
  

  module.exports = routes