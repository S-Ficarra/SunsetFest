export class Role {

    private _id: number;
    private _name: string;

    constructor(id: number, name: string) {
        this._id = id;
        this._name = name;
    };

    setId(id : number) : void {
        this._id = id;
    };

    getId() : number {
        return this._id
    };

    setName (name : string) : void {
        this._name = name;
    };

    getName(): string {
        return this._name;
    };

};
