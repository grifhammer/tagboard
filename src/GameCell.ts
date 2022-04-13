export abstract class GameCell {
	value: number;
	coordinates: [number, number];
	constructor(value: number, coordinates: [number, number]) {
		this.coordinates = coordinates;
		this.value = value;
	}

	abstract age(): GameCell;
	getNeighbors(): GameCell[] {
		//gather surrounding cells
		return [];
	}
}

export class EmptyCell extends GameCell {
	constructor(coordinates: [number, number]) {
		super(0, coordinates);
	}
	age() {
		//check if we have exactly 2 adult neighbors -> newborn
		return this;
	}
}
export class NewbornCell extends GameCell {
	constructor(coordinates: [number, number]) {
		super(1, coordinates);
	}
	age() {
		//check if we have >=5 neighbors -> empty
		// check if we have less than 1 neighbor -> empty
		// otherwise -> adult
		return new AdultCell(this.coordinates);
	}
}
export class AdultCell extends GameCell {
	constructor(coordinates: [number, number]) {
		super(2, coordinates);
	}
	age() {
		// check if >= 3 neighbors -> empty
		// check if no neighbors -> empty
		return new SeniorCell(this.coordinates);
	}
}
export class SeniorCell extends GameCell {
	constructor(coordinates: [number, number]) {
		super(3, coordinates);
	}
	age() {
		return new EmptyCell(this.coordinates);
	}
}
