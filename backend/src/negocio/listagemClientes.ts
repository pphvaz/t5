import Cliente from "../modelo/cliente";
import Listagem from "./listagem";

export default class ListagemClientes extends Listagem {
    private clientes: Array<Cliente>
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
    }
    public listar(): void {
        console.log(`\nLista de todos os clientes:`);
        this.clientes.forEach(cliente => {
            console.log(`Nome: ${cliente.nome}`);
            console.log(`CPF: ${cliente.getCpf.getValor}`);
            console.log(`RG: ${cliente.getRg.getValor}`);
            console.log(`Telefone: (${cliente.getTelefone.getDdd}) ${cliente.getTelefone.getNumero}`);
            console.log(`Data de cadastro: ${cliente.getDataCadastro.toLocaleDateString()}`);
            console.log(`----------------------------------------`);
        });
        console.log(`\n`);
    }
}