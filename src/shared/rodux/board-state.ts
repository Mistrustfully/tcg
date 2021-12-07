import Llama from "@rbxts/llama";
import Rodux from "@rbxts/rodux";
import { CardInterface } from "shared/cards";
import { shuffle } from "shared/util/shuffle";

interface IBoard {
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
}

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

type StoreActions = PlayCardAction & DrawCardAction;

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

export function CreateBoardStore(initalstate?: IBoard) {
	return new Rodux.Store<IBoard, StoreActions, {}>(BoardReducer, initalstate, [Rodux.loggerMiddleware]);
}
