import { FastifyInstance } from 'fastify'
import { register } from './register'
import { verifyJWT } from '@/http/middlewares/verify-jwt'
// import { searchMany } from './searchMany'
import { listPets } from './list-pets'
import { searchMany } from './searchMany'
import { findById } from './findById'

export async function petsRoutes(app: FastifyInstance) {
  // app.addHook('onRequest', verifyJWT)
  app.post('/:orgId/register', { onRequest: [verifyJWT] }, register)

  app.get('/', listPets)
  app.get('/search', searchMany)
  app.get('/:id', findById)
}
