import { Component } from "react";
import { Servico } from "../types/servico";
import { servicosApi } from "../api";

type Props = {
    tema: string;
    onEditarServico: (servico: Servico) => void;
}

type State = {
    servicos: Servico[];
    loading: boolean;
    error: string | null;
}

export default class ListaServicos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servicos: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarServicos();
    }

    carregarServicos = async () => {
        try {
            this.setState({ loading: true, error: null });
            const response = await servicosApi.listar();
            this.setState({ 
                servicos: response.data || [], 
                loading: false 
            });
        } catch (error) {
            console.error('Erro ao carregar serviços:', error);
            this.setState({ 
                error: 'Erro ao carregar serviços', 
                loading: false 
            });
        }
    };

    handleExcluirServico = async (nome: string) => {
        if (window.confirm('Tem certeza que deseja excluir este serviço?')) {
            try {
                await servicosApi.excluir(nome);
                this.carregarServicos(); // Recarrega a lista
            } catch (error) {
                console.error('Erro ao excluir serviço:', error);
                alert('Erro ao excluir serviço');
            }
        }
    };

    render() {
        const { servicos, loading, error } = this.state;

        if (loading) {
            return (
                <div className="w-full px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Carregando serviços...</div>
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
                            onClick={this.carregarServicos}
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
                    <h2 className="text-2xl font-bold">Lista de Serviços</h2>
                    <button 
                        onClick={this.carregarServicos}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Preço</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {servicos.length === 0 ? (
                                <tr>
                                    <td colSpan={4} className="px-6 py-4 text-center text-gray-500">
                                        Nenhum serviço encontrado
                                    </td>
                                </tr>
                            ) : (
                                servicos.map((servico) => (
                                    <tr key={servico.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{servico.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{servico.tipo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            R$ {servico.preco.toFixed(2)}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => this.props.onEditarServico(servico)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => this.handleExcluirServico(servico.nome)}
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