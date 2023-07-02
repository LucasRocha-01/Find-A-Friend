import { beforeEach, describe, expect, it } from 'vitest'
import { hash } from 'bcryptjs'

import { InMemoryPetsRepository } from '@/repositories/in-memory/in-memory-pets-repository'
import { InMemoryOrgsRepository } from '@/repositories/in-memory/in-memory-orgs-repository'
import { RegisterPetUseCase } from './register'

let orgsRepository: InMemoryOrgsRepository
let petsRepository: InMemoryPetsRepository
let sut: RegisterPetUseCase

describe('Register Pet Use Case', () => {
  beforeEach(() => {
    orgsRepository = new InMemoryOrgsRepository()
    petsRepository = new InMemoryPetsRepository()
    sut = new RegisterPetUseCase(petsRepository, orgsRepository)
  })

  it('should be able to Register a Pet', async () => {
    const org = await orgsRepository.create({
      title: 'org dos catdashiorros',
      email: 's2te2ste@mail.com',
      password_hash: await hash('testsdasde', 6),
      cidade: 'Rio',
      description: null,
      phone: '888333388',
      latitude: -22.8740672,
      longitude: -43.3693162,
    })

    const { pet } = await sut.execute({
      name: 'asdasd',
      idade: '2022-01-01T00:00:00.000Z',
      porte: '3',
      ambiente: '2',
      energia: '1',
      independencia: '3',
      requisitos: ['tem que sair pra passear', 'tem que ter outro cachorro'],
      sobre: '',
      orgId: org.id,
    })

    expect(pet.id).toEqual(expect.any(String))
  })
})
