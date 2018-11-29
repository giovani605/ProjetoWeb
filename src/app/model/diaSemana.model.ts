import { PratoDia } from "./pratoDia.model";

export class DiaSemana {
    constructor(nome, id, mark) {
        this.nome = nome;
        this.id = id;
        this.mark = mark;
    }
    nome: string;
    id: number;
    mark: boolean
}
export function getListaDias(): DiaSemana[] {
    var listaDias: DiaSemana[] = [
        new DiaSemana("domingo", 0, false),
        new DiaSemana("segunda", 1, false),
        new DiaSemana("terça", 2, false),
        new DiaSemana("quarta", 3, false),
        new DiaSemana("quinta", 4, false),
        new DiaSemana("sexta", 5, false),
        new DiaSemana("sábado", 6, false)
    ];
    return listaDias;
}