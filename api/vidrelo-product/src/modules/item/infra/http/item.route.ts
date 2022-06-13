import { Router } from 'express';

import { CreateItemController } from '@modules/item/useCases/create/CreateItemController';
import { ListItensController } from '@modules/item/useCases/list/ListItensController';
import { UpdateItemController } from '@modules/item/useCases/update/UpdateItemController';
import { checkToken } from '@shared/infra/http/middlewares/auth';

const itemRoutes = Router();

const createItem = new CreateItemController();
const listItens = new ListItensController();
const inactivateItem = new UpdateItemController();

itemRoutes.post('/item', checkToken, createItem.create);

itemRoutes.get('/itens', listItens.listAllActive);
itemRoutes.get('/item/:id', checkToken, listItens.findDetailsById);

itemRoutes.delete('/item/:id', checkToken, inactivateItem.inactivate);

export { itemRoutes };
