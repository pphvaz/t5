import { Router } from 'express';
import ServicoController from '../controllers/servicoController';

const router = Router();
const servicoController = new ServicoController();

// GET /api/servicos - List all services
router.get('/', servicoController.listarTodos);

// GET /api/servicos/:nome - Get service by name
router.get('/:nome', servicoController.buscarPorNome);

// POST /api/servicos - Create new service
router.post('/', servicoController.cadastrar);

// PUT /api/servicos/:nome - Update service
router.put('/:nome', servicoController.atualizar);

// DELETE /api/servicos/:nome - Delete service
router.delete('/:nome', servicoController.excluir);

export default router; 