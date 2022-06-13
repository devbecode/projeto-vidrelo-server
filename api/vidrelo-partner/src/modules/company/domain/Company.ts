export enum STATUS_COMPANY {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class Company {
  public id: string;
  public corporate_name: string;
  public status: string;
  public responsible: string;
  public cnpj: string;
  public telephone: string;
  public email: string;
  public cep: string;
  public state: string;
  public city: string;
  public district: string;
  public street: string;
  public number: string;
  public complement: string;
  public created_at: string;
}
