import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux";
import { CardInterface, Cards } from "shared/cards";
import { CreateBoardStore } from "shared/rodux/board-state";
import Hand from "./hand";

export = (instance: Instance) => {
	const tree = Roact.mount(
		<StoreProvider
			store={CreateBoardStore({
				PlayerOne: {
					Field: new Map<number, CardInterface>(),
					Hand: [Cards.BoilingRain, Cards.Sunrise, Cards.Sunset],
					Deck: [],
					DiscardPile: [],
				},

				PlayerTwo: {
					Field: new Map<number, CardInterface>(),
					Hand: [],
					Deck: [],
					DiscardPile: [],
				},
			})}
		>
			<Hand />
		</StoreProvider>,
		instance,
	);
	return () => {
		Roact.unmount(tree);
	};
};
