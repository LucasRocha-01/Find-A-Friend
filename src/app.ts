import fastify from 'fastify'
import { ZodError } from 'zod'
import { env } from './env'
import { orgsRoutes } from 'http/controllers/orgs/routes'

export const app = fastify()

app.register(orgsRoutes, { prefix: 'orgs' })

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: 'Validation error.', issues: error.format() })
  }
  if (env.NODE_ENV !== 'production') {
    console.error(error)
  } else {
    // TODO: Here we should log to an external tool like DataDog/NewRelic/Semtru
  }
  return reply.status(500).send({ message: 'Internal server error.' })
})