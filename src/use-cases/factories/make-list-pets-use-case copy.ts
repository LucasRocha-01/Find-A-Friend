import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { ListPetsUseCase } from '../pets/list-pets'

export function makeListPetsUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new ListPetsUseCase(petsRepository)

  return useCase
}
