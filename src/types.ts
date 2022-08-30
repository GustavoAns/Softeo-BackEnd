export interface IPayment {
  number: number,
  value: number,
  paid: boolean,
  method: string,
  limiteDate: string
}

export interface IRegistros {
  _id?: string,
  cpf: string,
  initialDate: string,
  name: string,
  value: number,
  totalInstallments: number,
  payments: IPayment[],
}

export interface IResError {
  error: boolean,
  message?: string
}

export interface IYupError {
  errors: string
}


