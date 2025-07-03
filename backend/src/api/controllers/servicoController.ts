import { Request, Response } from 'express';
import Servico from '../../modelo/servicoModel';

export default class ServicoController {
  public async listarTodos(req: Request, res: Response) {
    try {
      const servicos = await Servico.findAll();
      res.json({
        success: true,
        data: servicos,
        count: servicos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar serviços'
      });
    }
  }

  public async buscarPorNome(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const servico = await Servico.findOne({ where: { nome } });

      if (!servico) {
        return res.status(404).json({
          success: false,
          error: 'Serviço não encontrado'
        });
      }

      res.json({
        success: true,
        data: servico
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar serviço'
      });
    }
  }

  public async cadastrar(req: Request, res: Response) {
    try {
      const { nome, preco, tipo } = req.body;

      if (!nome || !preco || !tipo) {
        return res.status(400).json({
          success: false,
          error: 'Nome, preço e tipo são obrigatórios'
        });
      }

      const servicoExistente = await Servico.findOne({ where: { nome } });
      if (servicoExistente) {
        return res.status(409).json({
          success: false,
          error: 'Serviço com este nome já existe'
        });
      }

      const servico = await Servico.create({
        nome,
        preco,
        tipo
      });

      res.status(201).json({
        success: true,
        message: 'Serviço cadastrado com sucesso',
        data: servico
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao cadastrar serviço'
      });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const { preco, tipo } = req.body;

      const servico = await Servico.findOne({ where: { nome } });
      if (!servico) {
        return res.status(404).json({
          success: false,
          error: 'Serviço não encontrado'
        });
      }

      // Atualizar campos se fornecidos
      if (preco !== undefined) {
        servico.preco = preco;
      }
      if (tipo !== undefined) {
        servico.tipo = tipo;
      }

      await servico.save();

      res.json({
        success: true,
        message: 'Serviço atualizado com sucesso',
        data: servico
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar serviço'
      });
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const servico = await Servico.findOne({ where: { nome } });

      if (!servico) {
        return res.status(404).json({
          success: false,
          error: 'Serviço não encontrado'
        });
      }

      await servico.destroy();

      res.json({
        success: true,
        message: 'Serviço excluído com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao excluir serviço'
      });
    }
  }
} 