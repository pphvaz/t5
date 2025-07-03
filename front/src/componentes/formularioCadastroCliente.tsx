import { Component } from "react";
import { Cliente } from "../types/cliente";

type Props = {
    tema: string;
    cliente?: Cliente;
    onSubmit: (cliente: Cliente) => void;
}

type State = {
    cliente: Cliente;
}

export default class FormularioCadastroCliente extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            cliente: props.cliente || {
                nome: "",
                cpf: "",
                rg: "",
                dataCadastro: new Date(),
                telefone: ""
            }
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        this.setState(prevState => ({
            cliente: {
                ...prevState.cliente,
                [name]: value
            }
        }));
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.onSubmit(this.state.cliente);
    }

    render() {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    {this.props.cliente ? 'Editar Cliente' : 'Cadastrar Cliente'}
                </h2>
                <form onSubmit={this.handleSubmit} className="max-w-lg mx-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={this.state.cliente.nome}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">CPF</label>
                        <input
                            type="text"
                            name="cpf"
                            value={this.state.cliente.cpf}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">RG</label>
                        <input
                            type="text"
                            name="rg"
                            value={this.state.cliente.rg}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Telefone</label>
                        <input
                            type="tel"
                            name="telefone"
                            value={this.state.cliente.telefone}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
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
                            {this.props.cliente ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
}