import { OnStart, Service } from "@flamework/core";
import { Events, Functions } from "server/events";
import { Cards } from "shared/cards";
import { CreateBoardStore, DrawCard, IBoard } from "shared/rodux/board-state";

// Handles the game loop
@Service()
export class GameService implements OnStart {
	onStart() {
		Functions.playSolo.setCallback((player: Player) => {
			const State: IBoard = {
				PlayerOne: {
					Field: [],
					Hand: [],
					Deck: [Cards.Sunrise, Cards.Sunset, Cards.BoilingRain],
					DiscardPile: [],
				},

				PlayerTwo: {
					Field: [],
					Hand: [],
					Deck: [Cards.Sunrise, Cards.Sunset, Cards.BoilingRain],
					DiscardPile: [],
				},
			};
			const BoardStore = CreateBoardStore(State, { Player: player });

			delay(5, () => {
				BoardStore.dispatch(DrawCard("PlayerOne"));
				wait(1);
				BoardStore.dispatch(DrawCard("PlayerOne"));
				wait(1);
				BoardStore.dispatch(DrawCard("PlayerOne"));
			});

			return State;
		});
	}
}
