import { Pet, Prisma } from '@prisma/client'
import { PetsRepository } from '../pets-repository'
import { randomUUID } from 'crypto'

export class InMemoryPetsRepository implements PetsRepository {
  public items: Pet[] = []

  async findById(id: string): Promise<Pet | null> {
    const pet = this.items.find((item) => item.id === id)

    if (!pet) {
      return null
    }

    return pet
  }

  async searchMany(
    orgs_id: string,
    page: number,
    idade?: string | undefined,
    porte?: string | undefined,
    ambiente?: string | undefined,
    energia?: string | undefined,
    independencia?: string | undefined,
  ): Promise<Pet[]> {
    const pets = this.items.filter((item) => item.orgs_id === orgs_id)

    const args = ['idade', 'porte', 'ambiente', 'energia', 'independencia']

    for (const arg in args) {
      if (arg) {
        if (arg) {
          pets.filter((item) => item[arg as keyof Pet] === arg)
        }
      }
    }

    return pets
  }

  async listAll(page: number): Promise<Pet[]> {
    const pets = this.items

    return pets
  }

  async create(data: Prisma.PetUncheckedCreateInput) {
    const pet = {
      id: data.id ?? randomUUID(),
      idade: data.idade,
      ambiente: data.ambiente,
      energia: data.energia,
      independencia: data.independencia,
      porte: data.porte,
      name: data.name,
      orgs_id: data.orgs_id,
      sobre: data.sobre,
      requisitos: [],
      created_at: new Date(),
    }

    this.items.push(pet)

    return pet
  }
}
