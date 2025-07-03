import Entrada from "../io/entrada";
import Cliente from "../modelo/cliente";
import Empresa from "../modelo/empresa";

export default class RegistroConsumo {
    private empresa: Empresa
    private entrada: Entrada

    constructor(empresa: Empresa) {
        this.empresa = empresa
        this.entrada = new Entrada()
    }

    public registrar(): void {
        console.log(`\nInício do registro de consumo`);
        
        // Encontrar cliente
        const cpf = this.entrada.receberTexto(`Por favor, informe o CPF do cliente: `)
        const cliente = this.empresa.getClientes.find(c => c.getCpf.getValor === cpf)
        
        if (!cliente) {
            console.log(`Cliente não encontrado!`)
            return
        }

        console.log(`\nTipo de consumo:`)
        console.log(`1 - Produto`)
        console.log(`2 - Serviço`)
        
        const tipo = this.entrada.receberNumero(`Por favor, escolha o tipo de consumo: `)

        if (tipo === 1) {
            this.registrarProduto(cliente)
        } else if (tipo === 2) {
            this.registrarServico(cliente)
        } else {
            console.log(`Opção inválida!`)
        }
    }

    private registrarProduto(cliente: Cliente): void {
        console.log(`\nProdutos disponíveis:`)
        this.empresa.getProdutos.forEach((produto, index) => {
            console.log(`${index + 1} - ${produto.getNome} (R$ ${produto.getPreco})`)
        })

        const indice = this.entrada.receberNumero(`Por favor, escolha o produto: `) - 1
        
        if (indice < 0 || indice >= this.empresa.getProdutos.length) {
            console.log(`Índice inválido!`)
            return
        }

        const quantidade = this.entrada.receberNumero(`Por favor, informe a quantidade: `)
        const produto = this.empresa.getProdutos[indice]
        produto.setQuantidade = quantidade
        cliente.adicionarProdutoConsumido(produto)
        
        console.log(`\nConsumo de produto registrado com sucesso!`)
    }

    private registrarServico(cliente: Cliente): void {
        console.log(`\nServiços disponíveis:`)
        this.empresa.getServicos.forEach((servico, index) => {
            console.log(`${index + 1} - ${servico.getNome} (R$ ${servico.getPreco})`)
        })

        const indice = this.entrada.receberNumero(`Por favor, escolha o serviço: `) - 1
        
        if (indice < 0 || indice >= this.empresa.getServicos.length) {
            console.log(`Índice inválido!`)
            return
        }

        const servico = this.empresa.getServicos[indice]
        cliente.adicionarServicoConsumido(servico)
        
        console.log(`\nConsumo de serviço registrado com sucesso!`)
    }
} 