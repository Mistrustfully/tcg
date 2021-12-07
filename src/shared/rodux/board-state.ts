import { Middleware } from "@flamework/networking/out/middleware/types";
import Llama from "@rbxts/llama";
import Rodux, { Store } from "@rbxts/rodux";
import { CardInterface } from "shared/cards";
import { GlobalEvents, GlobalFunctions } from "shared/events";
import { shuffle } from "shared/util/shuffle";

export interface IBoard {
	PlayerOne: {
		Field: CardInterface[];

		Hand: CardInterface[];
		Deck: CardInterface[];
		DiscardPile: CardInterface[];
	};

	PlayerTwo: {
		Field: CardInterface[];

		Hand: CardInterface[];
		Deck: CardInterface[];
		DiscardPile: CardInterface[];
	};
}

const InitialState = {
	PlayerOne: {
		Field: [],
		Hand: [],
		Deck: [],
		DiscardPile: [],
	},

	PlayerTwo: {
		Field: [],
		Hand: [],
		Deck: [],
		DiscardPile: [],
	},
};

interface PlayCardAction extends Rodux.Action {
	Player: "PlayerOne" | "PlayerTwo";
	Card: number;
}

interface DrawCardAction extends Rodux.Action {
	Player: "PlayerOne" | "PlayerTwo";
	Card: 0;
}

export type StoreActions = PlayCardAction | DrawCardAction;

export function PlayCard(Player: PlayCardAction["Player"], Card: PlayCardAction["Card"]): StoreActions {
	return {
		type: "PlayCardAction",
		Player: Player,
		Card: Card,
	};
}

export function DrawCard(Player: DrawCardAction["Player"]): StoreActions {
	return {
		type: "DrawCardAction",
		Card: 0,
		Player: Player,
	};
}

const BoardReducer = Rodux.createReducer<IBoard, StoreActions>(InitialState, {
	PlayCardAction: (state, action) => {
		const newState = Llama.Dictionary.copy(state);
		const Player = newState[action.Player];
		Player.Field.push(Player.Hand[action.Card]);
		Player.Hand.remove(action.Card);

		return newState;
	},

	DrawCardAction: (state, action) => {
		const newState = Llama.Dictionary.copy(state);
		const Player = newState[action.Player];

		if (Player.Deck.size() === 0) {
			// We must first shuffle the discard pile, then draw.
			Player.Deck = shuffle(Llama.List.copy(Player.DiscardPile));
			Player.DiscardPile = [];
		}
		Player.Hand.push(Player.Deck.pop()!);

		return newState;
	},
});

export type BoardStoreType = Rodux.Store<IBoard, StoreActions>;

export function CreateBoardStore(
	initalstate?: IBoard,
	netSettings?: {
		Player: Player;
	},
) {
	const BoardMiddleware = [Rodux.loggerMiddleware];

	if (netSettings !== undefined) {
		function NetMiddleware(nextDispatch: Rodux.Dispatch, store: Rodux.Store<IBoard, StoreActions>) {
			return (action: Rodux.AnyAction) => {
				GlobalEvents.server.boardStateChange.fire(netSettings!.Player, action as unknown as StoreActions);
				nextDispatch(action);
			};
		}

		BoardMiddleware.push(NetMiddleware);
	}

	return new Rodux.Store<IBoard, StoreActions, {}>(BoardReducer, initalstate, BoardMiddleware as never);
}
