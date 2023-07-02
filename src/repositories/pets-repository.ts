import { Pet, Prisma } from '@prisma/client'

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  searchMany(
    orgs_id: string,
    page: number,
    idade?: string,
    porte?: string,
    ambiente?: string,
    energia?: string,
    independencia?: string,
  ): Promise<Pet[]>
  listAll(page: number): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
