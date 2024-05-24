export class Content {

    private _id: number;
    public title: string;
    public text: string;
    public image: Blob; 

    constructor (title: string, text: string, image: Blob) {
        this.title = title;
        this.text = text;
        this.image = image;
    };

    getId(): number {
        return this._id;
    }

    setId(id: number): void {
        this._id = id;
    }

    setTitle(title: string): void {
        this.title = title;
    };

    getTitle(): string {
        return this.title
    };

    setText(text: string): void {
        this.text = text;
    };

    getText(): string {
        return this.text;
    };

    setImage(blob: Blob): void {
        this.image = blob;
    };

    getImage(): Blob {
        return this.image;
    };


};