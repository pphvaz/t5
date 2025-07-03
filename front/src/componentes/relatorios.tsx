import { Component } from "react";
import { Cliente } from "../types/cliente";
import { Pet } from "../types/pet";
import { Produto } from "../types/produto";
import { Servico } from "../types/servico";
import { Consumo } from "../types/consumo";

type Props = {
    tema: string;
}

type State = {
    selectedReport: string;
    topClientesQtd: Array<{ cliente: Cliente; quantidade: number }>;
    topProdutosServicos: Array<{ item: Produto | Servico; quantidade: number; valor: number }>;
    consumoPorPet: Array<{ pet: Pet; quantidade: number; valor: number }>;
    topClientesValor: Array<{ cliente: Cliente; valor: number }>;
}

export default class Relatorios extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            selectedReport: "top10-clientes-qtd",
            // Dados fictícios para Top 10 Clientes (Qtd)
            topClientesQtd: [
                { cliente: { id: 1, nome: "João Silva", cpf: "123.456.789-00", rg: "12.345.678-9", dataCadastro: new Date(), telefone: "(11) 99999-9999" }, quantidade: 15 },
                { cliente: { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", rg: "98.765.432-1", dataCadastro: new Date(), telefone: "(11) 98888-8888" }, quantidade: 12 },
                { cliente: { id: 3, nome: "Pedro Oliveira", cpf: "456.789.123-00", rg: "45.678.912-3", dataCadastro: new Date(), telefone: "(11) 97777-7777" }, quantidade: 10 },
                { cliente: { id: 4, nome: "Ana Costa", cpf: "789.123.456-00", rg: "78.912.345-6", dataCadastro: new Date(), telefone: "(11) 96666-6666" }, quantidade: 8 },
                { cliente: { id: 5, nome: "Carlos Souza", cpf: "321.654.987-00", rg: "32.165.498-7", dataCadastro: new Date(), telefone: "(11) 95555-5555" }, quantidade: 7 },
            ],
            // Dados fictícios para Top Produtos/Serviços
            topProdutosServicos: [
                { item: { id: 1, nome: "Ração Premium", preco: 89.90, quantidade: 50 }, quantidade: 45, valor: 4045.50 },
                { item: { id: 2, nome: "Banho e Tosa", preco: 80.00, tipo: "Higiene" }, quantidade: 30, valor: 2400.00 },
                { item: { id: 3, nome: "Shampoo para Cães", preco: 45.00, quantidade: 30 }, quantidade: 25, valor: 1125.00 },
                { item: { id: 4, nome: "Consulta Veterinária", preco: 150.00, tipo: "Saúde" }, quantidade: 20, valor: 3000.00 },
            ],
            // Dados fictícios para Consumo por Pet
            consumoPorPet: [
                { pet: { id: 1, nome: "Rex", tipo: "Cachorro", raca: "Labrador", genero: "Macho", dono: { id: 1, nome: "João Silva", cpf: "123.456.789-00", rg: "12.345.678-9", dataCadastro: new Date(), telefone: "(11) 99999-9999" } }, quantidade: 8, valor: 719.20 },
                { pet: { id: 2, nome: "Luna", tipo: "Gato", raca: "Siamês", genero: "Fêmea", dono: { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", rg: "98.765.432-1", dataCadastro: new Date(), telefone: "(11) 98888-8888" } }, quantidade: 6, valor: 539.40 },
                { pet: { id: 3, nome: "Thor", tipo: "Cachorro", raca: "Golden Retriever", genero: "Macho", dono: { id: 3, nome: "Pedro Oliveira", cpf: "456.789.123-00", rg: "45.678.912-3", dataCadastro: new Date(), telefone: "(11) 97777-7777" } }, quantidade: 5, valor: 449.50 },
            ],
            // Dados fictícios para Top 5 Clientes (Valor)
            topClientesValor: [
                { cliente: { id: 1, nome: "João Silva", cpf: "123.456.789-00", rg: "12.345.678-9", dataCadastro: new Date(), telefone: "(11) 99999-9999" }, valor: 1500.00 },
                { cliente: { id: 2, nome: "Maria Santos", cpf: "987.654.321-00", rg: "98.765.432-1", dataCadastro: new Date(), telefone: "(11) 98888-8888" }, valor: 1200.00 },
                { cliente: { id: 3, nome: "Pedro Oliveira", cpf: "456.789.123-00", rg: "45.678.912-3", dataCadastro: new Date(), telefone: "(11) 97777-7777" }, valor: 900.00 },
                { cliente: { id: 4, nome: "Ana Costa", cpf: "789.123.456-00", rg: "78.912.345-6", dataCadastro: new Date(), telefone: "(11) 96666-6666" }, valor: 750.00 },
                { cliente: { id: 5, nome: "Carlos Souza", cpf: "321.654.987-00", rg: "32.165.498-7", dataCadastro: new Date(), telefone: "(11) 95555-5555" }, valor: 600.00 },
            ],
        };
    }

    handleReportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        this.setState({ selectedReport: e.target.value });
    }

    renderTopClientesQtd() {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade de Consumos</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {this.state.topClientesQtd.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTopProdutosServicos() {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {this.state.topProdutosServicos.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.item.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.valor.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    renderConsumoPorPet() {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {this.state.consumoPorPet.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.pet.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.pet.tipo}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{item.quantidade}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.valor.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    renderTopClientesValor() {
        return (
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor Total</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {this.state.topClientesValor.map((item, index) => (
                            <tr key={index} className="hover:bg-gray-50">
                                <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{item.cliente.nome}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">R$ {item.valor.toFixed(2)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    }

    render() {
        return (
            <div className="w-full px-4">
                <div className="flex flex-col items-center mb-8">
                    <h2 className="text-2xl font-bold mb-6">Relatórios</h2>
                    <div className="w-full max-w-md">
                        <select
                            value={this.state.selectedReport}
                            onChange={this.handleReportChange}
                            className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none cursor-pointer"
                        >
                            <option value="top10-clientes-qtd">Top 10 Clientes (Quantidade)</option>
                            <option value="top-produtos-servicos">Top Produtos/Serviços</option>
                            <option value="consumo-por-pet">Consumo por Pet</option>
                            <option value="top5-clientes-valor">Top 5 Clientes (Valor)</option>
                        </select>
                    </div>
                </div>

                <div className="mt-8">
                    {this.state.selectedReport === "top10-clientes-qtd" && this.renderTopClientesQtd()}
                    {this.state.selectedReport === "top-produtos-servicos" && this.renderTopProdutosServicos()}
                    {this.state.selectedReport === "consumo-por-pet" && this.renderConsumoPorPet()}
                    {this.state.selectedReport === "top5-clientes-valor" && this.renderTopClientesValor()}
                </div>
            </div>
        );
    }
} 