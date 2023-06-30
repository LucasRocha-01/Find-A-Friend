import { PrismaPetsRepository } from '@/repositories/prisma/prisma-pets-repository'
import { RegisterPetUseCase } from '../pets/register'
import { PrismaOrgsRepository } from '@/repositories/prisma/prisma-orgs-repository'

export function makeRegisterPets() {
  const petsRepository = new PrismaPetsRepository()
  const orgsRepository = new PrismaOrgsRepository()
  const useCase = new RegisterPetUseCase(petsRepository, orgsRepository)

  return useCase
}
