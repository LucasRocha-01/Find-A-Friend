import { ResourceNotFoundError } from '@/use-cases/erros/resource-not-found-error'
import { makeRegisterPets } from '@/use-cases/factories/make-register-pet-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerParamsSchema = z.object({
    orgId: z.string().uuid(),
  })

  const registerBodySchema = z.object({
    name: z.string(),
    idade: z.string(),
  })

  const { orgId } = registerParamsSchema.parse(request.params)
  const { name, idade } = registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPets()

    const idadeDate = new Date(idade)

    await registerPetUseCase.execute({
      name,
      idade: idadeDate,
      orgId,
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }
  }

  return reply.status(201).send()
}
