import { Request, Response } from 'express'
import { ValidRegistry } from '../../api/middleware'
import { IRegistros, IResError, IYupError } from '../../types'
import { RegistriesServides } from '../services'

export interface RequestWithBody<T> extends Request {
  body: T,
}

export class RegistriesControllers {
  public service
  public middleware

  constructor() {
    this.service = new RegistriesServides()
    this.middleware = new ValidRegistry()
  }
  public async removeRegistryById(req: Request, res: Response<IRegistros | IResError>): Promise<typeof res> {
    if (!req.params?.id) {
      return res.status(400).json({error: true, message: '_id não informado'}) 
    }
    const registries = await this.service.removeRegistryById(req.params.id)
    if (registries === null) {
      return res.status(404).json({ error: true, message: '_id não encontrado' })
    } else {
      return res.status(200).json(registries)
    }
  }

  public async editRegistryById(req: Request, res: Response<IRegistros | IResError>): Promise<typeof res> {
    if (!(await this.middleware.validBoolean(req.body))) {
      return res.status(400).json({error: true, message: 'Inputs Inválidos'}) 
    }
    const registries = await this.service.editRegistryById(req.body, req.params.id)
    if (registries === null) {
      return res.status(404).json({ error: true, message: '_id não encontrado' })
    } else {
      return res.status(200).json(registries)
    }
  }

  public async addRegistry(req: RequestWithBody<IRegistros>, res: Response<IRegistros | IResError>): Promise<typeof res> {
    if (!(await this.middleware.validBoolean(req.body))) {
      return res.status(400).json({error: true, message: 'Inputs Inválidos'}) 
    }
    const registries = await this.service.addRegistry(req.body)
    return res.status(200).json(registries)
  }

  public async listRegistries(_req: Request, res: Response<IRegistros[]>): Promise<typeof res> {
    const registries = await this.service.listRegistries()
    return res.status(200).json(registries)
  }
}