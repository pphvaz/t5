import { Component } from 'react';
import BarraNavegacao from './componentes/barraNavegacao';
import ListaCliente from './componentes/listaClientes';
import FormularioCadastroCliente from './componentes/formularioCadastroCliente';
import ListaPets from './componentes/listaPets';
import FormularioCadastroPet from './componentes/formularioCadastroPet';
import ListaProdutos from './componentes/listaProdutos';
import FormularioCadastroProduto from './componentes/formularioCadastroProduto';
import ListaServicos from './componentes/listaServicos';
import FormularioCadastroServico from './componentes/formularioCadastroServico';
import ListaConsumos from './componentes/listaConsumos';
import FormularioCadastroConsumo from './componentes/formularioCadastroConsumo';
import Relatorios from './componentes/relatorios';
import { Cliente } from './types/cliente';
import { Pet } from './types/pet';
import { Produto } from './types/produto';
import { Servico } from './types/servico';
import { Consumo } from './types/consumo';
import { clientesApi, petsApi, produtosApi, servicosApi, consumoApi } from './api';

type State = {
  tema: string,
  view: string,
  clienteParaEditar?: Cliente,
  petParaEditar?: Pet,
  produtoParaEditar?: Produto,
  servicoParaEditar?: Servico
}

export default class App extends Component<{}, State> {
  constructor(props: {}) {
    super(props)
    this.state = {
      tema: '#ffffff',
      view: 'Clientes-Listar'
    }
    this.seletorView = this.seletorView.bind(this)
    this.handleEditarCliente = this.handleEditarCliente.bind(this)
    this.handleClienteSubmit = this.handleClienteSubmit.bind(this)
    this.handleEditarPet = this.handleEditarPet.bind(this)
    this.handlePetSubmit = this.handlePetSubmit.bind(this)
    this.handleEditarProduto = this.handleEditarProduto.bind(this)
    this.handleProdutoSubmit = this.handleProdutoSubmit.bind(this)
    this.handleEditarServico = this.handleEditarServico.bind(this)
    this.handleServicoSubmit = this.handleServicoSubmit.bind(this)
    this.handleConsumoSubmit = this.handleConsumoSubmit.bind(this)
  }

  seletorView(novaView: string, evento: React.MouseEvent) {
    evento.preventDefault()
    this.setState({
      view: novaView,
      clienteParaEditar: undefined
    })
  }

  handleEditarCliente(cliente: Cliente) {
    this.setState({
      view: 'Clientes-Cadastrar',
      clienteParaEditar: cliente
    })
  }

  async handleClienteSubmit(cliente: Cliente) {
    console.log('=== INÍCIO DO SALVAMENTO ===');
    console.log('Cliente recebido:', cliente);
    console.log('Estado atual:', this.state);
    
    try {
      if (this.state.clienteParaEditar) {
        // Atualizar cliente existente
        console.log('Atualizando cliente existente:', this.state.clienteParaEditar.id);
        const resultado = await clientesApi.atualizar(this.state.clienteParaEditar.id!, cliente);
        console.log('Cliente atualizado com sucesso:', resultado);
        alert('Cliente atualizado com sucesso!');
      } else {
        // Criar novo cliente
        console.log('Criando novo cliente');
        console.log('Dados a serem enviados:', {
          nome: cliente.nome,
          cpf: cliente.cpf,
          rg: cliente.rg,
          telefone: cliente.telefone
        });
        
        const resultado = await clientesApi.criar(cliente);
        console.log('Cliente criado com sucesso:', resultado);
        alert('Cliente cadastrado com sucesso!');
      }
      
      // Voltar para a lista
      console.log('Voltando para a lista de clientes');
      this.setState({
        view: 'Clientes-Listar',
        clienteParaEditar: undefined
      });
    } catch (error) {
      console.error('=== ERRO NO SALVAMENTO ===');
      console.error('Erro completo:', error);
      console.error('Mensagem de erro:', error instanceof Error ? error.message : 'Erro desconhecido');
      alert('Erro ao salvar cliente. Tente novamente.');
    }
  }

  handleEditarPet(pet: Pet) {
    this.setState({
      view: 'Pets-Cadastrar',
      petParaEditar: pet
    })
  }

  async handlePetSubmit(pet: Pet) {
    try {
      if (this.state.petParaEditar) {
        await petsApi.atualizar(this.state.petParaEditar.id!, pet);
        alert('Pet atualizado com sucesso!');
      } else {
        await petsApi.criar(pet);
        alert('Pet cadastrado com sucesso!');
      }
      
      this.setState({
        view: 'Pets-Listar',
        petParaEditar: undefined
      });
    } catch (error) {
      console.error('Erro ao salvar pet:', error);
      alert('Erro ao salvar pet. Tente novamente.');
    }
  }

