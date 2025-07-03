import { Component } from "react";
import { Produto } from "../types/produto";

type Props = {
    tema: string;
    produto?: Produto;
    onSubmit: (produto: Produto) => void;
}

type State = {
    produto: Produto;
}

export default class FormularioCadastroProduto extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            produto: props.produto || {
                nome: "",
                preco: 0,
                quantidade: 0
            }
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event: React.ChangeEvent<HTMLInputElement>) {
        const { name, value } = event.target;
        
        this.setState(prevState => ({
            produto: {
                ...prevState.produto,
                [name]: name === 'preco' || name === 'quantidade' ? Number(value) : value
            }
        }));
    }

    handleSubmit(event: React.FormEvent) {
        event.preventDefault();
        this.props.onSubmit(this.state.produto);
    }

    render() {
        return (
            <div className="container mx-auto px-4 py-8">
                <h2 className="text-2xl font-bold mb-6">
                    {this.props.produto ? 'Editar Produto' : 'Cadastrar Produto'}
                </h2>
                <form onSubmit={this.handleSubmit} className="max-w-lg mx-auto space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700">Nome</label>
                        <input
                            type="text"
                            name="nome"
                            value={this.state.produto.nome}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Preço</label>
                        <input
                            type="number"
                            name="preco"
                            step="0.01"
                            min="0"
                            value={this.state.produto.preco}
                            onChange={this.handleChange}
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700">Quantidade</label>
                        <input
                            type="number"
                            name="quantidade"
                            min="0"
                            value={this.state.produto.quantidade}
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
                            {this.props.produto ? 'Atualizar' : 'Cadastrar'}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
} 