import { Component } from "react";
import { Consumo, TipoConsumo } from "../types/consumo";
import { Cliente } from "../types/cliente";
import { Pet } from "../types/pet";
import { Produto } from "../types/produto";
import { Servico } from "../types/servico";

type Props = {
    tema: string;
    onSubmit: (consumo: Consumo) => void;
}

type State = {
    consumo: Consumo;
    clientes: Cliente[];
    pets: Pet[];
    produtos: Produto[];
    servicos: Servico[];
    petsDoCliente: Pet[];
}

export default class FormularioCadastroConsumo extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            consumo: {
                cliente: {} as Cliente,
                pet: {} as Pet,
                tipo: "produto",
                quantidade: 1,
                data: new Date(),
                valor: 0
            },
            clientes: [
                { id: 1, nome: "João Silva", cpf: "123.456.789-00", rg: "12.345.678-9", dataCadastro: new Date(), telefone: "(11) 99999-9999" },
                { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", rg: "98.765.432-1", dataCadastro: new Date(), telefone: "(11) 98888-8888" }
            ],
            pets: [
                { id: 1, nome: "Rex", tipo: "Cachorro", raca: "Labrador", genero: "Macho", dono: { id: 1, nome: "João Silva", cpf: "123.456.789-00", rg: "12.345.678-9", dataCadastro: new Date(), telefone: "(11) 99999-9999" } },
                { id: 2, nome: "Luna", tipo: "Gato", raca: "Siamês", genero: "Fêmea", dono: { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", rg: "98.765.432-1", dataCadastro: new Date(), telefone: "(11) 98888-8888" } }
            ],
            produtos: [
                { id: 1, nome: "Ração Premium", preco: 89.90, quantidade: 50 },
                { id: 2, nome: "Shampoo para Cães", preco: 45.00, quantidade: 30 }
            ],
            servicos: [
                { id: 1, nome: "Banho e Tosa", preco: 80.00, tipo: "Higiene" },
                { id: 2, nome: "Consulta Veterinária", preco: 150.00, tipo: "Saúde" }
            ],
            petsDoCliente: []
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        
        if (name === "cliente") {
            const clienteId = parseInt(value);
            const cliente = this.state.clientes.find(c => c.id === clienteId);
            const petsDoCliente = this.state.pets.filter(p => p.dono && p.dono.id === clienteId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    cliente: cliente || {} as Cliente,
                    pet: {} as Pet
                },
                petsDoCliente
            }));
        } else if (name === "pet") {
            const petId = parseInt(value);
            const pet = this.state.petsDoCliente.find(p => p.id === petId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    pet: pet || {} as Pet
                }
            }));
        } else if (name === "tipo") {
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    tipo: value as TipoConsumo,
                    produto: undefined,
                    servico: undefined,
                    valor: 0
                }
            }));
        } else if (name === "produto") {
            const produtoId = parseInt(value);
            const produto = this.state.produtos.find(p => p.id === produtoId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    produto,
                    servico: undefined,
                    valor: produto ? produto.preco * prevState.consumo.quantidade : 0
                }
            }));
        } else if (name === "servico") {
            const servicoId = parseInt(value);
            const servico = this.state.servicos.find(s => s.id === servicoId);
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    servico,
                    produto: undefined,
                    valor: servico ? servico.preco * prevState.consumo.quantidade : 0
                }
            }));
        } else if (name === "quantidade") {
            const quantidade = parseInt(value);
            const valor = this.state.consumo.tipo === "produto" && this.state.consumo.produto
                ? this.state.consumo.produto.preco * quantidade
                : this.state.consumo.tipo === "servico" && this.state.consumo.servico
                    ? this.state.consumo.servico.preco * quantidade
                    : 0;
            
            this.setState(prevState => ({
                consumo: {
                    ...prevState.consumo,
                    quantidade,
                    valor
                }
            }));
        }
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state.consumo);
    }

    render() {
        const { consumo } = this.state;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Registrar Consumo</h2>
                </div>
                <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="cliente" className="block text-sm font-medium text-gray-700 mb-1">
                            Cliente
                        </label>
                        <select
                            id="cliente"
                            name="cliente"
                            value={consumo.cliente?.id || ""}
                            onChange={this.handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione um cliente</option>
                            {this.state.clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.id}>
                                    {cliente.nome}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="pet" className="block text-sm font-medium text-gray-700 mb-1">
                            Pet
                        </label>
                        <select
                            id="pet"
                            name="pet"
                            value={consumo.pet?.id || ""}
                            onChange={this.handleChange}
                            required
                            disabled={!consumo.cliente?.id}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione um pet</option>
                            {this.state.petsDoCliente.map(pet => (
                                <option key={pet.id} value={pet.id}>
                                    {pet.nome} ({pet.tipo})
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Consumo
                        </label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={consumo.tipo}
                            onChange={this.handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="produto">Produto</option>
                            <option value="servico">Serviço</option>
                        </select>
                    </div>

                    {consumo.tipo === "produto" ? (
                        <div className="mb-4">
                            <label htmlFor="produto" className="block text-sm font-medium text-gray-700 mb-1">
                                Produto
                            </label>
                            <select
                                id="produto"
                                name="produto"
                                value={consumo.produto?.id || ""}
                                onChange={this.handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Selecione um produto</option>
                                {this.state.produtos.map(produto => (
                                    <option key={produto.id} value={produto.id}>
                                        {produto.nome} - R$ {produto.preco.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <div className="mb-4">
                            <label htmlFor="servico" className="block text-sm font-medium text-gray-700 mb-1">
                                Serviço
                            </label>
                            <select
                                id="servico"
                                name="servico"
                                value={consumo.servico?.id || ""}
                                onChange={this.handleChange}
                                required
                                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                            >
                                <option value="">Selecione um serviço</option>
                                {this.state.servicos.map(servico => (
                                    <option key={servico.id} value={servico.id}>
                                        {servico.nome} - R$ {servico.preco.toFixed(2)}
                                    </option>
                                ))}
                            </select>
                        </div>
                    )}

                    <div className="mb-6">
                        <label htmlFor="quantidade" className="block text-sm font-medium text-gray-700 mb-1">
                            Quantidade
                        </label>
                        <input
                            type="number"
                            id="quantidade"
                            name="quantidade"
                            value={consumo.quantidade}
                            onChange={this.handleChange}
                            required
                            min="1"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="mb-6">
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Valor Total
                        </label>
                        <div className="w-full px-3 py-2 border border-gray-300 rounded-md bg-gray-50">
                            R$ {consumo.valor.toFixed(2)}
                        </div>
                    </div>

                    <div className="flex justify-end space-x-4">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            Registrar
                        </button>
                    </div>
                </form>
            </div>
        );
    }
} 