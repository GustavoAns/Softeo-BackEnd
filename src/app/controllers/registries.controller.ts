import { Request, Response } from 'express'
import { IRegistros } from '../../types'
import { RegistriesServides } from '../services'

export class RegistriesControllers {
  public service

  constructor() {
    this.service = new RegistriesServides()
  }

  public async listRegistries(_req: Request, res: Response<IRegistros[]>): Promise<typeof res> {
    const registries = await this.service.listRegistries()
    return res.status(200).json(registries)
  }
}