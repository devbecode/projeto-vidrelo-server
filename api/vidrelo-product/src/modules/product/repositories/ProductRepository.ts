import { getRepository, Repository } from 'typeorm';

import { Gallery } from '@modules/gallery/domain/Gallery';
import { GalleryEntity } from '@modules/gallery/entities/GalleryEntity';
import { AppError } from '@shared/error/AppError';

import { Product, STATUS_PRODUCT } from '../domain/Product';
import { IListProducts, IResponseListAllProducts } from '../dto/ProductDTO';
import { ProductEntity } from '../infra/entities/ProductEntity';
import { IProductRepository } from './IProductRepository';

export class ProductRepository implements IProductRepository {
  private repository: Repository<ProductEntity>;

  constructor() {
    this.repository = getRepository(ProductEntity);
  }

  async loadGalleryByProductId(product: Product): Promise<void> {
    const record = await getRepository(GalleryEntity).find({
      where: { product_id: product.id },
    });

    if (!record) {
      throw new AppError(`No gallery was found to id ${product.id}`, 400);
    }

    // eslint-disable-next-line no-param-reassign
    product.gallery = record;
  }

  async findAllPublic(
    pagination: IListProducts,
  ): Promise<IResponseListAllProducts> {
    const { offset, limit } = pagination;

    const skip: number = offset
      ? (pagination.offset - 1) * pagination.limit
      : undefined;

    const [products, count] = await this.repository
      .createQueryBuilder('product')
      .where('product.status = :status AND product.public = :public', {
        status: STATUS_PRODUCT.ACTIVE,
        public: true,
      })
      .skip(skip)
      .take(pagination.limit)
      .orderBy('product.name')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, products };
  }

  async inactiveById(product: Product): Promise<void> {
    const { affected } = await this.repository.update(
      { id: product.id },
      { status: STATUS_PRODUCT.INACTIVE },
    );

    if (!affected) {
      throw new AppError(`No product was updated to id ${product.id}`, 500);
    }
  }

  async updateById(product: Product): Promise<void> {
    const { name, full_description, short_description, id, installation } =
      product;

    try {
      await this.repository.update(
        { id },
        {
          name,
          full_description,
          short_description,
          installation,
        },
      );

      if (product.gallery) {
        product.gallery.forEach(async (gallery: Gallery) => {
          await getRepository(GalleryEntity).update(
            { id: gallery.id },
            { image: gallery.image },
          );
        });
      }
    } catch (error) {
      throw new AppError(`No product was updated to id ${product.id}`, 500);
    }
  }

  async findById(product: Product): Promise<boolean> {
    const record = await this.repository.findOne({ where: { id: product.id } });

    if (record) {
      Object.assign(product, record);
      return true;
    }

    return false;
  }

  async findAll(pagination: IListProducts): Promise<IResponseListAllProducts> {
    const { offset, limit } = pagination;

    const skip: number = offset
      ? (pagination.offset - 1) * pagination.limit
      : undefined;

    const [products, count] = await this.repository
      .createQueryBuilder('product')
      .where('product.status = :status', { status: STATUS_PRODUCT.ACTIVE })
      .skip(skip)
      .take(pagination.limit)
      .orderBy('product.name')
      .getManyAndCount();

    const metaData = {
      total: count,
      limit,
      page: offset,
    };

    return { metaData, products };
  }

  async save(product: Product): Promise<void> {
    try {
      await this.repository.save(product);

      if (product.gallery) {
        product.gallery.forEach(async (gallery: Gallery) => {
          await getRepository(GalleryEntity).save(gallery);
        });
      }
    } catch (error) {
      throw new AppError(`No product has saved ${error}`, 500);
    }
  }
}
