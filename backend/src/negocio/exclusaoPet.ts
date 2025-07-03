import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";

export default class ExclusaoPet {
    private clientes: Array<Cliente>
    private entrada: Entrada

    constructor(clientes: Array<Cliente>) {
        this.clientes = clientes
        this.entrada = new Entrada()
    }

    public excluir(): void {
        console.log(`\nInício da exclusão do pet`);
        
        // Encontrar cliente
        const cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        const cliente = this.clientes.find(c => c.getCpf.getValor === cpf)
        
        if (!cliente) {
            console.log(`Cliente não encontrado!`)
            return
        }

        // Listar pets do cliente
        console.log(`\nPets do cliente:`)
        cliente.getPets.forEach((pet, index) => {
            console.log(`${index + 1} - ${pet.getNome} (${pet.getTipo} - ${pet.getRaca})`)
        })

        // Selecionar pet para exclusão
        const indice = this.entrada.receberNumero(`Por favor, informe o número do pet que deseja excluir: `) - 1
        
        if (indice < 0 || indice >= cliente.getPets.length) {
            console.log(`Índice inválido!`)
            return
        }

        const pet = cliente.getPets[indice]
        cliente.removerPet(pet)
        
        console.log(`\nPet excluído com sucesso!`)
    }
} 