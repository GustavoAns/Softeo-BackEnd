export interface IPayment {
  number: number,
  value: number 
  paid: boolean,
  limiteDate: string
}

export interface IRegistros {
  _id?: number,
  cpf: number,
  initialDate: string,
  name: string,
  value: number,
  totalInstallments: number,
  payments: IPayment[],
}

