import { IRegistros } from '../../types'
import { RegistriesModels } from '../models'

export class RegistriesServides {
  constructor(public model = new RegistriesModels()) { }
  
  public async addRegistry(obj: IRegistros): Promise<IRegistros> {
    const Registries = await this.model.addRegistry(obj)
    return Registries
  }

  public async listRegistries(): Promise<IRegistros[]> {
    const Registries = await this.model.listRegistries()
    return Registries
  }
}