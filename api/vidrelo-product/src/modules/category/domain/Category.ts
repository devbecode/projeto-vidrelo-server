export enum CATEGORY_STATUS {
  ACTIVE = 'active',
  INACTIVE = 'inactive',
}

export class Category {
  public id: string;
  public name: string;
  public status: string;
  public createdAt: string;
}
