import { Request, Response } from 'express';
import Pet from '../../modelo/petModel';
import Cliente from '../../modelo/clienteModel';

export default class PetController {
  public async listarTodos(req: Request, res: Response) {
    try {
      const pets = await Pet.findAll({
        include: [{ model: Cliente, as: 'dono' }]
      });

      const petsFormatados = pets.map(pet => {
        const petWithDono = pet as any;
        return {
          id: pet.id,
          nome: pet.nome,
          tipo: pet.tipo,
          raca: pet.raca,
          genero: pet.genero,
          dono: petWithDono.dono ? {
            id: petWithDono.dono.id,
            nome: petWithDono.dono.nome,
            cpf: petWithDono.dono.cpf,
            rg: petWithDono.dono.rg,
            dataCadastro: petWithDono.dono.dataCadastro,
            telefone: petWithDono.dono.telefone
          } : null
        };
      });

      res.json({
        success: true,
        data: petsFormatados,
        count: petsFormatados.length
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao listar pets'
      });
    }
  }

  public async cadastrar(req: Request, res: Response) {
    try {
      const { cpfCliente, nome, tipo, raca, genero } = req.body;

      if (!cpfCliente || !nome || !tipo || !raca || !genero) {
        return res.status(400).json({
          success: false,
          error: 'CPF do cliente, nome, tipo, raça e gênero são obrigatórios'
        });
      }

      const cliente = await Cliente.findOne({ where: { cpf: cpfCliente } });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const pet = await Pet.create({
        nome,
        tipo,
        raca,
        genero,
        clienteId: cliente.id
      });

      res.status(201).json({
        success: true,
        message: 'Pet cadastrado com sucesso',
        data: {
          id: pet.id,
          nome: pet.nome,
          tipo: pet.tipo,
          raca: pet.raca,
          genero: pet.genero,
          cliente: cliente.nome
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao cadastrar pet'
      });
    }
  }

  public async excluir(req: Request, res: Response) {
    try {
      const { cpf, petId } = req.params;

      const cliente = await Cliente.findOne({ where: { cpf } });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const pet = await Pet.findOne({ 
        where: { id: petId, clienteId: cliente.id } 
      });
      
      if (!pet) {
        return res.status(404).json({
          success: false,
          error: 'Pet não encontrado'
        });
      }

      await pet.destroy();

      res.json({
        success: true,
        message: 'Pet excluído com sucesso'
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao excluir pet'
      });
    }
  }

  public async buscarPorId(req: Request, res: Response) {
    try {
      const { cpf, petId } = req.params;

      const cliente = await Cliente.findOne({ where: { cpf } });
      if (!cliente) {
        return res.status(404).json({
          success: false,
          error: 'Cliente não encontrado'
        });
      }

      const pet = await Pet.findOne({ 
        where: { id: petId, clienteId: cliente.id },
        include: [{ model: Cliente, as: 'dono' }]
      });
      
      if (!pet) {
        return res.status(404).json({
          success: false,
          error: 'Pet não encontrado'
        });
      }

      res.json({
        success: true,
        data: {
          id: pet.id,
          nome: pet.nome,
          tipo: pet.tipo,
          raca: pet.raca,
          genero: pet.genero,
          cliente: cliente.nome,
          cpfCliente: cliente.cpf
        }
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro ao buscar pet'
      });
    }
  }

  public async listarPorCliente(req: Request, res: Response) {
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

      const petsFormatados = pets.map((pet, index) => ({
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
} 