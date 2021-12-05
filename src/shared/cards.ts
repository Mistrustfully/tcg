export interface CardInterface {
	name: string;
	description: string;
	mana: number;
	artwork?: string;
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
		artwork: "http://www.roblox.com/asset/?id=8181615781",
	},

	Sunset: {
		name: "Sunset",
		description: "Draw 2 cards, and choose one to discard.",
		mana: 4,
		artwork: "http://www.roblox.com/asset/?id=8181615014",
	},
};
