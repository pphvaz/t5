import { Component } from "react";
import { Pet } from "../types/pet";
import { Cliente } from "../types/cliente";
import { clientesApi } from "../api";

type Props = {
    tema: string;
    pet?: Pet;
    onSubmit: (pet: Pet) => void;
}

type State = {
    pet: Pet;
    clientes: Cliente[];
    loading: boolean;
    error: string | null;
}

export default class FormularioCadastroPet extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            pet: props.pet || {
                nome: "",
                tipo: "",
                raca: "",
                genero: "",
                cpfCliente: "" // Campo para CPF do cliente
            },
            clientes: [],
            loading: true,
            error: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.carregarClientes = this.carregarClientes.bind(this);
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

    handleChange(event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
        const { name, value } = event.target;
        
        if (name === 'cpfCliente') {
            const donoSelecionado = this.state.clientes.find(cliente => cliente.cpf === value);
            if (donoSelecionado) {
                this.setState(prevState => ({
                    pet: {
                        ...prevState.pet,
                        cpfCliente: value
                    }
                }));
            }
        } else {
            this.setState(prevState => ({
                pet: {
                    ...prevState.pet,
                    [name]: value
                }
            }));
        }
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.onSubmit(this.state.pet);
    }

    render() {
        const { loading, error } = this.state;

        if (loading) {
            return (
                <div className="container mx-auto px-4 py-8">
                    <div className="flex justify-center items-center h-64">
                        <div className="text-lg">Carregando clientes...</div>
                    </div>
                </div>
            );
        }

        if (error) {
            return (
                <div className="container mx-auto px-4 py-8">
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
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    {this.props.pet ? 'Editar Pet' : 'Cadastrar Pet'}
                </h2>
                <form onSubmit={this.handleSubmit} className="max-w-lg mx-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={this.state.pet.nome}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Tipo</label>
                        <select
                            name="tipo"
                            value={this.state.pet.tipo}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Selecione um tipo</option>
                            <option value="Cachorro">Cachorro</option>
                            <option value="Gato">Gato</option>
                            <option value="Ave">Ave</option>
                            <option value="Outro">Outro</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Raça</label>
                        <input
                            type="text"
                            name="raca"
                            value={this.state.pet.raca}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Gênero</label>
                        <select
                            name="genero"
                            value={this.state.pet.genero}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Selecione um gênero</option>
                            <option value="Macho">Macho</option>
                            <option value="Fêmea">Fêmea</option>
                        </select>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Dono (CPF)</label>
                        <select
                            name="cpfCliente"
                            value={this.state.pet.cpfCliente}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        >
                            <option value="">Selecione um cliente</option>
                            {this.state.clientes.map(cliente => (
                                <option key={cliente.id} value={cliente.cpf}>
                                    {cliente.nome} - {cliente.cpf}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="flex justify-end space-x-4 mt-6">
                        <button
                            type="button"
                            onClick={() => window.history.back()}
                            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                        >
                            Cancelar
                        </button>
                        <button
                            type="submit"
                            className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                        >
                            {this.props.pet ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
} 