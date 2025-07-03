import { Request, Response } from 'express';
import Consumo from '../../modelo/consumoModel';
import Cliente from '../../modelo/clienteModel';
import Pet from '../../modelo/petModel';
import Produto from '../../modelo/produtoModel';
import Servico from '../../modelo/servicoModel';

export default class ConsumoController {
  public async registrarProduto(req: Request, res: Response) {
    try {
      const { cpfCliente, petId, produtoNome, quantidade } = req.body;

      if (!cpfCliente || !petId || !produtoNome || !quantidade) {
        return res.status(400).json({
          success: false,
          error: 'CPF do cliente, ID do pet, nome do produto e quantidade são obrigatórios'
        });
      }

      const cliente = await Cliente.findOne({ where: { cpf: cpfCliente } });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const pet = await Pet.findOne({ where: { id: petId, clienteId: cliente.id } });
      if (!pet) {
        return res.status(404).json({
          success: false,
          error: 'Pet não encontrado'
        });
      }

      const produto = await Produto.findOne({ where: { nome: produtoNome } });
      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      const valor = produto.preco * quantidade;

      const consumo = await Consumo.create({
        clienteId: cliente.id,
        petId: pet.id,
        tipo: 'produto',
        produtoId: produto.id,
        quantidade,
        valor,
        data: new Date()
      });

      res.status(201).json({
        success: true,
        message: 'Consumo de produto registrado com sucesso',
        data: {
          id: consumo.id,
          cliente: cliente.nome,
          pet: pet.nome,
          produto: produto.nome,
          quantidade,
          valor,
          data: consumo.data
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao registrar consumo de produto'
      });
    }
  }

  public async registrarServico(req: Request, res: Response) {
    try {
      const { cpfCliente, petId, servicoNome, quantidade } = req.body;

      if (!cpfCliente || !petId || !servicoNome || !quantidade) {
        return res.status(400).json({
          success: false,
          error: 'CPF do cliente, ID do pet, nome do serviço e quantidade são obrigatórios'
        });
      }

      const cliente = await Cliente.findOne({ where: { cpf: cpfCliente } });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const pet = await Pet.findOne({ where: { id: petId, clienteId: cliente.id } });
      if (!pet) {
        return res.status(404).json({
          success: false,
          error: 'Pet não encontrado'
        });
      }

      const servico = await Servico.findOne({ where: { nome: servicoNome } });
      if (!servico) {
        return res.status(404).json({
          success: false,
          error: 'Serviço não encontrado'
        });
      }

      const valor = servico.preco * quantidade;

      const consumo = await Consumo.create({
        clienteId: cliente.id,
        petId: pet.id,
        tipo: 'servico',
        servicoId: servico.id,
        quantidade,
        valor,
        data: new Date()
      });

      res.status(201).json({
        success: true,
        message: 'Consumo de serviço registrado com sucesso',
        data: {
          id: consumo.id,
          cliente: cliente.nome,
          pet: pet.nome,
          servico: servico.nome,
          quantidade,
          valor,
          data: consumo.data
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao registrar consumo de serviço'
      });
    }
  }
} 