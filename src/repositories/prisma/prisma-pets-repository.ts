import { Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { prisma } from '@/lib/prisma'

export class PrismaPetsRepository implements PetsRepository {
  async findById(id: string) {
    const pet = await prisma.pet.findUnique({
      where: {
        id,
      },
    })
    return pet
  }

  async searchMany(
    orgs_id: string,
    page: number,
    idade?: string,
    porte?: string,
    ambiente?: string,
    energia?: string,
    independencia?: string,
  ) {
    const whereConditions: Prisma.PetWhereInput = {
      orgs_id,
      ...(idade && { idade }),
      ...(porte && { porte }),
      ...(ambiente && { ambiente }),
      ...(energia && { energia }),
      ...(independencia && { independencia }),
    }

    const pets = await prisma.pet.findMany({
      where: whereConditions,
      take: 20,
      skip: (page - 1) * 20,
    })

    return pets
  }

  async listAll(page: number) {
    const pets = await prisma.pet.findMany({
      take: 20,
      skip: (page - 1) * 20,
    })
    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = await prisma.pet.create({
      data,
    })
    return pet
  }
}
