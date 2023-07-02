import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { beforeEach, describe, expect, it } from 'vitest'
import { AuthenticateUseCase } from './authenticate'
import { hash } from 'bcryptjs'

let orgsRepository: InMemoryOrgsRepository
let sut: AuthenticateUseCase

describe('Authenticate Org Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    sut = new AuthenticateUseCase(orgsRepository)
  })

  it('should be able to authenticate', async () => {
    await orgsRepository.create({
      title: 'org dos catdashiorros',
      email: 's2te2ste@mail.com',
      password_hash: await hash('testsdasde', 6),
      cidade: 'Rio',
      description: null,
      phone: '888333388',
      latitude: -22.8740672,
      longitude: -43.3693162,
    })

    const { org } = await sut.execute({
      email: 's2te2ste@mail.com',
      password: 'testsdasde',
    })

    expect(org.id).toEqual(expect.any(String))
  })
})
