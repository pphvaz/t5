import Entrada from "../io/entrada";
import Produto from "../modelo/produto";
import Empresa from "../modelo/empresa";

export default class CadastroProduto {
    private empresa: Empresa
    private entrada: Entrada

    constructor(empresa: Empresa) {
        this.empresa = empresa
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do produto`);
        
        const nome = this.entrada.receberTexto(`Por favor, informe o nome do produto: `)
        const preco = this.entrada.receberNumero(`Por favor, informe o preço do produto: `)
        const quantidade = this.entrada.receberNumero(`Por favor, informe a quantidade inicial do produto: `)

        const produto = new Produto(nome, preco, quantidade)
        this.empresa.adicionarProduto(produto)
        
        console.log(`\nProduto cadastrado com sucesso!`)
    }
} 