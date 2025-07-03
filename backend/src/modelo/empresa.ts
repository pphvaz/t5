import Cliente from "./cliente"
import Produto from "./produto"
import Servico from "./servico"

export default class Empresa{
    private clientes: Array<Cliente>
    private produtos: Array<Produto>
    private servicos: Array<Servico>
    constructor(){
        this.clientes = []
        this.produtos = []
        this.servicos = []
    }
    public get getClientes(){
        return this.clientes
    }
    public get getProdutos(){
        return this.produtos
    }
    public get getServicos(){
        return this.servicos
    }
    public adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente)
    }
    public removerCliente(cliente: Cliente): void {
        const index = this.clientes.findIndex(c => c.getCpf.getValor === cliente.getCpf.getValor)
        if (index !== -1) {
            this.clientes.splice(index, 1)
        }
    }
    public adicionarProduto(produto: Produto): void {
        this.produtos.push(produto)
    }
    public removerProduto(produto: Produto): void {
        const index = this.produtos.findIndex(p => p.getNome === produto.getNome)
        if (index !== -1) {
            this.produtos.splice(index, 1)
        }
    }
    public adicionarServico(servico: Servico): void {
        this.servicos.push(servico)
    }
    public removerServico(servico: Servico): void {
        const index = this.servicos.findIndex(s => s.getNome === servico.getNome)
        if (index !== -1) {
            this.servicos.splice(index, 1)
        }
    }
    public getTop10ClientesPorQuantidade(): Array<Cliente> {
        return [...this.clientes]
            .sort((a, b) => b.getQuantidadeTotalConsumida() - a.getQuantidadeTotalConsumida())
            .slice(0, 10)
    }
    public getTop5ClientesPorValor(): Array<Cliente> {
        return [...this.clientes]
            .sort((a, b) => b.getTotalConsumido() - a.getTotalConsumido())
            .slice(0, 5)
    }
    public getProdutosMaisConsumidos(): Map<string, number> {
        const consumo = new Map<string, number>()
        this.clientes.forEach(cliente => {
            cliente.getProdutosConsumidos.forEach(produto => {
                const quantidade = consumo.get(produto.getNome) || 0
                consumo.set(produto.getNome, quantidade + produto.getQuantidade)
            })
        })
        return consumo
    }
    public getServicosMaisConsumidos(): Map<string, number> {
        const consumo = new Map<string, number>()
        this.clientes.forEach(cliente => {
            cliente.getServicosConsumidos.forEach(servico => {
                const quantidade = consumo.get(servico.getNome) || 0
                consumo.set(servico.getNome, quantidade + 1)
            })
        })
        return consumo
    }
    public getConsumoPorTipoRaca(): Map<string, Map<string, number>> {
        const consumo = new Map<string, Map<string, number>>()
        
        this.clientes.forEach(cliente => {
            cliente.getPets.forEach(pet => {
                const tipoRaca = `${pet.getTipo}-${pet.getRaca}`
                if (!consumo.has(tipoRaca)) {
                    consumo.set(tipoRaca, new Map<string, number>())
                }
                
                const tipoRacaMap = consumo.get(tipoRaca)!
                
                // Contar produtos
                cliente.getProdutosConsumidos.forEach(produto => {
                    const quantidade = tipoRacaMap.get(produto.getNome) || 0
                    tipoRacaMap.set(produto.getNome, quantidade + produto.getQuantidade)
                })
                
                // Contar serviços
                cliente.getServicosConsumidos.forEach(servico => {
                    const quantidade = tipoRacaMap.get(servico.getNome) || 0
                    tipoRacaMap.set(servico.getNome, quantidade + 1)
                })
            })
        })
        
        return consumo
    }
}