export abstract class GameCell {
	value: number;
	constructor(value: number) {
		this.value = value;
	}

	abstract age(neighbors: number[]): GameCell;
}

export class EmptyCell extends GameCell {
	constructor() {
		super(0);
	}
	age(neighbors: number[]): GameCell {
		const adultNeighbors = neighbors.reduce((prev: number, current) => {
			return prev + (current === 2 ? 1 : 0);
		}, 0);
		//check if we have exactly 2 adult neighbors -> newborn
		if (adultNeighbors === 2) {
			console.log("Child born", adultNeighbors, neighbors);
			return new NewbornCell();
		}
		return this;
	}
}
export class NewbornCell extends GameCell {
	constructor() {
		super(1);
	}
	age(neighbors: number[]) {
		//check if we have >=5 neighbors -> empty
		// check if we have less than 1 neighbor -> empty
		if (neighbors.length >= 5 || neighbors.length <= 1) {
			console.log("Newborn death", neighbors.length);
			return new EmptyCell();
		}
		// otherwise -> adult
		return new AdultCell();
	}
}
export class AdultCell extends GameCell {
	constructor() {
		super(2);
	}
	age(neighbors: number[]) {
		// check if >= 3 neighbors -> empty
		// check if no neighbors -> empty	const neighbors = this.getNeighbors();
		if (neighbors.length >= 3 || neighbors.length === 0) {
			console.log("Adult death", neighbors.length);
			return new EmptyCell();
		}

		return new SeniorCell();
	}
}
export class SeniorCell extends GameCell {
	constructor() {
		super(3);
	}
	age(_neighbors: number[]) {
		return new EmptyCell();
	}
}
