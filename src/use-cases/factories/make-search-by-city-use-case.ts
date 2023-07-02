import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'
import { SearchByCityUseCase } from '../orgs/searchByCity'

export function makeSearchByCityUseCase() {
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new SearchByCityUseCase(orgsRepository)

  return useCase
}
