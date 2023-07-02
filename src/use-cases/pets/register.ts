import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../erros/resource-not-found-error'

interface RegisterUseCaseRequest {
  name: string
  idade: string
  sobre: string
  porte: string
  energia: string
  independencia: string
  ambiente: string
  requisitos: string[]
  orgId: string
}

interface RegisterUseCaseResponse {
  pet: Pet
}

export class RegisterPetUseCase {
  constructor(
    private petsRepository: PetsRepository,
    private orgsRepository: OrgsRepository,
  ) {}

  async execute({
    name,
    ambiente,
    porte,
    energia,
    independencia,
    requisitos,
    sobre,
    idade,
    orgId,
  }: RegisterUseCaseRequest): Promise<RegisterUseCaseResponse> {
    const org = await this.orgsRepository.findById(orgId)

    if (!org) {
      throw new ResourceNotFoundError()
    }

    const pet = await this.petsRepository.create({
      name,
      porte,
      ambiente,
      energia,
      independencia,
      requisitos,
      sobre,
      idade,
      orgs_id: orgId,
    })
    return { pet }
  }
}
