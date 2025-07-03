import { Component } from "react";
import { Servico } from "../types/servico";

type Props = {
    tema: string;
    servico?: Servico;
    onSubmit: (servico: Servico) => void;
}

type State = {
    servico: Servico;
}

export default class FormularioCadastroServico extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            servico: props.servico || {
                nome: "",
                preco: 0,
                tipo: ""
            }
        };
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        this.setState(prevState => ({
            servico: {
                ...prevState.servico,
                [name]: name === "preco" ? parseFloat(value) || 0 : value
            }
        }));
    }

    handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        this.props.onSubmit(this.state.servico);
    }

    render() {
        const { servico } = this.state;
        const isEditing = !!this.props.servico;

        return (
            <div className="w-full px-4">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">
                        {isEditing ? "Editar Serviço" : "Cadastrar Serviço"}
                    </h2>
                </div>
                <form onSubmit={this.handleSubmit} className="bg-white shadow-md rounded-lg p-6">
                    <div className="mb-4">
                        <label htmlFor="nome" className="block text-sm font-medium text-gray-700 mb-1">
                            Nome do Serviço
                        </label>
                        <input
                            type="text"
                            id="nome"
                            name="nome"
                            value={servico.nome}
                            onChange={this.handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
                    </div>

                    <div className="mb-4">
                        <label htmlFor="tipo" className="block text-sm font-medium text-gray-700 mb-1">
                            Tipo de Serviço
                        </label>
                        <select
                            id="tipo"
                            name="tipo"
                            value={servico.tipo}
                            onChange={this.handleChange}
                            required
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        >
                            <option value="">Selecione um tipo</option>
                            <option value="Higiene">Higiene</option>
                            <option value="Saúde">Saúde</option>
                            <option value="Estética">Estética</option>
                            <option value="Outros">Outros</option>
                        </select>
                    </div>

                    <div className="mb-6">
                        <label htmlFor="preco" className="block text-sm font-medium text-gray-700 mb-1">
                            Preço (R$)
                        </label>
                        <input
                            type="number"
                            id="preco"
                            name="preco"
                            value={servico.preco}
                            onChange={this.handleChange}
                            required
                            min="0"
                            step="0.01"
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
                        />
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
                            {isEditing ? "Salvar Alterações" : "Cadastrar"}
                        </button>
                    </div>
                </form>
            </div>
        );
    }
} 