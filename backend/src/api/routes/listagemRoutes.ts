import { Router } from 'express';
import ListagemController from '../controllers/listagemController';

const router = Router();
const listagemController = new ListagemController();

// GET /api/listagens/top10-clientes-quantidade - Top 10 clients by consumption quantity
router.get('/top10-clientes-quantidade', listagemController.top10ClientesPorQuantidade);

// GET /api/listagens/top5-clientes-valor - Top 5 clients by spending
router.get('/top5-clientes-valor', listagemController.top5ClientesPorValor);

// GET /api/listagens/produtos-mais-consumidos - Most consumed products
router.get('/produtos-mais-consumidos', listagemController.produtosMaisConsumidos);

// GET /api/listagens/servicos-mais-consumidos - Most consumed services
router.get('/servicos-mais-consumidos', listagemController.servicosMaisConsumidos);

// GET /api/listagens/consumo-por-tipo-raca - Consumption by pet type and breed
router.get('/consumo-por-tipo-raca', listagemController.consumoPorTipoRaca);

export default router; 