import { OnStart, Service } from "@flamework/core";
import Rodux from "@rbxts/rodux";
import { Events, Functions } from "server/events";
import { CardInterface, Cards } from "shared/cards";
import { GlobalEvents } from "shared/events";
import { CreateBoardStore, DrawCard, IBoard, StoreActions } from "shared/rodux/board-state";

// Handles the game loop
@Service()
export class GameService implements OnStart {
	onStart() {
		Functions.playSolo.setCallback((player: Player) => {
			const State: IBoard = {
				PlayerOne: {
					Field: new Map<number, CardInterface>(),
					Hand: [],
					Deck: [Cards.Sunrise, Cards.Sunset, Cards.BoilingRain],
					DiscardPile: [],
				},

				PlayerTwo: {
					Field: new Map<number, CardInterface>(),
					Hand: [],
					Deck: [Cards.Sunrise, Cards.Sunset, Cards.BoilingRain],
					DiscardPile: [],
				},
			};

			function NetMiddleware(nextDispatch: Rodux.Dispatch, store: Rodux.Store<IBoard, StoreActions>) {
				return (action: Rodux.AnyAction) => {
					GlobalEvents.server.boardStateChange.fire(player, action as unknown as StoreActions);
					nextDispatch(action);
				};
			}

			const BoardStore = CreateBoardStore(State, [NetMiddleware] as never);

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
