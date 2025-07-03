import { Request, Response } from 'express';
import Cliente from '../../modelo/clienteModel';
import Pet from '../../modelo/petModel';
import Consumo from '../../modelo/consumoModel';
import Produto from '../../modelo/produtoModel';
import Servico from '../../modelo/servicoModel';

export default class ClienteController {
  public async listarTodos(req: Request, res: Response) {
    try {
      const clientes = await Cliente.findAll();
      res.json({ success: true, data: clientes });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao listar clientes' });
    }
  }

  public async buscarPorId(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
      }
      res.json({ success: true, data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao buscar cliente' });
    }
  }

  public async buscarPorCpf(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const cliente = await Cliente.findOne({ where: { cpf } });
      if (!cliente) {
        return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
      }
      res.json({ success: true, data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao buscar cliente' });
    }
  }

  public async cadastrar(req: Request, res: Response) {
    try {
      const { nome, cpf, rg, telefone } = req.body;
      if (!nome || !cpf || !rg || !telefone) {
        return res.status(400).json({ success: false, error: 'Campos obrigatórios não preenchidos' });
      }
      const cliente = await Cliente.create({ nome, cpf, rg, telefone, dataCadastro: new Date() });
      res.status(201).json({ success: true, data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao cadastrar cliente' });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const { nome, cpf, rg, telefone } = req.body;
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
      }
      await cliente.update({ nome, cpf, rg, telefone });
      res.json({ success: true, data: cliente });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao atualizar cliente' });
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const cliente = await Cliente.findByPk(id);
      if (!cliente) {
        return res.status(404).json({ success: false, error: 'Cliente não encontrado' });
      }
      await cliente.destroy();
      res.json({ success: true, message: 'Cliente excluído com sucesso' });
    } catch (error) {
      res.status(500).json({ success: false, error: 'Erro ao excluir cliente' });
    }
  }

  public async listarPets(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const cliente = await Cliente.findOne({ where: { cpf } });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const pets = await Pet.findAll({ 
        where: { clienteId: cliente.id },
        include: [{ model: Cliente, as: 'dono' }]
      });

      const petsFormatados = pets.map(pet => ({
        id: pet.id,
        nome: pet.nome,
        tipo: pet.tipo,
        raca: pet.raca,
        genero: pet.genero
      }));

      res.json({
        success: true,
        data: petsFormatados,
        count: petsFormatados.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar pets do cliente'
      });
    }
  }

  public async listarConsumo(req: Request, res: Response) {
    try {
      const { cpf } = req.params;
      const cliente = await Cliente.findOne({ where: { cpf } });

      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const consumos = await Consumo.findAll({
        where: { clienteId: cliente.id }
      });

      // Buscar produtos e serviços separadamente
      const produtos = await Produto.findAll({
        where: { id: consumos.filter(c => c.produtoId).map(c => c.produtoId!) }
      });

      const servicos = await Servico.findAll({
        where: { id: consumos.filter(c => c.servicoId).map(c => c.servicoId!) }
      });

      const consumoFormatado = {
        produtos: consumos
          .filter(c => c.tipo === 'produto')
          .map(c => {
            const produto = produtos.find(p => p.id === c.produtoId);
            return {
              id: c.id,
              nome: produto?.nome,
              preco: produto?.preco,
              quantidade: c.quantidade,
              valor: c.valor,
              data: c.data
            };
          }),
        servicos: consumos
          .filter(c => c.tipo === 'servico')
          .map(c => {
            const servico = servicos.find(s => s.id === c.servicoId);
            return {
              id: c.id,
              nome: servico?.nome,
              preco: servico?.preco,
              tipo: servico?.tipo,
              quantidade: c.quantidade,
              valor: c.valor,
              data: c.data
            };
          }),
        totalGeral: consumos.reduce((total, c) => total + c.valor, 0),
        quantidadeTotal: consumos.length
      };

      res.json({
        success: true,
        data: consumoFormatado
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar consumo do cliente'
      });
    }
  }
} 