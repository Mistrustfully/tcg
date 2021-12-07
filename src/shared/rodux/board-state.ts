import Llama from "@rbxts/llama";
import Rodux from "@rbxts/rodux";
import { CardInterface } from "shared/cards";

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

interface PlayCardAction extends Rodux.Action {
	Player: "PlayerOne" | "PlayerTwo";
	Card: number;
}

export function PlayCard(Player: PlayCardAction["Player"], Card: PlayCardAction["Card"]): PlayCardAction {
	return {
		type: "PlayCardAction",
		Player: Player,
		Card: Card,
	};
}

const PlayCardReducer = Rodux.createReducer<IBoard, PlayCardAction>(
	{
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
	},
	{
		PlayCardAction: (state, action) => {
			const newState = Llama.Dictionary.copy(state);
			const Player = newState[action.Player];
			Player.Field.push(Player.Hand[action.Card]);
			Player.Hand.remove(action.Card);

			return newState;
		},
	},
);
type StoreActions = PlayCardAction;
export function CreateBoardStore(initalstate?: IBoard) {
	return new Rodux.Store<IBoard, StoreActions, {}>(PlayCardReducer, initalstate, [Rodux.loggerMiddleware]);
}
