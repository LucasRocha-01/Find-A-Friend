import { Org, Prisma } from '@prisma/client'

export interface FindManyNearbyParams {
  latitude: number
  longitude: number
}

export interface OrgsRepository {
  findById(id: string): Promise<Org | null>
  findByEmail(email: string): Promise<Org | null>
  searchMany(query: string, page: number): Promise<Org[]>
  searchByCity(cidade: string): Promise<Org[]>
  create(data: Prisma.OrgCreateInput): Promise<Org>
}
