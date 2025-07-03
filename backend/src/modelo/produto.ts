export default class Produto {
    private nome: string
    private preco: number
    private quantidade: number

    constructor(nome: string, preco: number, quantidade: number = 1) {
        this.nome = nome
        this.preco = preco
        this.quantidade = quantidade
    }

    public get getNome(): string {
        return this.nome
    }

    public get getPreco(): number {
        return this.preco
    }

    public get getQuantidade(): number {
        return this.quantidade
    }

    public set setQuantidade(quantidade: number) {
        this.quantidade = quantidade
    }
}