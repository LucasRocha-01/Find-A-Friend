import { Org, Prisma } from '@prisma/client'
import { FindManyNearbyParams, OrgsRepository } from '../orgs-repository'
import { prisma } from '@/lib/prisma'

export class PrismaOrgsRepository implements OrgsRepository {
  async findById(id: string) {
    const org = await prisma.org.findUnique({
      where: { id },
    })
    return org
  }

  async searchMany(query: string, page: number) {
    const orgs = await prisma.org.findMany({
      where: {
        title: {
          contains: query,
        },
      },
      take: 20,
      skip: (page - 1) * 20,
    })

    return orgs
  }

  async findManyNearby({ latitude, longitude }: FindManyNearbyParams) {
    const orgs = await prisma.$queryRaw<Org[]>`
      SELECT * from orgs
      WHERE ( 6371 * acos( cos( radians(${latitude}) ) * cos( radians( latitude ) ) * cos( radians( longitude ) - radians(${longitude}) ) + sin( radians(${latitude}) ) * sin( radians( latitude ) ) ) ) <= 10
      `
    return orgs
  }

  async create(data: Prisma.OrgCreateInput) {
    const org = await prisma.org.create({
      data,
    })
    return org
  }
}