import { OrgsRepository } from '@/repositories/orgs-repository'
import { hash } from 'bcryptjs'
import { Org } from '@prisma/client'
import { UserAlreadyExistsError } from '../erros/user-already-exists-error'

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
    title,
    email,
    password,
    description,
    phone,
    latitude,
    longitude,
  }: CreateOrgUseCaseRequest): Promise<CreateOrgUseCaseResponse> {
    const password_hash = await hash(password, 6)

    const userWithSameEmail = await this.orgsRepository.findByEmail(email)

    if (userWithSameEmail) {
      throw new UserAlreadyExistsError()
    }

    const org = await this.orgsRepository.create({
      title,
      email,
      password_hash,
      description,
      phone,
      latitude,
      longitude,
    })
    return { org }
  }
}
