import { Request, Response } from 'express';
import { Op, fn, col } from 'sequelize';
import Cliente from '../../modelo/clienteModel';
import Pet from '../../modelo/petModel';
import Produto from '../../modelo/produtoModel';
import Servico from '../../modelo/servicoModel';
import Consumo from '../../modelo/consumoModel';

export default class ListagemController {
  public async top10ClientesPorQuantidade(req: Request, res: Response) {
    try {
      const clientes = await Cliente.findAll({
        include: [{
          model: Consumo,
          as: 'consumos',
          attributes: []
        }],
        attributes: [
          'id',
          'nome',
          'cpf',
          [fn('COUNT', col('consumos.id')), 'quantidadeConsumos']
        ],
        group: ['Cliente.id'],
        order: [[fn('COUNT', col('consumos.id')), 'DESC']],
        limit: 10
      });

      res.json({
        success: true,
        data: clientes.map(cliente => ({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
          quantidadeConsumos: cliente.getDataValue('quantidadeConsumos')
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de top 10 clientes por quantidade'
      });
    }
  }

  public async top5ClientesPorValor(req: Request, res: Response) {
    try {
      const clientes = await Cliente.findAll({
        include: [{
          model: Consumo,
          as: 'consumos',
          attributes: []
        }],
        attributes: [
          'id',
          'nome',
          'cpf',
          [fn('SUM', col('consumos.valor')), 'valorTotal']
        ],
        group: ['Cliente.id'],
        order: [[fn('SUM', col('consumos.valor')), 'DESC']],
        limit: 5
      });

      res.json({
        success: true,
        data: clientes.map(cliente => ({
          id: cliente.id,
          nome: cliente.nome,
          cpf: cliente.cpf,
          valorTotal: parseFloat(cliente.getDataValue('valorTotal') || '0')
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de top 5 clientes por valor'
      });
    }
  }

  public async produtosMaisConsumidos(req: Request, res: Response) {
    try {
      const produtos = await Produto.findAll({
        include: [{
          model: Consumo,
          as: 'consumos',
          attributes: []
        }],
        attributes: [
          'id',
          'nome',
          'preco',
          [fn('COUNT', col('consumos.id')), 'quantidadeConsumos'],
          [fn('SUM', col('consumos.valor')), 'valorTotal']
        ],
        group: ['Produto.id'],
        order: [[fn('COUNT', col('consumos.id')), 'DESC']],
        limit: 10
      });

      res.json({
        success: true,
        data: produtos.map(produto => ({
          id: produto.id,
          nome: produto.nome,
          preco: produto.preco,
          quantidadeConsumos: produto.getDataValue('quantidadeConsumos'),
          valorTotal: parseFloat(produto.getDataValue('valorTotal') || '0')
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de produtos mais consumidos'
      });
    }
  }

  public async servicosMaisConsumidos(req: Request, res: Response) {
    try {
      const servicos = await Servico.findAll({
        include: [{
          model: Consumo,
          as: 'consumos',
          attributes: []
        }],
        attributes: [
          'id',
          'nome',
          'preco',
          'tipo',
          [fn('COUNT', col('consumos.id')), 'quantidadeConsumos'],
          [fn('SUM', col('consumos.valor')), 'valorTotal']
        ],
        group: ['Servico.id'],
        order: [[fn('COUNT', col('consumos.id')), 'DESC']],
        limit: 10
      });

      res.json({
        success: true,
        data: servicos.map(servico => ({
          id: servico.id,
          nome: servico.nome,
          preco: servico.preco,
          tipo: servico.tipo,
          quantidadeConsumos: servico.getDataValue('quantidadeConsumos'),
          valorTotal: parseFloat(servico.getDataValue('valorTotal') || '0')
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de serviços mais consumidos'
      });
    }
  }

  public async consumoPorTipoRaca(req: Request, res: Response) {
    try {
      const pets = await Pet.findAll({
        include: [{
          model: Consumo,
          as: 'consumos',
          attributes: []
        }],
        attributes: [
          'id',
          'nome',
          'tipo',
          'raca',
          [fn('COUNT', col('consumos.id')), 'quantidadeConsumos'],
          [fn('SUM', col('consumos.valor')), 'valorTotal']
        ],
        group: ['Pet.id'],
        order: [[fn('SUM', col('consumos.valor')), 'DESC']],
        limit: 20
      });

      res.json({
        success: true,
        data: pets.map(pet => ({
          id: pet.id,
          nome: pet.nome,
          tipo: pet.tipo,
          raca: pet.raca,
          quantidadeConsumos: pet.getDataValue('quantidadeConsumos'),
          valorTotal: parseFloat(pet.getDataValue('valorTotal') || '0')
        }))
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao gerar relatório de consumo por tipo e raça'
      });
    }
  }
} 