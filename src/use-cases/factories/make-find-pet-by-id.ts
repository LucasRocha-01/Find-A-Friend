import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { FindPetByIdUseCase } from '../pets/findById'

export function makeFindPetByIdUseCase() {
  const petsRepository = new PrismaPetsRepository()
  const useCase = new FindPetByIdUseCase(petsRepository)

  return useCase
}
