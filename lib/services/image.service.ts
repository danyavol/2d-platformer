// 1) Import image
import grassMid from '../assets/grass/grassMid.svg';
import grassCenter from '../assets/grass/grassCenter.svg';

import alien1_stand from '../assets/player/alien1/alien1_stand.svg';
import alien1_jump from '../assets/player/alien1/alien1_jump.svg';
import alien1_walk1 from '../assets/player/alien1/alien1_walk1.svg';
import alien1_walk2 from '../assets/player/alien1/alien1_walk2.svg';

import alien2_stand from '../assets/player/alien2/alien2_stand.svg';
import alien2_jump from '../assets/player/alien2/alien2_jump.svg';
import alien2_walk1 from '../assets/player/alien2/alien2_walk1.svg';
import alien2_walk2 from '../assets/player/alien2/alien2_walk2.svg';

import background1 from '../assets/backgrounds/background1.svg';


// 2) Create model name
export type StaticTextureNames = 'grassMid' | 'grassCenter';
export type StaticTextures = HTMLImageElement;

export type PlayerTextureNames = 'alien1' | 'alien2';
export interface PlayerTextures {
    stand: HTMLImageElement,
    jump: HTMLImageElement,
    walk: HTMLImageElement[]
}

export class ImageService {

    // 3) Load image to files object
    public static: {[K in StaticTextureNames]: StaticTextures} = {
        grassMid: this.load(grassMid),
        grassCenter: this.load(grassCenter)
    };

    public players: {[K in PlayerTextureNames]: PlayerTextures} = {
        alien1: {
            stand: this.load(alien1_stand),
            jump: this.load(alien1_jump),
            walk: [
                this.load(alien1_walk1),
                this.load(alien1_walk2)
            ]
        },
        alien2: {
            stand: this.load(alien2_stand),
            jump: this.load(alien2_jump),
            walk: [
                this.load(alien2_walk1),
                this.load(alien2_walk2)
            ]
        }
    };

    public background = {
        background1: this.load(background1)
    }

    private filesCount = 0;
    private loadedFilesCount = 0;

    private finishLoading: Function;
    public isLoaded = new Promise(res => this.finishLoading = res);

    private load(file: any): HTMLImageElement {
        ++this.filesCount;
        const img = new Image();
        img.onload = this.fileLoaded.bind(this);
        img.src = file;
        return img; 
    }

    private fileLoaded(): void {
        if (++this.loadedFilesCount >= this.filesCount)
            this.finishLoading();   
    }
}