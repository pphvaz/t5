import Entrada from "../io/entrada";
import Servico from "../modelo/servico";
import Empresa from "../modelo/empresa";

export default class CadastroServico {
    private empresa: Empresa
    private entrada: Entrada

    constructor(empresa: Empresa) {
        this.empresa = empresa
        this.entrada = new Entrada()
    }

    public cadastrar(): void {
        console.log(`\nInício do cadastro do serviço`);
        
        const nome = this.entrada.receberTexto(`Por favor, informe o nome do serviço: `)
        const preco = this.entrada.receberNumero(`Por favor, informe o preço do serviço: `)
        const tipo = this.entrada.receberTexto(`Por favor, informe o tipo do serviço: `)

        const servico = new Servico(nome, preco, tipo)
        this.empresa.adicionarServico(servico)
        
        console.log(`\nServiço cadastrado com sucesso!`)
    }
} 