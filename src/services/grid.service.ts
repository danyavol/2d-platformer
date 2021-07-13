import { swapArrayElements } from "../helpers/common-methods";
import { BasicObject } from "../objects/basic-object";

const DEFAULT = {
    cellWidth: 150,
    cellHeight: 150
}

export class GridService {

    private grid: {[index: string]: BasicObject[]} = {};

    private cellWidth = DEFAULT.cellWidth;
    private cellHeight = DEFAULT.cellHeight;

    constructor(
        private mapWidth: number, 
        private mapHeight: number
    ) {
        this.resetGrid();
    }
    
    public init(objects: BasicObject[]): void {
        objects.forEach(obj => this.addObjectToGrid(obj));
        console.log(this.grid);
    }

    // TODO: Check if it faster not remove/add all items, but update only changed items
    public removeObjectFromGrid(object: BasicObject): void {
        object.relatedCells.forEach(index => {
            for (let [i, obj] of this.grid[index].entries()) {
                if (obj === object) {
                    // Swap our object with the last item in array and then remove last item (performance hack)
                    swapArrayElements(this.grid[index], i, this.grid[index].length-1);
                    this.grid[index].pop();
                    break;
                }
            }
        });
    }

    public addObjectToGrid(object: BasicObject): void {
        const relatedCells = this.getRelatedCells(object.coords, object.modelSize);
        relatedCells.forEach( index => this.grid[index].push(object) );
        object.relatedCells = relatedCells;
        console.log(this.grid['0x2'].length);
    }
    
    private resetGrid(): void {
        const cells = this.getRelatedCells([0, 0], [this.mapWidth, this.mapHeight]);
        cells.forEach(index => this.grid[index] = []);
    }
 
    private getRelatedCells(coords: [number, number], size: [number, number]): string[] {
        const topLeftCorner = this.getCellCoords(coords);
        const bottomRightCorner = this.getCellCoords([coords[0]+size[0], coords[1]+size[1]]);

        const output = [];
        for (let x = topLeftCorner[0]; x <= bottomRightCorner[0]; x++) {
            for (let y = topLeftCorner[1]; y <= bottomRightCorner[1]; y++) {
                output.push( this.getCellIndex([x, y]) );
            }
        }
        return output;
    }

    private getCellCoords(objCoords: [number, number]): [number, number] {
        const x = Math.floor(objCoords[0] / this.cellWidth);
        const y = Math.floor(objCoords[1] / this.cellHeight);
        return [x, y];
    }

    private getCellIndex(cellCoords: [number, number]): string {
        return cellCoords[0] + 'x' + cellCoords[1];
    }
    
}