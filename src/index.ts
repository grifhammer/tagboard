import { input } from "./inputs";
import { GameOfLife } from "./GameOfLife";
const game = new GameOfLife(input);
game.runGame(20);
game.printState();