  handleEditarProduto(produto: Produto) {
    this.setState({
      view: 'Produtos-Cadastrar',
      produtoParaEditar: produto
    })
  }

  async handleProdutoSubmit(produto: Produto) {
    try {
      if (this.state.produtoParaEditar) {
        await produtosApi.atualizar(this.state.produtoParaEditar.nome, produto);
        alert('Produto atualizado com sucesso!');
      } else {
        await produtosApi.criar(produto);
        alert('Produto cadastrado com sucesso!');
      }
      
      this.setState({
        view: 'Produtos-Listar',
        produtoParaEditar: undefined
      });
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      alert('Erro ao salvar produto. Tente novamente.');
    }
  }

  handleEditarServico(servico: Servico) {
    this.setState({
      view: 'Servicos-Cadastrar',
      servicoParaEditar: servico
    })
  }

  async handleServicoSubmit(servico: Servico) {
    try {
      if (this.state.servicoParaEditar) {
        await servicosApi.atualizar(this.state.servicoParaEditar.nome, servico);
        alert('Serviço atualizado com sucesso!');
      } else {
        await servicosApi.criar(servico);
        alert('Serviço cadastrado com sucesso!');
      }
      
      this.setState({
        view: 'Servicos-Listar',
        servicoParaEditar: undefined
      });
    } catch (error) {
      console.error('Erro ao salvar serviço:', error);
      alert('Erro ao salvar serviço. Tente novamente.');
    }
  }

  async handleConsumoSubmit(consumo: Consumo) {
    try {
      if (consumo.tipo === 'produto') {
        await consumoApi.registrarProduto(consumo);
        alert('Consumo de produto registrado com sucesso!');
      } else {
        await consumoApi.registrarServico(consumo);
        alert('Consumo de serviço registrado com sucesso!');
      }
      
      this.setState({
        view: 'Consumos-Listar'
      });
    } catch (error) {
      console.error('Erro ao registrar consumo:', error);
      alert('Erro ao registrar consumo. Tente novamente.');
    }
  }

  render() {
    return (
      <div>
        <BarraNavegacao tema={this.state.tema} seletorView={this.seletorView} />
        <div className="container mx-auto px-4">
          {/* Clientes */}
          {this.state.view === 'Clientes-Listar' && 
            <ListaCliente 
              tema={this.state.tema} 
              onEditarCliente={this.handleEditarCliente}
            />
          }
          {this.state.view === 'Clientes-Cadastrar' && 
            <FormularioCadastroCliente 
              tema={this.state.tema}
              cliente={this.state.clienteParaEditar}
              onSubmit={this.handleClienteSubmit}
            />
          }

          {/* Pets */}
          {this.state.view === 'Pets-Listar' && 
            <ListaPets 
              tema={this.state.tema} 
              onEditarPet={this.handleEditarPet}
            />
          }
          {this.state.view === 'Pets-Cadastrar' && 
            <FormularioCadastroPet 
              tema={this.state.tema}
              pet={this.state.petParaEditar}
              onSubmit={this.handlePetSubmit}
            />
          }

          {/* Produtos */}
          {this.state.view === 'Produtos-Listar' && 
            <ListaProdutos 
              tema={this.state.tema} 
              onEditarProduto={this.handleEditarProduto}
            />
          }
          {this.state.view === 'Produtos-Cadastrar' && 
            <FormularioCadastroProduto 
              tema={this.state.tema}
              produto={this.state.produtoParaEditar}
              onSubmit={this.handleProdutoSubmit}
            />
          }

          {/* Serviços */}
          {this.state.view === 'Servicos-Listar' && 
            <ListaServicos 
              tema={this.state.tema} 
              onEditarServico={this.handleEditarServico}
            />
          }
          {this.state.view === 'Servicos-Cadastrar' && 
            <FormularioCadastroServico 
              tema={this.state.tema}
              servico={this.state.servicoParaEditar}
              onSubmit={this.handleServicoSubmit}
            />
          }

          {/* Consumos */}
          {this.state.view === 'Consumos-Listar' && 
            <ListaConsumos 
              tema={this.state.tema} 
            />
          }
          {this.state.view === 'Consumos-Registrar' && 
            <FormularioCadastroConsumo 
              tema={this.state.tema}
              onSubmit={this.handleConsumoSubmit}
            />
          }

          {/* Relatórios */}
          {this.state.view === 'Relatorios-Relatorios' && 
            <Relatorios 
              tema={this.state.tema} 
            />
          }
        </div>
      </div>
    )
  }
} 