export class Tag{
    nome:string;
    idtag:number;
    check: boolean = false;
    alterar(){
        this.check = !this.check;
    }
}