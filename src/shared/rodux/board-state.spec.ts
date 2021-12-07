/// <reference types="@rbxts/testez/globals" />

import Llama from "@rbxts/llama";
import { Cards } from "shared/cards";
import { CreateBoardStore, PlayCard } from "./board-state";

export = () => {
	describe("Board State", () => {
		it("should play a card from the hand.", () => {
			const BoardStore = CreateBoardStore({
				PlayerOne: {
					Hand: [Cards.Sunrise],
					Field: [],
					Deck: [],
					DiscardPile: [],
				},

				PlayerTwo: {
					Hand: [Cards.Sunset],
					Field: [],
					Deck: [],
					DiscardPile: [],
				},
			});

			BoardStore.dispatch(PlayCard("PlayerOne", 0));

			expect(Llama.List.equals(BoardStore.getState().PlayerOne.Field, [Cards.Sunrise])).to.be.ok();
		});
	});
};
