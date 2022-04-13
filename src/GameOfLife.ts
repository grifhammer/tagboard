export class GameOfLife {
	gameState: { [key: string]: number };
	turn: 0;
	constructor(input: number[][]) {
		this.gameState = {};
		this.parseInput(input);
		this.turn = 0;
	}
	parseInput(input: number[][]) {
		input.forEach((line, yIndex) => {
			line.forEach((cell, xIndex) => {
				const coordinates = `${xIndex}, ${yIndex}`;

				console.log(cell, coordinates);
				if (cell !== 0) {
					this.gameState[coordinates] = cell;
				}
			});
		});
	}

	iterate() {
		console.log(this.gameState);
		// calculate the next turn here
	}

	runGame(turn: number) {
		for (let currentTurn = this.turn; currentTurn < turn; currentTurn++) {
			this.iterate();
		}
	}
}
