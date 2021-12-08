import { fireNetworkHandler } from "@flamework/networking/out/handlers";
import { Middleware } from "@flamework/networking/out/middleware/types";
import Llama from "@rbxts/llama";
import Rodux, { Store } from "@rbxts/rodux";
import { CardInterface } from "shared/cards";
import { GlobalEvents, GlobalFunctions } from "shared/events";
import { shuffle } from "shared/util/shuffle";

export interface IBoard {
	PlayerOne: {
		// We use a map for the field rather than an array.
		// This is to avoid arrays with holes in them, as you can play a
		// card to the fifth slot, without playing to the first.
		Field: Map<number, CardInterface>;

		Hand: CardInterface[];
		Deck: CardInterface[];
		DiscardPile: CardInterface[];
	};

	PlayerTwo: {
		Field: Map<number, CardInterface>;

		Hand: CardInterface[];
		Deck: CardInterface[];
		DiscardPile: CardInterface[];
	};
}

const InitialState = {
	PlayerOne: {
		Field: new Map<number, CardInterface>(),
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
};

interface PlayCardAction extends Rodux.Action {
	Player: "PlayerOne" | "PlayerTwo";
	Card: number;
	CardSlot: number;
}

interface DrawCardAction extends Rodux.Action {
	Player: "PlayerOne" | "PlayerTwo";
	Card: 0;
	CardSlot: 0;
}

export type StoreActions = PlayCardAction | DrawCardAction;

export function PlayCard(
	Player: PlayCardAction["Player"],
	Card: PlayCardAction["Card"],
	CardSlot: PlayCardAction["CardSlot"],
): StoreActions {
	return {
		type: "PlayCardAction",
		Player: Player,
		Card: Card,
		CardSlot: CardSlot,
	};
}

export function DrawCard(Player: DrawCardAction["Player"]): StoreActions {
	return {
		type: "DrawCardAction",
		Card: 0,
		Player: Player,
		CardSlot: 0,
	};
}

const BoardReducer = Rodux.createReducer<IBoard, StoreActions>(InitialState, {
	PlayCardAction: (state, action) => {
		const newState = Llama.Dictionary.copy(state);
		const Player = newState[action.Player];
		Player.Field.set(action.CardSlot, Player.Hand[action.Card]);
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

export function CreateBoardStore(initalstate?: IBoard, customMiddleware?: Middleware[]) {
	//customMiddleware?.push(Rodux.loggerMiddleware as never);
	return new Rodux.Store<IBoard, StoreActions, {}>(BoardReducer, initalstate, customMiddleware as never);
}
