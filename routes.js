/**
 * Encapsulates the routes
 * @param {FastifyInstance} fastify  Encapsulated Fastify Instance
 * @param {Object} options plugin options, refer to https://fastify.dev/docs/latest/Reference/Plugins/#plugin-options
 */

// const { exec } = require('child_process');
const CommandExecutor = require('./Classe/SystemeFunction');

async function routes (fastify, options) {

    fastify.get('/', function (request, reply) {
        reply.send({ hello: 'world 2' })
      })
      
      
    fastify.get('/api/bdd', function (request, reply) {
          reply.send({ bdd:'liste des bases de données disponibles' })
      
    })

    fastify.get('/api/test', async (request, reply) => {
      return { hello: 'world en capsule pour le test' }
    })



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



      // route post pour ajouter une base de donnée à la liste des bases de données
      fastify.post('/api/createDb', async (request, reply) => {
      });


      //route pour faire un save d'une bdd enregistrée

      //route de restauration, besoin de l'id du backup et de la base de données où tu fais ta sauvegarde

  }
  

  module.exports = routes