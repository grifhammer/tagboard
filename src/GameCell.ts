export abstract class GameCell {
	value: number;
	constructor(value: number) {
		this.value = value;
	}

	abstract age(neighbors: GameCell[]): GameCell;
}

export class EmptyCell extends GameCell {
	constructor() {
		super(0);
	}
	age(neighbors: GameCell[]): GameCell {
		const adultNeighbors = neighbors.reduce((prev: number, current) => {
			return prev + current.value === 2 ? 1 : 0;
		}, 0);
		if (neighbors.length > 0) {
			console.log(neighbors, adultNeighbors);
		}
		if (adultNeighbors === 2) {
			console.log("Newborn Created");
			return new NewbornCell();
		}
		//check if we have exactly 2 adult neighbors -> newborn
		return this;
	}
}
export class NewbornCell extends GameCell {
	constructor() {
		super(1);
	}
	age(neighbors: GameCell[]) {
		//check if we have >=5 neighbors -> empty
		// check if we have less than 1 neighbor -> empty
		if (neighbors.length >= 5 || neighbors.length < 1) {
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
	age(neighbors: GameCell[]) {
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
	age() {
		return new EmptyCell();
	}
}
