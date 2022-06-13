import { Router } from 'express';

import { CreateProductController } from '@modules/product/useCases/createProduct/CreateProductContoller';
import { ListProductsController } from '@modules/product/useCases/listProducts/ListProductsController';
import { UpdateProductController } from '@modules/product/useCases/updateProduct/UpdateProductController';
import { checkToken } from '@shared/infra/http/middlewares/auth';

const productRoutes = Router();

const createProductController = new CreateProductController();
const listAll = new ListProductsController();
const updateProduct = new UpdateProductController();

productRoutes.get('/public/products', listAll.listAllPublic);

productRoutes.get('/product/:id', listAll.findDetailsById);
productRoutes.get('/products', checkToken, listAll.listAll);
productRoutes.post('/product', checkToken, createProductController.create);
productRoutes.patch('/product/:id', checkToken, updateProduct.updateById);
productRoutes.delete('/product/:id', checkToken, updateProduct.inactive);

export { productRoutes };
