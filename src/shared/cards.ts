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

	BoilingRain: {
		name: "Boiling Rain",
		description: "Reduce power of all non-water cards by 1000",
		mana: 2,
		artwork: "http://www.roblox.com/asset/?id=8195338491",
	},

	StarryRift: {
		name: "Starry Rift",
		description: "Both players draw any card they want from their deck",
		mana: 6,
		artwork: "https://www.roblox.com/asset/?id=8202067854",
	},

	EmperorOfNight: {
		name: "Emperor of Night",
		description: "5000 Power",
		mana: 5,
		artwork: "https://www.roblox.com/asset/?id=8202067528",
	},
};
