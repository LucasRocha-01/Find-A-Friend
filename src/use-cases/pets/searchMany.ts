import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'

interface SearchManyPetsUseCaseRequest {
  orgs_id: string
  page: number
  idade?: string
  porte?: string
  ambiente?: string
  energia?: string
  independencia?: string
}

interface SearchManyPetsUseCaseResponse {
  pets: Pet[]
}

export class SearchManyPetsUseCase {
  constructor(private petsRepository: PetsRepository) {}

  async execute({
    orgs_id,
    page,
    idade,
    porte,
    ambiente,
    energia,
    independencia,
  }: SearchManyPetsUseCaseRequest): Promise<SearchManyPetsUseCaseResponse> {
    const pets = await this.petsRepository.searchMany(
      orgs_id,
      page,
      idade,
      porte,
      ambiente,
      energia,
      independencia,
    )
    return { pets }
  }
}
