import { AdultCell, EmptyCell, NewbornCell, SeniorCell } from "../src/GameCell";

describe("Adult Tests", () => {
	let cell: AdultCell;
	beforeEach(() => {
		cell = new AdultCell();
	});
	test("Ages Safely", () => {
		expect(cell.age(new Array(1).fill(1))).toEqual(new SeniorCell());
		expect(cell.age(new Array(2).fill(1))).toEqual(new SeniorCell());
	});
	test("Die from crowding", () => {
		expect(cell.age(new Array(3).fill(1))).toEqual(new EmptyCell());
	});
	test("Die from isolation", () => {
		expect(cell.age([])).toEqual(new EmptyCell());
	});
});

describe("Senior tests", () => {
	let cell: SeniorCell;
	beforeEach(() => {
		cell = new SeniorCell();
	});
	test("Always Dies", () => {
		expect(cell.age(new Array(0).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(1).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(2).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(3).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(4).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(5).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(6).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(7).fill(1))).toEqual(new EmptyCell());
	});
});

describe("Newborn Tests", () => {
	let cell: NewbornCell;
	beforeEach(() => {
		cell = new NewbornCell();
	});

	test("Dies from isolation", () => {
		expect(cell.age(new Array(0).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(1).fill(1))).toEqual(new EmptyCell());
	});

	test("Ages safely", () => {
		expect(cell.age(new Array(2).fill(1))).toEqual(new AdultCell());
		expect(cell.age(new Array(3).fill(1))).toEqual(new AdultCell());
		expect(cell.age(new Array(4).fill(1))).toEqual(new AdultCell());
	});

	test("die from overcrowding", () => {
		expect(cell.age(new Array(5).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(6).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(7).fill(1))).toEqual(new EmptyCell());
	});
});

describe("Empty Cell", () => {
	let cell: EmptyCell;
	beforeEach(() => {
		cell = new EmptyCell();
	});

	test("Does Nothing", () => {
		expect(cell.age(new Array(0).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(1).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(3).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(4).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(5).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(6).fill(1))).toEqual(new EmptyCell());
		expect(cell.age(new Array(7).fill(1))).toEqual(new EmptyCell());
	});
	test("Becomes newborn", () => {
		const twoAdults = new Array(2).fill(2);
		const aBaby = new Array(1).fill(1);
		const someSeniors = new Array(3).fill(3);
		expect(cell.age(twoAdults)).toEqual(new NewbornCell());
		expect(cell.age([...twoAdults, ...aBaby])).toEqual(new NewbornCell());
		expect(cell.age([...twoAdults, ...aBaby, ...someSeniors])).toEqual(
			new NewbornCell()
		);
	});
});
