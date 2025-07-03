import { Router } from 'express';
import PetController from '../controllers/petController';

const router = Router();
const petController = new PetController();

// GET /api/pets - List all pets
router.get('/', petController.listarTodos);

// POST /api/pets - Register new pet for a client
router.post('/', petController.cadastrar);

// GET /api/pets/:cpf/:petId - Get specific pet (deve vir antes de /:cpf)
router.get('/:cpf/:petId', petController.buscarPorId);

// GET /api/pets/:cpf - Get all pets from a client
router.get('/:cpf', petController.listarPorCliente);

// DELETE /api/pets/:cpf/:petId - Delete pet
router.delete('/:cpf/:petId', petController.excluir);

export default router; 