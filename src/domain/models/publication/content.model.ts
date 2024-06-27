export class Content {

    private _id: number;
    private _title: string;
    private _text: string;
    private _image: Buffer; 

    constructor (title: string, text: string, image: Buffer) {
        this._title = title;
        this._text = text;
        this._image = image;
    };

    getId(): number {
        return this._id;
    }

    setId(id: number): void {
        this._id = id;
    }

    setTitle(title: string): void {
        this._title = title;
    };

    getTitle(): string {
        return this._title
    };

    setText(text: string): void {
        this._text = text;
    };

    getText(): string {
        return this._text;
    };

    setImage(buffer: Buffer): void {
        this._image = buffer;
    };

    getImage(): Buffer {
        return this._image;
    };


};