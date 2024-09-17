export class Content {

    private _id: number;
    private _title: string;
    private _text: string;
    private _imageUrl: string; 

    constructor (title: string, text: string, imageUrl: string) {
        this._title = title;
        this._text = text;
        this._imageUrl = imageUrl;
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

    setImage(url: string): void {
        this._imageUrl = url;
    };

    getImage(): string {
        return this._imageUrl;
    };


};