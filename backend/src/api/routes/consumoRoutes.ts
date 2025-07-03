import { Router } from 'express';
import ConsumoController from '../controllers/consumoController';

const router = Router();
const consumoController = new ConsumoController();

// POST /api/consumo/produto - Register product consumption
router.post('/produto', consumoController.registrarProduto);

// POST /api/consumo/servico - Register service consumption
router.post('/servico', consumoController.registrarServico);

export default router; 