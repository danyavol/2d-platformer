import { BehaviorSubject } from "rxjs";

import bear from '../assets/images/bear.svg';

export class ImageService {

    public files = {
        bear: this.load(bear),
        // ...
    };
    
    private filesCount = Object.keys(this.files).length;
    private loadedFilesCount = 0;

    private isLoadedSbj = new BehaviorSubject<boolean>(false);
    public readonly isLoaded$ = this.isLoadedSbj.asObservable();

    private load(file: any): HTMLImageElement {
        const img = new Image();
        img.onload = this.fileLoaded.bind(this);
        img.src = file;
        return img; 
    }

    private fileLoaded(): void {
        if (++this.loadedFilesCount >= this.filesCount)
            this.isLoadedSbj.next(true);    
    }
}