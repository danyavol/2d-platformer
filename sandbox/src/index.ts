import Platformer2D from "../../lib/index";
import GAME_CONFIG from "./platformer-config";

const canvas = document.getElementById('game-canvas') as HTMLCanvasElement;
new Platformer2D(canvas, GAME_CONFIG);