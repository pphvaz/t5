import { Component } from "react";
import BarraNavegacao from "./barraNavegacao";
import ListaCliente from "./listaClientes";
import FormularioCadastroCliente from "./formularioCadastroCliente";
import ListaPets from "./listaPets";
import FormularioCadastroPet from "./formularioCadastroPet";
import ListaProdutos from "./listaProdutos";
import FormularioCadastroProduto from "./formularioCadastroProduto";
import ListaServicos from "./listaServicos";
import FormularioCadastroServico from "./formularioCadastroServico";
import FormularioCadastroConsumo from "./formularioCadastroConsumo";
import ListaConsumos from "./listaConsumos";
import Relatorios from "./relatorios";
import { Cliente } from "../types/cliente";
import { Pet } from "../types/pet";
import { Produto } from "../types/produto";
import { Servico } from "../types/servico";
import { Consumo } from "../types/consumo";

type State = {
    tela: string;
    cliente?: Cliente;
    pet?: Pet;
    produto?: Produto;
    servico?: Servico;
}

export default class Roteador extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            tela: "Clientes-Listar"
        };
        this.selecionarView = this.selecionarView.bind(this);
        this.handleClienteSubmit = this.handleClienteSubmit.bind(this);
        this.handlePetSubmit = this.handlePetSubmit.bind(this);
        this.handleProdutoSubmit = this.handleProdutoSubmit.bind(this);
        this.handleServicoSubmit = this.handleServicoSubmit.bind(this);
        this.handleConsumoSubmit = this.handleConsumoSubmit.bind(this);
        this.handleEditarCliente = this.handleEditarCliente.bind(this);
        this.handleEditarPet = this.handleEditarPet.bind(this);
        this.handleEditarProduto = this.handleEditarProduto.bind(this);
        this.handleEditarServico = this.handleEditarServico.bind(this);
    }

    selecionarView(novaTela: string, evento?: React.MouseEvent) {
        if (evento) {
            evento.preventDefault();
        }
        this.setState({
            tela: novaTela,
            cliente: undefined,
            pet: undefined,
            produto: undefined,
            servico: undefined
        });
    }

    handleClienteSubmit(cliente: Cliente) {
        // Aqui você implementará a lógica para salvar o cliente
        console.log("Cliente salvo:", cliente);
        this.selecionarView("Clientes-Listar");
    }

    handlePetSubmit(pet: Pet) {
        // Aqui você implementará a lógica para salvar o pet
        console.log("Pet salvo:", pet);
        this.selecionarView("Pets-Listar");
    }

    handleProdutoSubmit(produto: Produto) {
        // Aqui você implementará a lógica para salvar o produto
        console.log("Produto salvo:", produto);
        this.selecionarView("Produtos-Listar");
    }

    handleServicoSubmit(servico: Servico) {
        console.log("Serviço salvo:", servico);
        this.selecionarView("Servicos-Listar");
    }

    handleConsumoSubmit(consumo: Consumo) {
        console.log("Consumo registrado:", consumo);
        this.selecionarView("Consumos-Listar");
    }

    handleEditarCliente(cliente: Cliente) {
        this.setState({
            tela: "Clientes-Cadastrar",
            cliente: cliente
        });
    }

    handleEditarPet(pet: Pet) {
        this.setState({
            tela: "Pets-Cadastrar",
            pet: pet
        });
    }

    handleEditarProduto(produto: Produto) {
        this.setState({
            tela: "Produtos-Cadastrar",
            produto: produto
        });
    }

    handleEditarServico(servico: Servico) {
        this.setState({
            tela: "Servicos-Cadastrar",
            servico: servico
        });
    }

    render() {
        let barraNavegacao = <BarraNavegacao tema="purple" seletorView={this.selecionarView} />;

        if (this.state.tela === "Clientes-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaCliente tema="purple" onEditarCliente={this.handleEditarCliente} />
                </>
            );
        } else if (this.state.tela === "Clientes-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroCliente tema="purple" cliente={this.state.cliente} onSubmit={this.handleClienteSubmit} />
                </>
            );
        } else if (this.state.tela === "Pets-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaPets tema="purple" onEditarPet={this.handleEditarPet} />
                </>
            );
        } else if (this.state.tela === "Pets-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroPet tema="purple" pet={this.state.pet} onSubmit={this.handlePetSubmit} />
                </>
            );
        } else if (this.state.tela === "Produtos-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaProdutos tema="purple" onEditarProduto={this.handleEditarProduto} />
                </>
            );
        } else if (this.state.tela === "Produtos-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroProduto tema="purple" produto={this.state.produto} onSubmit={this.handleProdutoSubmit} />
                </>
            );
        } else if (this.state.tela === "Servicos-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaServicos tema="purple" onEditarServico={this.handleEditarServico} />
                </>
            );
        } else if (this.state.tela === "Servicos-Cadastrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroServico tema="purple" servico={this.state.servico} onSubmit={this.handleServicoSubmit} />
                </>
            );
        } else if (this.state.tela === "Consumos-Listar") {
            return (
                <>
                    {barraNavegacao}
                    <ListaConsumos tema="purple" />
                </>
            );
        } else if (this.state.tela === "Consumos-Registrar") {
            return (
                <>
                    {barraNavegacao}
                    <FormularioCadastroConsumo tema="purple" onSubmit={this.handleConsumoSubmit} />
                </>
            );
        } else if (this.state.tela === "Relatorios-Relatorios") {
            return (
                <>
                    {barraNavegacao}
                    <Relatorios tema="purple" />
                </>
            );
        } else {
            return (
                <>
                    {barraNavegacao}
                    <div className="container mx-auto px-4">
                        <h2 className="text-2xl font-bold mb-4">Página em desenvolvimento</h2>
                        <p>Esta funcionalidade está sendo implementada.</p>
                    </div>
                </>
            );
        }
    }
}