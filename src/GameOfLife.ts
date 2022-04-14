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

	getNeighbors(xCoord: number, yCoord: number): number[] {
		const neighbors: number[] = [];
		for (let x = -1; x <= 1; x++) {
			for (let y = -1; y <= 1; y++) {
				const xLook = xCoord + x;
				const yLook = yCoord + y;
				if (
					xLook < 0 ||
					yLook < 0 ||
					xLook >= this.gameState.length ||
					yLook >= this.gameState.length
				) {
					continue;
				}
				const neighbor = this.gameState[xLook][yLook];
				if (xCoord === 3 && yCoord === 3) {
					console.log(neighbor, [xLook, yLook]);
				}
				if (
					(xLook === xCoord && yLook === yCoord) ||
					neighbor.value === 0
				) {
					continue;
				}
				if (xCoord === 3 && yCoord === 3) {
					console.log("pushing", neighbor, [xLook, yLook]);
				}
				neighbors.push(neighbor.value);
			}
		}
		return neighbors;
	}

	private iterate() {
		const currentNeighbors: { [key: string]: number[] } = {};
		this.gameState.forEach((line, yIndex) => {
			line.forEach((_cell, xIndex) => {
				currentNeighbors[`${xIndex},${yIndex}`] = this.getNeighbors(
					xIndex,
					yIndex
				);
			});
		});

		console.log(currentNeighbors);
		const newState: GameCell[][] = new Array();
		this.gameState.forEach((line, xCoord) => {
			const newLine: GameCell[] = [];
			line.forEach((cell, yCoord) => {
				if (cell.value === 1)
					console.log(
						cell.value,
						[xCoord, yCoord],
						currentNeighbors[`${xCoord},${yCoord}`],
						cell.age(currentNeighbors[`${xCoord},${yCoord}`])
					);
				newLine.push(cell.age(currentNeighbors[`${xCoord},${yCoord}`]));
			});
			newState.push(newLine);
		});
		this.gameState = newState;
		// calculate the next turn here
		this.turn++;
	}

	runGame(turn: number) {
		while (this.turn < turn) {
			this.iterate();
			this.printState();
		}
	}

	printState() {
		const printable = this.gameState.map<number[]>((line) => {
			return line.map<number>((cell) => cell.value);
		});
		console.log(printable, this.turn);
		return printable;
	}
}
