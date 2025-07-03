import { Cliente } from "./cliente";

export interface Pet {
    id?: number;
    nome: string;
    tipo: string;
    raca: string;
    genero: string;
    dono?: Cliente;
    cpfCliente?: string;
} 