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
    porte: z.number().min(1).max(3),
    ambiente: z.number().min(1).max(5),
    energia: z.number().min(1).max(5),
    independencia: z.number().min(1).max(5),
    requisitos: z.array(z.string()),
    sobre: z.string(),
  })

  const { orgId } = registerParamsSchema.parse(request.params)
  const {
    name,
    idade,
    ambiente,
    energia,
    independencia,
    requisitos,
    sobre,
    porte,
  } = registerBodySchema.parse(request.body)

  try {
    const registerPetUseCase = makeRegisterPets()

    await registerPetUseCase.execute({
      name,
      idade,
      orgId,
      sobre,
      requisitos,
      porte: porte.toString(),
      ambiente: ambiente.toString(),
      energia: energia.toString(),
      independencia: independencia.toString(),
    })
  } catch (err) {
    if (err instanceof ResourceNotFoundError) {
      return reply.status(400).send({ message: err.message })
    }

    throw err
  }

  return reply.status(201).send()
}
