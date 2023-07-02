import { makeListPetsUseCase } from '@/use-cases/factories/make-list-pets-use-case copy'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function listPets(request: FastifyRequest, reply: FastifyReply) {
  const listPetsQuerySchema = z.object({
    page: z.coerce.number().min(1).default(1),
  })

  const { page } = listPetsQuerySchema.parse(request.query)

  const searchManyUseCase = makeListPetsUseCase()

  const { pets } = await searchManyUseCase.execute({
    page,
  })
  return reply.status(200).send({ pets })
}
