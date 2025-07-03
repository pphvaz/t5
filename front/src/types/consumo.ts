import { Cliente } from "./cliente";
import { Pet } from "./pet";
import { Produto } from "./produto";
import { Servico } from "./servico";

export type TipoConsumo = "produto" | "servico";

export interface Consumo {
    id?: number;
    cliente: Cliente;
    pet: Pet;
    tipo: TipoConsumo;
    produto?: Produto;
    servico?: Servico;
    quantidade: number;
    data: Date;
    valor: number;
} 