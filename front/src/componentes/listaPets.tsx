import { Component } from "react";
import { Pet } from "../types/pet";
import { petsApi } from "../api";

type Props = {
    tema: string;
    onEditarPet: (pet: Pet) => void;
}

type State = {
    pets: Pet[];
    loading: boolean;
    error: string | null;
}

export default class ListaPets extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pets: [],
            loading: true,
            error: null
        };
    }

    componentDidMount() {
        this.carregarPets();
    }

    carregarPets = async () => {
        try {
            this.setState({ loading: true, error: null });
            const response = await petsApi.listar();
            this.setState({ 
                pets: response.data || [], 
                loading: false 
            });
        } catch (error) {
            console.error('Erro ao carregar pets:', error);
            this.setState({ 
                error: 'Erro ao carregar pets', 
                loading: false 
            });
        }
    };

    handleExcluirPet = async (id: number) => {
        if (window.confirm('Tem certeza que deseja excluir este pet?')) {
            try {
                await petsApi.excluir(id);
                this.carregarPets(); // Recarrega a lista
            } catch (error) {
                console.error('Erro ao excluir pet:', error);
                alert('Erro ao excluir pet');
            }
        }
    };

    render() {
        const { pets, loading, error } = this.state;

        if (loading) {
            return (
                <div className="w-full px-4">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Carregando pets...</div>
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
                            onClick={this.carregarPets}
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
                    <h2 className="text-2xl font-bold">Lista de Pets</h2>
                    <button 
                        onClick={this.carregarPets}
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
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Raça</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Gênero</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dono</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ações</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {pets.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-4 text-center text-gray-500">
                                        Nenhum pet encontrado
                                    </td>
                                </tr>
                            ) : (
                                pets.map((pet) => (
                                    <tr key={pet.id} className="hover:bg-gray-50">
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{pet.nome}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.tipo}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.raca}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{pet.genero}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                            {pet.dono ? pet.dono.nome : 'N/A'}
                                        </td>
                                        <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                                            <button
                                                onClick={() => this.props.onEditarPet(pet)}
                                                className="text-indigo-600 hover:text-indigo-900 mr-4"
                                            >
                                                Editar
                                            </button>
                                            <button
                                                onClick={() => pet.id && this.handleExcluirPet(pet.id)}
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