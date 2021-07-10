import { BehaviorSubject } from "rxjs";

// 1) Import image
import bear from '../assets/images/bear.svg';
import grass from '../assets/images/grass.jpg';


// 2) Add image name to ObjectModels type
export type ObjectModels = 'bear' | 'grass';

export class ImageService {

    // 3) Load image to files object
    public files: {[K in ObjectModels]: HTMLImageElement} = {
        bear: this.load(bear),
        grass: this.load(grass),
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