import { OrgsRepository } from '@/repositories/orgs-repository'
import { Org } from '@prisma/client'

interface CreateOrgUseCaseRequest {
  email: string
  password: string
  title: string
  description: string | null
  phone: string | null
  latitude: number
  longitude: number
}

interface CreateOrgUseCaseResponse {
  org: Org
}

export class CreateOrgUseCase {
  constructor(private orgsRepository: OrgsRepository) {}

  async execute({
    email,
    password,
    title,
    description,
    phone,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const org = await this.orgsRepository.create({
      email,
      latitude,
      longitude,
      password,
      title,
      description,
      phone,
    })
    return {
      org,
    }
  }
}
