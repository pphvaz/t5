import { Component } from "react";
import { Consumo } from "../types/consumo";

type Props = {
    tema: string;
}

type State = {
    consumos: Consumo[];
    loading: boolean;
    error: string | null;
}

export default class ListaConsumos extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            consumos: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarConsumos();
    }

    carregarConsumos = async () => {
        try {
            this.setState({ loading: true, error: null });
            // Como não temos um endpoint específico para listar todos os consumos,
            // vamos buscar os consumos de um cliente específico ou criar um endpoint
            // Por enquanto, vamos mostrar uma mensagem informativa
            this.setState({ 
                consumos: [], 
                loading: false 
            });
        } catch (error) {
            console.error('Erro ao carregar consumos:', error);
            this.setState({ 
                error: 'Erro ao carregar consumos', 
                loading: false 
            });
        }
    };

    render() {
        const { consumos, loading, error } = this.state;

        if (loading) {
            return (
                <div className="w-full px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Carregando consumos...</div>
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
                            onClick={this.carregarConsumos}
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
                    <h2 className="text-2xl font-bold">Lista de Consumos</h2>
                    <button 
                        onClick={this.carregarConsumos}
                        className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                        Atualizar
                    </button>
                </div>
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Cliente</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Pet</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tipo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Item</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantidade</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Data</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Valor</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {consumos.length === 0 ? (
                                <tr>
                                    <td colSpan={7} className="px-6 py-4 text-center text-gray-500">
                                        Nenhum consumo encontrado. Para ver consumos, acesse a página de um cliente específico.
                                    </td>
                                </tr>
                            ) : (
                                consumos.map((consumo) => (
                                    <tr key={consumo.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{consumo.cliente.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consumo.pet.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 capitalize">{consumo.tipo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {consumo.tipo === "produto" ? consumo.produto?.nome : consumo.servico?.nome}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{consumo.quantidade}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {new Date(consumo.data).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            R$ {consumo.valor.toFixed(2)}
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