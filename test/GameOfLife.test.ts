import { GameOfLife } from "../src/GameOfLife";
const testInput = [
	[0, 0, 1, 0, 0],
	[0, 0, 1, 1, 0],
	[0, 2, 2, 1, 0],
	[0, 0, 0, 1, 0],
	[0, 0, 0, 0, 0],
];

const secondGen = [
	[0, 0, 2, 0, 0],
	[0, 1, 0, 2, 0],
	[0, 3, 0, 2, 0],
	[0, 1, 1, 2, 0],
	[0, 0, 0, 0, 0],
];

describe("Game Tests", () => {
	let game: GameOfLife;
	beforeEach(() => {
		game = new GameOfLife(testInput);
	});

	test("Prints correctly", () => {
		expect(game.printState()).toEqual(testInput);
	});

	test("Progresses correctly", () => {
		game.runGame(2);
		expect(game.printState()).toEqual(secondGen);
	});
	test("Test get neighbors", () => {
		expect(game.getNeighbors(0, 0)).toEqual([]);
		expect(game.getNeighbors(0, 1)).toEqual([1, 1]);
		expect(game.getNeighbors(0, 2)).toEqual([1, 1]);
		expect(game.getNeighbors(0, 3)).toEqual([1, 1, 1]);
		expect(game.getNeighbors(0, 4)).toEqual([1]);

		expect(game.getNeighbors(1, 0)).toEqual([2]);
		expect(game.getNeighbors(1, 1)).toEqual([1, 1, 2, 2]);
		expect(game.getNeighbors(1, 2)).toEqual([1, 1, 2, 2, 1]);
		expect(game.getNeighbors(1, 3)).toEqual([1, 1, 2, 1]);
		expect(game.getNeighbors(1, 4)).toEqual([1, 1]);

		expect(game.getNeighbors(2, 0)).toEqual([2]);
		expect(game.getNeighbors(2, 1)).toEqual([1, 2]);
		expect(game.getNeighbors(2, 2)).toEqual([1, 1, 2, 1, 1]);
		expect(game.getNeighbors(2, 3)).toEqual([1, 1, 2, 1]);
		expect(game.getNeighbors(2, 4)).toEqual([1, 1, 1]);

		expect(game.getNeighbors(3, 0)).toEqual([2]);
		expect(game.getNeighbors(3, 1)).toEqual([2, 2]);
		expect(game.getNeighbors(3, 2)).toEqual([2, 2, 1, 1]);
		expect(game.getNeighbors(3, 3)).toEqual([2, 1]);
		expect(game.getNeighbors(3, 4)).toEqual([1, 1]);

		expect(game.getNeighbors(4, 0)).toEqual([]);
		expect(game.getNeighbors(4, 1)).toEqual([]);
		expect(game.getNeighbors(4, 2)).toEqual([1]);
		expect(game.getNeighbors(4, 3)).toEqual([1]);
		expect(game.getNeighbors(4, 4)).toEqual([1]);
	});
});
