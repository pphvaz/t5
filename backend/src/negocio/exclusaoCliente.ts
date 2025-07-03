import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import Exclusao from "./exclusao"

export default class ExclusaoCliente extends Exclusao {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public excluir(): void {
        console.log(`\nInício da exclusão do cliente`);
        let cpf = this.entrada.receberTexto(`Por favor informe o número do CPF do cliente que deseja excluir: `);
        let clienteIndex = this.clientes.findIndex(cliente => cliente.getCpf.getValor === cpf);

        if (clienteIndex !== -1) {
            this.clientes.splice(clienteIndex, 1);
            console.log(`\nCliente com CPF ${cpf} foi excluído com sucesso.\n`);
        } else {
            console.log(`\nNenhum cliente encontrado com o CPF ${cpf}.\n`);
        }
    }
}