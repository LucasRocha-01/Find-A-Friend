import { makeCreateOrgUseCase } from '@/use-cases/factories/make-create-org-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function create(request: FastifyRequest, reply: FastifyReply) {
  const createOrgBodySchema = z.object({
    email: z.string(),
    password: z.string(),
    title: z.string(),
    description: z.string().nullable(),
    phone: z.string().nullable(),
    latitude: z.number().refine((value) => {
      return Math.abs(value) <= 90
    }),
    longitude: z.number().refine((value) => {
      return Math.abs(value) <= 180
    }),
  })

  const { email, password, title, description, phone, latitude, longitude } =
    createOrgBodySchema.parse(request.body)

  const createOrgUseCase = makeCreateOrgUseCase()

  await createOrgUseCase.execute({
    email,
    password,
    title,
    description,
    phone,
    latitude,
    longitude,
  })

  return reply.status(201).send()
}
