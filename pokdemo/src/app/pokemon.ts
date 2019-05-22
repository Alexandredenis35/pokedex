export class Pokemon {
    
    id:number;
    nom:string;
    type:string
    des:string;
    constructor(id:number,nom:string,type:string,des:string)
    {
        this.id=id;
        this.nom=nom;
        this.type=type;
        this.des=des;
    }
getdes()
{
    return this.des;
}
    getid()
    {
        return this.id;
    }
    gettype()
    {
        return this.type
    }

    getnom()
    {
        return this.nom;
    }
}
