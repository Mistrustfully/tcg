export interface CardInterface {
	name: string;
	description: string;
	mana: number;
}

export const Cards = {
	None: {
		name: "None",
		description: "A card with no value.",
		mana: 0,
	},

	Sunrise: {
		name: "Sunrise",
		description: "Discard up to 3 cards from your hand, and redraw.",
		mana: 4,
	},

	Sunset: {
		name: "Sunset",
		description: "Draw 2 cards, and choose one to discard.",
		mana: 4,
	},
};
