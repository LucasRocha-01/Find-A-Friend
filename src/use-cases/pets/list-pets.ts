import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface ListPetsUseCaseRequest {
  page: number
}

interface ListPetsUseCaseResponse {
  pets: Pet[]
}

export class ListPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    page,
  }: ListPetsUseCaseRequest): Promise<ListPetsUseCaseResponse> {
    const pets = await this.petsRepository.listAll(page)

    return { pets }
  }
}
