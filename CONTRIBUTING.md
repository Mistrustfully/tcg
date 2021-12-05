*This guide assumes you have a working [Roblox-TS](https://roblox-ts.com/) environment, have some programming knowledge, and know how to use git.* 

## Contributing Cards
Contributing a card is where most people will start. It's easy, and requires very little programming knowledge.

First, you're going to need to add the card to the [`cards.ts`](https://github.com/Mistrustfully/tcg/blob/master/src/shared/cards.ts) file. This is where you'll add the necessary data to the card.

This is what your `card.ts` should look like.

```ts
export const Cards = {
	...

	YourCardIdName: {
		name: "Your Card's Name",
		description: "Your cards description.",
		mana: 0, // Your cards mana cost.
	},
};
```

You can then test out the card in studio. I recommend playing a couple games with your card before making a pull request, to see if any tweaks are necessary.

## Contributing Code
Contributing code is a lot more indepth than cards. You can look at the [Github Issues](https://github.com/Mistrustfully/tcg/labels/good%20first%20issue) to see if there are any bugs or tasks. 