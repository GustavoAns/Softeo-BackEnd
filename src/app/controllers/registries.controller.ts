import { Request, Response } from 'express'
import { IRegistros } from '../../types'
import { RegistriesServides } from '../services'

export interface RequestWithBody<T> extends Request {
  body: T,
}

export class RegistriesControllers {
  public service

  constructor() {
    this.service = new RegistriesServides()
  }

  public async addRegistry(req: RequestWithBody<IRegistros>, res: Response<IRegistros>): Promise<typeof res> {
    console.log(req.body);
    const registries = await this.service.addRegistry(req.body)
    return res.status(200).json(registries)
  }

  public async listRegistries(_req: Request, res: Response<IRegistros[]>): Promise<typeof res> {
    const registries = await this.service.listRegistries()
    return res.status(200).json(registries)
  }
}