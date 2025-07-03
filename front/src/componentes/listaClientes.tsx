/* eslint-disable jsx-a11y/anchor-is-valid */
import { Component } from "react";
import { Cliente } from "../types/cliente";
import { clientesApi } from "../api";

type Props = {
    tema: string;
    onEditarCliente: (cliente: Cliente) => void;
}

type State = {
    clientes: Cliente[];
    loading: boolean;
    error: string | null;
}

export default class ListaCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            clientes: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarClientes();
    }

    carregarClientes = async () => {
        try {
            this.setState({ loading: true, error: null });
            const response = await clientesApi.listar();
            this.setState({ 
                clientes: response.data || [], 
                loading: false 
            });
        } catch (error) {
            console.error('Erro ao carregar clientes:', error);
            this.setState({ 
                error: 'Erro ao carregar clientes', 
                loading: false 
            });
        }
    };

    handleExcluirCliente = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
            try {
                await clientesApi.excluir(id);
                this.carregarClientes(); // Recarrega a lista
            } catch (error) {
                console.error('Erro ao excluir cliente:', error);
                alert('Erro ao excluir cliente');
            }
        }
    };

    render() {
        const { clientes, loading, error } = this.state;

        if (loading) {
            return (
                <div className="w-full px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Carregando clientes...</div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="w-full px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-red-600 text-lg">{error}</div>
                        <button 
                            onClick={this.carregarClientes}
                            className="ml-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        >
                            Tentar novamente
                        </button>
                    </div>
                </div>
            );
        }

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Lista de Clientes</h2>
                    <button 
                        onClick={this.carregarClientes}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Atualizar
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nome</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">CPF</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">RG</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data Cadastro</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Telefone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {clientes.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        Nenhum cliente encontrado
                                    </td>
                                </tr>
                            ) : (
                                clientes.map((cliente) => (
                                    <tr key={cliente.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{cliente.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.cpf}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.rg}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(cliente.dataCadastro).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{cliente.telefone}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => this.props.onEditarCliente(cliente)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => cliente.id && this.handleExcluirCliente(cliente.id)}
                                                className="text-red-600 hover:text-red-900"
                                            >
                                                Excluir
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        )
    }
}