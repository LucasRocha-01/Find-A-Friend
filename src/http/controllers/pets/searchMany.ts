import { makeSearchByCityUseCase } from '@/use-cases/factories/make-search-by-city-use-case'
import { makeSearchManyPetsUseCase } from '@/use-cases/factories/make-search-many-pets-use-case'
import { FastifyReply, FastifyRequest } from 'fastify'
import { z } from 'zod'

export async function searchMany(request: FastifyRequest, reply: FastifyReply) {
  const searchManyQuerySchema = z.object({
    cidade: z.string(),
    idade: z.union([z.string(), z.undefined()]),
    porte: z.union([z.coerce.number().min(1).max(3), z.undefined()]),
    ambiente: z.union([z.coerce.number().min(1).max(5), z.undefined()]),
    energia: z.union([z.coerce.number().min(1).max(5), z.undefined()]),
    independencia: z.union([z.coerce.number().min(1).max(5), z.undefined()]),

    page: z.coerce.number().min(1).default(1),
  })

  const { cidade, page, idade, porte, ambiente, energia, independencia } =
    searchManyQuerySchema.parse(request.query)

  const searchManyUseCase = makeSearchManyPetsUseCase()
  const searchManyOrgs = makeSearchByCityUseCase()

  const { orgs } = await searchManyOrgs.execute({ cidade })

  if (!orgs) {
    throw new Error('No org')
  }

  const allPets = []

  for (const org of orgs) {
    const { pets } = await searchManyUseCase.execute({
      orgs_id: org.id,
      page,
      idade,
      porte: porte ? String(porte) : undefined,
      ambiente: ambiente ? String(ambiente) : undefined,
      energia: energia ? String(energia) : undefined,
      independencia: independencia ? String(independencia) : undefined,
    })

    allPets.push(...pets)
  }

  const pets = allPets

  return reply.status(200).send({ pets })
}
