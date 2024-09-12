const apiRoutes = require('./routes');
const fastify = require('fastify')({
    logger: true
  })

fastify.register(apiRoutes)
fastify.register(require('@fastify/cors'), { 
  origin: true, 
});


fastify.listen({ port: 3001 }, function (err, address) {
  if (err) {
    fastify.log.error(err)
    process.exit(1)
  }
})
