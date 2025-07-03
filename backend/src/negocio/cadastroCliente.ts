import Entrada from "../io/entrada"
import Cliente from "../modelo/cliente"
import CPF from "../modelo/cpf"
import RG from "../modelo/rg"
import Telefone from "../modelo/telefone"
import Cadastro from "./cadastro"

export default class CadastroCliente extends Cadastro {
    private clientes: Array<Cliente>
    private entrada: Entrada
    constructor(clientes: Array<Cliente>) {
        super()
        this.clientes = clientes
        this.entrada = new Entrada()
    }
    public cadastrar(): void {
        console.log(`\nInício do cadastro do cliente`);
        
        const nome = this.entrada.receberTexto(`Por favor, informe o nome do cliente: `)
        const valorCpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        const dataCpf = this.entrada.receberData(`Por favor, informe a data de emissão do CPF: `)
        const cpf = new CPF(valorCpf, dataCpf)

        const valorRg = this.entrada.receberTexto(`Por favor, informe o RG do cliente: `)
        const dataRg = this.entrada.receberData(`Por favor, informe a data de emissão do RG: `)
        const rg = new RG(valorRg, dataRg)

        const ddd = this.entrada.receberTexto(`Por favor, informe o DDD do telefone: `)
        const numero = this.entrada.receberTexto(`Por favor, informe o número do telefone: `)
        const telefone = new Telefone(ddd, numero)

        const cliente = new Cliente(nome, cpf, rg, telefone)
        this.clientes.push(cliente)
        
        console.log(`\nCliente cadastrado com sucesso!`)
    }
}