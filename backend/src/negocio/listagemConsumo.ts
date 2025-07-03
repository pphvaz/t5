import Empresa from "../modelo/empresa";

export default class ListagemConsumo {
    private empresa: Empresa

    constructor(empresa: Empresa) {
        this.empresa = empresa
    }

    public listarTop10ClientesPorQuantidade(): void {
        console.log(`\nTop 10 clientes por quantidade de consumo:`)
        const clientes = this.empresa.getTop10ClientesPorQuantidade()
        
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`)
            console.log(`   CPF: ${cliente.getCpf.getValor}`)
            console.log(`   Quantidade total consumida: ${cliente.getQuantidadeTotalConsumida()}`)
            console.log(`   Total gasto: R$ ${cliente.getTotalConsumido().toFixed(2)}`)
            console.log()
        })
    }

    public listarTop5ClientesPorValor(): void {
        console.log(`\nTop 5 clientes por valor gasto:`)
        const clientes = this.empresa.getTop5ClientesPorValor()
        
        clientes.forEach((cliente, index) => {
            console.log(`${index + 1} - ${cliente.nome}`)
            console.log(`   CPF: ${cliente.getCpf.getValor}`)
            console.log(`   Total gasto: R$ ${cliente.getTotalConsumido().toFixed(2)}`)
            console.log()
        })
    }

    public listarProdutosMaisConsumidos(): void {
        console.log(`\nProdutos mais consumidos:`)
        const consumo = this.empresa.getProdutosMaisConsumidos()
        
        Array.from(consumo.entries())
            .sort((a, b) => b[1] - a[1])
            .forEach(([nome, quantidade], index) => {
                console.log(`${index + 1} - ${nome}`)
                console.log(`   Quantidade: ${quantidade}`)
                console.log()
            })
    }

    public listarServicosMaisConsumidos(): void {
        console.log(`\nServiços mais consumidos:`)
        const consumo = this.empresa.getServicosMaisConsumidos()
        
        Array.from(consumo.entries())
            .sort((a, b) => b[1] - a[1])
            .forEach(([nome, quantidade], index) => {
                console.log(`${index + 1} - ${nome}`)
                console.log(`   Quantidade: ${quantidade}`)
                console.log()
            })
    }

    public listarConsumoPorTipoRaca(): void {
        console.log(`\nConsumo por tipo e raça de pet:`)
        const consumo = this.empresa.getConsumoPorTipoRaca()
        
        consumo.forEach((tipoRacaMap, tipoRaca) => {
            console.log(`\nTipo/Raça: ${tipoRaca}`)
            console.log(`Consumo:`)
            
            Array.from(tipoRacaMap.entries())
                .sort((a, b) => b[1] - a[1])
                .forEach(([nome, quantidade]) => {
                    console.log(`   ${nome}: ${quantidade}`)
                })
        })
    }
} 