import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface FindPetByIdUseCaseRequest {
  id: string
}

interface FindPetByIdUseCaseResponse {
  pet: Pet | null
}

export class FindPetByIdUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    id,
  }: FindPetByIdUseCaseRequest): Promise<FindPetByIdUseCaseResponse> {
    const pet = await this.petsRepository.findById(id)

    return { pet }
  }
}
