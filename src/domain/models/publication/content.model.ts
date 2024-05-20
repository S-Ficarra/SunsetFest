export class Content {

    public title: string;
    public text: string;
    public image: Blob; 

    constructor (title: string, text: string, image: Blob) {
        this.title = title;
        this.text = text;
        this.image = image;
    };


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
        this.image = this.image;
    };

    getImage(): Blob {
        return this.image;
    };


};