import { FastifyInstance } from 'fastify'

import { create } from './create'
import { authenticate } from './authenticate'

export async function orgsRoutes(app: FastifyInstance) {
  app.post('/create', create)
  app.post('/authenticate', authenticate)
}
