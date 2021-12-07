import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux";
import { Cards } from "shared/cards";
import { CreateBoardStore } from "shared/rodux/board-state";
import Hand from "./hand";

export = (instance: Instance) => {
	const tree = Roact.mount(
		<StoreProvider
			store={CreateBoardStore({
				PlayerOne: {
					Field: [],
					Hand: [Cards.BoilingRain, Cards.Sunrise, Cards.Sunset],
					Deck: [],
					DiscardPile: [],
				},

				PlayerTwo: {
					Field: [],
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
