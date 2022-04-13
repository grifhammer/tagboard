export class GameOfLife {
	gameState: { [key: string]: number };
	turn: number;
	constructor(input: number[][]) {
		this.gameState = {};
		this.parseInput(input);
		this.turn = 1;
	}
	private parseInput(input: number[][]) {
		input.forEach((line, yIndex) => {
			line.forEach((cell, xIndex) => {
				const coordinates = `${xIndex}, ${yIndex}`;

				if (cell !== 0) {
					this.gameState[coordinates] = cell;
				}
			});
		});
	}

	private iterate() {
		console.log(this.gameState, this.turn);
		// calculate the next turn here
		this.turn++;
	}

	runGame(turn: number) {
		for (let currentTurn = this.turn; currentTurn <= turn; currentTurn++) {
			this.iterate();
		}
	}

	printState() {
		console.log(this.gameState);
	}
}
