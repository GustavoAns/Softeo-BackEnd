import { expect, use } from 'chai'
import chaiAsPromised from 'chai-as-promised'
import sinon from 'sinon'
import { RegistriesControllers } from '../app/controllers'

const req: any = { params: { id: "6309251bc9f2634ef681c774" } }
const reqEmpty: any = {}

const res: any = {}

const mockObj = {
    "_id": "6309251bc9f2634ef681c774",
    "cpf": '12345678910',
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

describe('app/controllers/registries.controller.ts', () => {
  let registriesController = new RegistriesControllers()
  describe('listRegistries', () => {
    before(() => {
      req.body = {mockObj}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res);
      sinon.stub(registriesController.service, 'listRegistries').resolves(mockList)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o status 200', async () => {
      await registriesController.listRegistries(req, res)
      expect(res.status.calledWith(200)).to.be.equals(true)
    })
    it('Retorna o json esperado', async () => {
      await registriesController.listRegistries(req, res)
      expect(res.json.calledWith(mockList)).to.be.equals(true)
    })
  })

  describe('addRegistry', () => {
    before(() => {
      req.body = {mockObj}
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res);
      sinon.stub(registriesController.middleware, 'validBoolean').resolves(true);
      sinon.stub(registriesController.service, 'addRegistry').resolves(mockObj)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o status 200', async () => {
      await registriesController.addRegistry(req, res)
      expect(res.status.calledWith(200)).to.be.equals(true)
    })
    it('Retorna o json esperado', async () => {
      await registriesController.addRegistry(req, res)
      expect(res.json.calledWith(mockObj)).to.be.equals(true)
    })
  })
  
  describe('editRegistryById', () => {
    before(() => {
      req.body = { mockObj }
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res);
      sinon.stub(registriesController.middleware, 'validBoolean').resolves(true)
      sinon.stub(registriesController.service, 'editRegistryById').resolves(mockObj)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o status 200', async () => {
      await registriesController.editRegistryById(req, res)
      expect(res.status.calledWith(200)).to.be.equals(true)
    })
    it('Retorna o json esperado', async () => {
      await registriesController.editRegistryById(req, res)
      expect(res.json.calledWith(mockObj)).to.be.equals(true)
    })
  })

  describe('removeRegistryById', () => {
    before(() => {
      req.body = { mockObj }
      req.params.id = mockObj._id
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res);
      sinon.stub(registriesController.service, 'removeRegistryById').resolves(mockObj)
    });

    after(() => {
      sinon.restore()
    })
    it('Retorna o status 200', async () => {
      await registriesController.removeRegistryById(req, res)
      expect(res.status.calledWith(200)).to.be.equals(true)
    })
    it('Retorna o json esperado', async () => {
      await registriesController.removeRegistryById(req, res)
      expect(res.json.calledWith(mockObj)).to.be.equals(true)
    })
  })

  describe('Testando os casos de erro', () => {
    before(() => {
      req.params.id = mockObj._id
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res);
      sinon.stub(registriesController.middleware, 'validBoolean').resolves(false);
      sinon.stub(registriesController.service, 'addRegistry').resolves(mockObj)
      sinon.stub(registriesController.service, 'editRegistryById').resolves(null)
      sinon.stub(registriesController.service, 'removeRegistryById').resolves(null)
    });

    after(() => {
      sinon.restore()
    })
    it('addRegistry - Retorna o status 400', async () => {
      await registriesController.addRegistry(req, res)
      expect(res.status.calledWith(400)).to.be.equals(true)
    })

    it('removeRegistryById - Retorna o status 404', async () => {
      await registriesController.removeRegistryById(req, res)
      expect(res.status.calledWith(404)).to.be.equals(true)
    })

    it('removeRegistryById - Retorna o status 404', async () => {
      await registriesController.removeRegistryById(reqEmpty, res)
      expect(res.status.calledWith(400)).to.be.equals(true)
    })
     it('editRegistryById - Retorna o status 400', async () => {
      await registriesController.editRegistryById(req, res)
      expect(res.status.calledWith(400)).to.be.equals(true)
    })
  })

  describe('Testando o caso de erro com variavel inical conflitante', () => {
    before(() => {
      req.params.id = mockObj._id
      res.status = sinon.stub().returns(res)
      res.json = sinon.stub().returns(res);
      sinon.stub(registriesController.middleware, 'validBoolean').resolves(true);
      sinon.stub(registriesController.service, 'editRegistryById').resolves(null)

    });

    after(() => {
      sinon.restore()
    })
    it('editRegistryById - Retorna o status 404', async () => {
      await registriesController.editRegistryById(req, res)
      expect(res.status.calledWith(404)).to.be.equals(true)
    })
  })
})