import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { CreateOrgUseCase } from './create-org'

let orgsRepository: InMemoryOrgsRepository
let sut: CreateOrgUseCase

describe('Create Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new CreateOrgUseCase(orgsRepository)
  })

  it('should be able to create', async () => {
    const { org } = await sut.execute({
      title: 'org dos catdashiorros',
      email: 's2te2ste@mail.com',
      password: 'testsdasde',
      cidade: 'Rio',
      description: null,
      phone: '888333388',
      latitude: -22.8740672,
      longitude: -43.3693162,
    })
    expect(org.id).toEqual(expect.any(String))
  })
})
