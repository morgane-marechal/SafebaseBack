/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

// const { exec } = require('child_process');
const DatabasesManagement = require('./Classe/DatabasesManagement');
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
    
        // Suppose que findDatabases renvoie une promesse
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
    fastify.get("/api/database/:databaseId", (request, reply) => {
        // var userId = request.params.userId
        // User.findById(userId, (err, user) => {
        //     if(!err) {
        //         reply.send(user)
        //     } else {
        //         reply.send({ error: err })
        //     }
        // })
    })

    //créer une nouvelle connection à une bdd
    fastify.post("/api/database", (request, reply) => {
        // var user = request.body
        // User.create(user, (err, user) => {
        //     if(!err) {
        //         reply.send(user)
        //     } else {
        //         reply.send({ error: err })
        //     }
        // })
    })

    //éditer connection base de donnée spécifique
    fastify.put("/api/database/:databaseId", (request, reply) => {
        // var userId = request.params.userId
        // var newUserEdit = request.body
        // User.findById(userId, (err, user) => {
        //     if(!err) {
        //         user.age = newUserEdit.age
        //         user.name = newUserEdit.name
        //         user.email = newUserEdit.email
        //         user.save((er, savedUser) => {
        //             if(!er) {
        //                 reply.send(savedUser)
        //             } else {
        //                 reply.send(er)
        //             }
        //         })
        //     } else {
        //         reply.send({ error: err })
        //     }
        // })
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

    //backup BDD specifique
    fastify.get('/api/database/save/:databaseId', async (request, reply) => {
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



      //route pour faire un save d'une bdd enregistrée

      //route de restauration, besoin de l'id du backup et de la base de données où tu fais ta sauvegarde

  }
  

  module.exports = routes