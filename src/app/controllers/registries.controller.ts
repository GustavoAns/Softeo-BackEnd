import { Request, Response } from 'express'
import { IRegistros, IResError } from '../../types'
import { RegistriesServides } from '../services'

export interface RequestWithBody<T> extends Request {
  body: T,
}

export class RegistriesControllers {
  public service

  constructor() {
    this.service = new RegistriesServides()
  }
  public async removeRegistryById(req: Request, res: Response<IRegistros | IResError>): Promise<typeof res> {
    const registries = await this.service.removeRegistryById(req.params.id)
    if (!registries) {
      return res.status(404).json({ error: '_id não encontrado' })
    } else {
      return res.status(200).json(registries)
    }
  }

  public async editRegistryById(req: Request, res: Response<IRegistros | IResError>): Promise<typeof res> {
    const registries = await this.service.editRegistryById(req.body, req.params.id)
    if (!registries) {
      return res.status(404).json({ error: '_id não encontrado' })
    } else {
      return res.status(200).json(registries)
    }
  }

  public async addRegistry(req: RequestWithBody<IRegistros>, res: Response<IRegistros>): Promise<typeof res> {
    const registries = await this.service.addRegistry(req.body)
    return res.status(200).json(registries)
  }

  public async listRegistries(_req: Request, res: Response<IRegistros[]>): Promise<typeof res> {
    const registries = await this.service.listRegistries()
    return res.status(200).json(registries)
  }

}