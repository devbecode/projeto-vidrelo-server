import { CategoryEntity } from '../infra/entities/CategoryEntity';

export interface ICreateCategoryDTO {
  id: string;
  name: string;
  status: string;
  createdAt: string;
}

export interface IPaginationDTO {
  offset?: number;
  limit?: number;
}

export interface IResponseListAllCategories {
  metaData: {
    total: number;
    limit: number;
    page: number;
  };

  categories: Array<CategoryEntity>;
}
