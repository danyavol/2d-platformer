import { swapArrayElements } from "../helpers/common-methods";
import { ParsedMapConfig } from "../interfaces/parsed-game-config.interface";
import { BasicObject } from "../objects/basic-object";

export class GridService {

    private grid: {[index: string]: BasicObject[]} = {};

    
    constructor(private map: ParsedMapConfig) {
        this.resetGrid();
    }


    public getNeighbors(object: BasicObject): BasicObject[] {
        const output = new Set<BasicObject>();
        object.relatedCells.forEach(index => {
            this.grid[index].forEach(o => {
                if (o !== object) output.add(o);
            });
        });
        return Array.from(output);
    }

    public updateObjectPosition(o: BasicObject): void {
        this.removeObjectFromGrid(o);
        this.addObjectToGrid(o);
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
        object.relatedCells = [];
    }

    public addObjectToGrid(object: BasicObject): void {        
        const relatedCells = this.getRelatedCells(object.coords, object.size);
        relatedCells.forEach( index => this.grid[index].push(object) );
        object.relatedCells = relatedCells;
    }


    
    private resetGrid(): void {
        const cells = this.getRelatedCells([0, 0], [this.map.width, this.map.height]);
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
        const x = Math.floor(objCoords[0] / this.map.cells.size);
        const y = Math.floor(objCoords[1] / this.map.cells.size);
        return [x, y];
    }

    private getCellIndex(cellCoords: [number, number]): string {
        return cellCoords[0] + 'x' + cellCoords[1];
    }
    
}