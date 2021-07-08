import bear from '../assets/images/bear.svg';

export class ImageService {

    static bear(): HTMLImageElement { return this.load(bear); }

    private static load(file: any): HTMLImageElement {
        const img = new Image();
        img.src = file;
        return img; 
    }
}