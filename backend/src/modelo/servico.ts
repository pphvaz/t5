export default class Servico {
    private nome: string
    private preco: number
    private tipo: string

    constructor(nome: string, preco: number, tipo: string) {
        this.nome = nome
        this.preco = preco
        this.tipo = tipo
    }

    public get getNome(): string {
        return this.nome
    }

    public get getPreco(): number {
        return this.preco
    }

    public get getTipo(): string {
        return this.tipo
    }
}