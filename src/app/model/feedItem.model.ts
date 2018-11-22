export class FeedItem {
    public name: string;
    public descricao: string;
    public imgPath: string;
    constructor(name: string, desc: string, imgPath: string) {
        this.name = name;
        this.descricao = desc;
        this.imgPath = imgPath;
    }

}