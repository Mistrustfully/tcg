import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux";
import { CardInterface, Cards } from "shared/cards";
import { CreateBoardStore } from "shared/rodux/board-state";
import { Board } from "./board";

export = (instance: Instance) => {
	const tree = Roact.mount(
		<StoreProvider
			store={CreateBoardStore({
				PlayerOne: {
					Field: new Map<number, CardInterface>([
						[0, Cards.Sunrise],
						[1, Cards.BoilingRain],
						[2, Cards.Sunset],
						[3, Cards.EmperorOfNight],
						[4, Cards.StarryRift],
					]),
					Hand: [],
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
			<Board />
		</StoreProvider>,
		instance,
	);
	return () => {
		Roact.unmount(tree);
	};
};
