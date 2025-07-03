import { Router } from 'express';
import ProdutoController from '../controllers/produtoController';

const router = Router();
const produtoController = new ProdutoController();

// GET /api/produtos - List all products
router.get('/', produtoController.listarTodos);

// GET /api/produtos/:nome - Get product by name
router.get('/:nome', produtoController.buscarPorNome);

// POST /api/produtos - Create new product
router.post('/', produtoController.cadastrar);

// PUT /api/produtos/:nome - Update product
router.put('/:nome', produtoController.atualizar);

// DELETE /api/produtos/:nome - Delete product
router.delete('/:nome', produtoController.excluir);

export default router; 