/// <reference types="@rbxts/testez/globals" />

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
			expect(BoardStore.getState().PlayerOne.Field).to.equal([Cards.Sunrise]);
		});
	});
};
