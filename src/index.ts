export default class Platformer {

    private name: string;

    constructor(string: string) {
        this.name = string;
    }

    public info(): void {
        console.log(this.name);
    }
}