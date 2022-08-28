import { IRegistros } from '../../types'
import { RegistriesModels } from '../models'

export class RegistriesServides {
  constructor(public model = new RegistriesModels()) { }

  public async editRegistryById(obj: IRegistros, id:string): Promise<IRegistros | null> {
    const Registries = await this.model.editRegistryById(obj, id)
    return Registries
  }
  
  public async addRegistry(obj: IRegistros): Promise<IRegistros> {
    const Registries = await this.model.addRegistry(obj)
    return Registries
  }

  public async listRegistries(): Promise<IRegistros[]> {
    const Registries = await this.model.listRegistries()
    return Registries
  }
}