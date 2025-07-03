import Entrada from "../io/entrada";
import Pet from "../modelo/pet";
import Cliente from "../modelo/cliente";

export default class CadastroPet {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do pet`);
        
        // Encontrar cliente
        const cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        const cliente = this.clientes.find(c => c.getCpf.getValor === cpf)
        
        if (!cliente) {
            console.log(`Cliente não encontrado!`)
            return
        }

        // Coletar dados do pet
        const nome = this.entrada.receberTexto(`Por favor, informe o nome do pet: `)
        const tipo = this.entrada.receberTexto(`Por favor, informe o tipo do pet (cachorro, gato, etc): `)
        const raca = this.entrada.receberTexto(`Por favor, informe a raça do pet: `)
        const genero = this.entrada.receberTexto(`Por favor, informe o gênero do pet: `)

        const pet = new Pet(nome, raca, genero, tipo)
        cliente.adicionarPet(pet)
        
        console.log(`\nPet cadastrado com sucesso!`)
    }
} 