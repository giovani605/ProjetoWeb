export class DiaSemana{
    nome:string;
    id:number;
    mark:boolean
}
export function getListaDias(){
    var listaDias: any[] = [
        { "nome": "domingo", "id": 0, "mark": false },
        { "nome": "segunda", "id": 1, "mark": false },
        { "nome": "terça", "id": 2, "mark": false },
        { "nome": "quarta", "id": 3, "mark": false },
        { "nome": "quinta", "id": 4, "mark": false },
        { "nome": "sexta", "id": 5, "mark": false },
        { "nome": "sábado", "id": 6, "mark": false },
    ];
    return listaDias;
}