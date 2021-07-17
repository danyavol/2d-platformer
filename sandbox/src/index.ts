import Platformer2D from "../../lib"; "../../dist/platformer-2d.js";
import GAME_CONFIG from "./platformer-config";

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;

const platformer = new Platformer2D(canvas, GAME_CONFIG);