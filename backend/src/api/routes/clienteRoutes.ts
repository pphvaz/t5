import { Router } from 'express';
import ClienteController from '../controllers/clienteController';

const router = Router();
const clienteController = new ClienteController();

// GET /api/clientes - List all clients
router.get('/', clienteController.listarTodos);

// GET /api/clientes/cpf/:cpf - Get client by CPF
router.get('/cpf/:cpf', clienteController.buscarPorCpf);

// GET /api/clientes/:cpf/pets - Get client's pets by CPF
router.get('/:cpf/pets', clienteController.listarPets);

// GET /api/clientes/:cpf/consumo - Get client's consumption by CPF
router.get('/:cpf/consumo', clienteController.listarConsumo);

// GET /api/clientes/:id - Get client by ID
router.get('/:id', clienteController.buscarPorId);

// POST /api/clientes - Create new client
router.post('/', clienteController.cadastrar);

// PUT /api/clientes/:id - Update client
router.put('/:id', clienteController.atualizar);

// DELETE /api/clientes/:id - Delete client
router.delete('/:id', clienteController.excluir);

export default router; 