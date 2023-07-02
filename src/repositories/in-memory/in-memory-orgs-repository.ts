import { Org, Prisma } from '@prisma/client'
import { OrgsRepository } from '../orgs-repository'
import { randomUUID } from 'node:crypto'

export class InMemoryOrgsRepository implements OrgsRepository {
  public items: Org[] = []

  async findById(id: string) {
    const org = this.items.find((item) => item.id === id)

    if (!org) {
      return null
    }

    return org
  }

  async findByEmail(email: string) {
    const org = this.items.find((item) => item.email === email)

    if (!org) {
      return null
    }

    return org
  }

  async searchMany(query: string, page: number) {
    return this.items
      .filter((item) => item.title.includes(query))
      .slice((page - 1) * 20)
  }

  async searchByCity(cidade: string) {
    const orgs = this.items.filter((item) => item.cidade === cidade)

    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org: Org = {
      id: data.id ?? randomUUID(),
      email: data.email,
      password_hash: data.password_hash,
      title: data.title,
      description: data.description ?? null,
      phone: data.phone ?? null,
      cidade: data.cidade,
      longitude: new Prisma.Decimal(data.longitude.toString()),
      latitude: new Prisma.Decimal(data.latitude.toString()),
      created_at: new Date(),
    }

    this.items.push(org)

    return org
  }
}
