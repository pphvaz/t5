import { Request, Response } from 'express';
import Produto from '../../modelo/produtoModel';

export default class ProdutoController {
  public async listarTodos(req: Request, res: Response) {
    try {
      const produtos = await Produto.findAll();
      res.json({
        success: true,
        data: produtos,
        count: produtos.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar produtos'
      });
    }
  }

  public async buscarPorNome(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const produto = await Produto.findOne({ where: { nome } });

      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      res.json({
        success: true,
        data: produto
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar produto'
      });
    }
  }

  public async cadastrar(req: Request, res: Response) {
    try {
      const { nome, preco, quantidade } = req.body;

      if (!nome || !preco) {
        return res.status(400).json({
          success: false,
          error: 'Nome e preço são obrigatórios'
        });
      }

      const produtoExistente = await Produto.findOne({ where: { nome } });
      if (produtoExistente) {
        return res.status(409).json({
          success: false,
          error: 'Produto com este nome já existe'
        });
      }

      const produto = await Produto.create({
        nome,
        preco,
        quantidade: quantidade || 1
      });

      res.status(201).json({
        success: true,
        message: 'Produto cadastrado com sucesso',
        data: produto
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao cadastrar produto'
      });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const { preco, quantidade } = req.body;

      const produto = await Produto.findOne({ where: { nome } });
      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      // Atualizar campos se fornecidos
      if (preco !== undefined) {
        produto.preco = preco;
      }
      if (quantidade !== undefined) {
        produto.quantidade = quantidade;
      }

      await produto.save();

      res.json({
        success: true,
        message: 'Produto atualizado com sucesso',
        data: produto
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao atualizar produto'
      });
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const { nome } = req.params;
      const produto = await Produto.findOne({ where: { nome } });

      if (!produto) {
        return res.status(404).json({
          success: false,
          error: 'Produto não encontrado'
        });
      }

      await produto.destroy();

      res.json({
        success: true,
        message: 'Produto excluído com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao excluir produto'
      });
    }
  }
} 