import {
	AdultCell,
	EmptyCell,
	GameCell,
	NewbornCell,
	SeniorCell,
} from "./GameCell";
type GameCellContstructor = new () => GameCell;
const valueMap: { [key: number]: GameCellContstructor } = {
	0: EmptyCell,
	1: NewbornCell,
	2: AdultCell,
	3: SeniorCell,
};

export class GameOfLife {
	gameState: GameCell[][];
	turn: number;
	constructor(input: number[][]) {
		this.gameState = new Array(input.length).fill(
			new Array(input.length).fill(new EmptyCell())
		);
		this.gameState = this.parseInput(input);
		this.turn = 1;
	}

	private createCell(value: number): GameCell {
		return new valueMap[value]();
	}
	private parseInput(input: number[][]) {
		const newState: GameCell[][] = [];
		input.forEach((line) => {
			const newLine: GameCell[] = [];
			line.forEach((cell) => {
				newLine.push(this.createCell(cell));
			});
			newState.push(newLine);
		});
		return newState;
	}

	getNeighbors(xCoord: number, yCoord: number): GameCell[] {
		const neighbors: GameCell[] = [];
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				const xLook = xCoord + x;
				const yLook = yCoord + y;
				if (
					(xLook || yLook) < 0 ||
					(xLook || yLook) > this.gameState.length - 1
				) {
					continue;
				}
				const neighbor = this.gameState[xLook][yLook];
				if ((x === 0 && y === 0) || !neighbor || neighbor.value === 0) {
					continue;
				}
				neighbors.push(neighbor);
			}
		}
		return neighbors;
	}

	private iterate() {
		const currentNeighbors: GameCell[][][] = new Array(
			this.gameState.length
		).fill([]);
		this.gameState.forEach((line, yIndex) => {
			line.forEach((_cell, xIndex) => {
				currentNeighbors[xIndex][yIndex] = this.getNeighbors(
					xIndex,
					yIndex
				);
			});
		});
		this.gameState.forEach((line, yCoord) => {
			line.forEach((cell, xCoord) => {
				if (xCoord === 2 && yCoord === 5) {
					console.log(
						"at 2,5",
						this.turn,
						currentNeighbors[xCoord][yCoord]
					);
				}
				this.gameState[xCoord][yCoord] = cell.age(
					currentNeighbors[xCoord][yCoord]
				);
			});
		});
		// calculate the next turn here
		this.turn++;
	}

	runGame(turn: number) {
		while (this.turn <= turn) {
			this.iterate();
		}
	}

	printState() {
		console.log(
			this.gameState.map<number[]>((line) => {
				return line.map<number>((cell) => cell.value);
			}),
			this.turn
		);
	}
}
