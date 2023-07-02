import { makeFindPetByIdUseCase } from '@/use-cases/factories/make-find-pet-by-id'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function findById(request: FastifyRequest, reply: FastifyReply) {
  const findByIdParamsSchema = z.object({
    id: z.string(),
  })

  const { id } = findByIdParamsSchema.parse(request.params)

  const findPetByIdUseCase = makeFindPetByIdUseCase()

  const { pet } = await findPetByIdUseCase.execute({
    id,
  })

  return reply.status(200).send({ pet })
}
