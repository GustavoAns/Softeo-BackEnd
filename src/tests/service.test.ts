import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { RegistriesServides } from '../app/services'

const mockObj = {
    "_id": "6309251bc9f2634ef681c774",
    "cpf": 12345678910,
    "initialDate": "2022-08-26T19:55:04.800Z",
    "name": "Gustavo Anselmo",
    "value": 100,
    "totalInstallments": 2,
    "payments": [
        {
            "number": 1,
            "value": 50,
            "paid": true,
            "method": 'Cartão de Debito',
            "limiteDate": "2022-09-26T19:55:04.800Z"
        },
        {
            "number": 2,
            "value": 0,
            "paid": false,
            "method": "",
            "limiteDate": "2022-10-26T19:55:04.800Z"
        }
    ]
  }
const mockList = [mockObj]

use(chaiAsPromised)

describe('app/services/registries.services.ts', () => {
  let registriesService = new RegistriesServides()
  describe('listRegistries', () => {
    before(() => {
      sinon.stub(registriesService.model, 'listRegistries').resolves(mockList)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna um lista de registros', async () => {
      const profiles = await registriesService.listRegistries()
      expect(profiles).to.be.deep.equal(mockList)
    })
  })

  describe('addRegistry', () => {
    before(() => {
      sinon.stub(registriesService.model, 'addRegistry').resolves(mockObj)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o registro criado', async () => {
      const profiles = await registriesService.addRegistry(mockObj)
      expect(profiles).to.be.deep.equal(mockObj)
    })
  })

  describe('editRegistryById', () => {
    before(() => {
      sinon.stub(registriesService.model, 'editRegistryById').resolves(mockObj)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o registro editado', async () => {
      const profiles = await registriesService.editRegistryById(mockObj, mockObj._id)
      expect(profiles).to.be.deep.equal(mockObj)
    })
  })

  describe('removeRegistryById', () => {
    before(() => {
      sinon.stub(registriesService.model, 'removeRegistryById').resolves(mockObj)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o registro deletado', async () => {
      const profiles = await registriesService.removeRegistryById(mockObj._id)
      expect(profiles).to.be.deep.equal(mockObj)
    })
  })
})