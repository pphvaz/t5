import CPF from "./cpf"
import Pet from "./pet"
import Produto from "./produto"
import RG from "./rg"
import Servico from "./servico"
import Telefone from "./telefone"

export default class Cliente {
    public nome: string
    private cpf: CPF
    private rg: RG
    private dataCadastro: Date
    private telefone: Telefone
    private produtosConsumidos: Array<Produto>
    private servicosConsumidos: Array<Servico>
    private pets: Array<Pet>

    constructor(nome: string, cpf: CPF, rg: RG, telefone: Telefone) {
        this.nome = nome
        this.cpf = cpf
        this.rg = rg
        this.dataCadastro = new Date()
        this.telefone = telefone
        this.produtosConsumidos = []
        this.servicosConsumidos = []
        this.pets = []
    }

    public get getCpf(): CPF {
        return this.cpf
    }

    public get getRg(): RG {
        return this.rg
    }

    public get getDataCadastro(): Date {
        return this.dataCadastro
    }

    public get getTelefone(): Telefone {
        return this.telefone
    }

    public get getProdutosConsumidos(): Array<Produto> {
        return this.produtosConsumidos
    }

    public get getServicosConsumidos(): Array<Servico> {
        return this.servicosConsumidos
    }

    public get getPets(): Array<Pet> {
        return this.pets
    }

    public adicionarPet(pet: Pet): void {
        this.pets.push(pet)
    }

    public removerPet(pet: Pet): void {
        const index = this.pets.findIndex(p => p.getNome === pet.getNome)
        if (index !== -1) {
            this.pets.splice(index, 1)
        }
    }

    public adicionarProdutoConsumido(produto: Produto): void {
        this.produtosConsumidos.push(produto)
    }

    public adicionarServicoConsumido(servico: Servico): void {
        this.servicosConsumidos.push(servico)
    }

    public getTotalConsumido(): number {
        const totalProdutos = this.produtosConsumidos.reduce((total, produto) => 
            total + (produto.getPreco * produto.getQuantidade), 0)
        const totalServicos = this.servicosConsumidos.reduce((total, servico) => 
            total + servico.getPreco, 0)
        return totalProdutos + totalServicos
    }

    public getQuantidadeTotalConsumida(): number {
        return this.produtosConsumidos.length + this.servicosConsumidos.length
    }
}