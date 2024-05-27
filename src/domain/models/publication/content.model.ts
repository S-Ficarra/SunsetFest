export class Content {

    private _id: number;
    private _title: string;
    private _text: string;
    private _image: Blob; 

    constructor (title: string, text: string, image: Blob) {
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

    setImage(blob: Blob): void {
        this._image = blob;
    };

    getImage(): Blob {
        return this._image;
    };


};