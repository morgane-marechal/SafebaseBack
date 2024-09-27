const apiRoutes = require('./routes');
const fastify = require('fastify')({
    logger: true
  })

fastify.register(apiRoutes)
fastify.register(require('@fastify/cors'), { 
  origin: true, 
});


// fastify.listen({ port: 3001 }, function (err, address) {
//   if (err) {
//     fastify.log.error(err)
//     process.exit(1)
//   }
// })

fastify.listen({ port: 3001, host: '0.0.0.0' }, (err, address) => {
  if (err) {
    console.error(err);
    process.exit(1);
  }
  console.log(`Server listening at ${address}`);
});
// const { Pool } = require('pg');

// // Configuration de la connexion à la base de données
// const pool = new Pool({
//     host: process.env.DB_HOST || 'postgres_database_version',
//     port: process.env.DB_PORT || 5434,
//     user: process.env.DB_USER || 'safebase',
//     password: process.env.DB_PASSWORD || 'pass',
//     database: process.env.DB_NAME || 'safebase',
// });

// fastify.get('/api/backup', async (request, reply) => {
//   try {
//       const result = await pool.query('SELECT * FROM your_table_name'); // Remplacez par votre requête
//       reply.send(result.rows);
//   } catch (error) {
//       fastify.log.error(error);
//       reply.status(500).send('Internal Server Error');
//   }
// });