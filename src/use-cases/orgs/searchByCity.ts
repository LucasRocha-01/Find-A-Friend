import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface SearchOrgsByCityUseCaseRequest {
  cidade: string
}

interface SearchOrgsByCityUseCaseResponse {
  orgs: Org[]
}

export class SearchByCityUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    cidade,
  }: SearchOrgsByCityUseCaseRequest): Promise<SearchOrgsByCityUseCaseResponse> {
    const orgs = await this.orgsRepository.searchByCity(cidade)

    return { orgs }
  }
}
