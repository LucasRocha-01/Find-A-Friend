import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { SearchManyPetsUseCase } from '../pets/searchMany'

export function makeSearchManyPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new SearchManyPetsUseCase(petsRepository)

  return useCase
}
