/// <reference types="@rbxts/testez/globals" />

import Llama from "@rbxts/llama";
import { Cards } from "shared/cards";
import { CreateBoardStore, DrawCard, PlayCard } from "./board-state";

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

		it("should draw a card", () => {
			const BoardStore = CreateBoardStore({
				PlayerOne: {
					Hand: [],
					Field: [],
					Deck: [Cards.Sunrise],
					DiscardPile: [],
				},

				PlayerTwo: {
					Hand: [Cards.Sunset],
					Field: [],
					Deck: [],
					DiscardPile: [],
				},
			});

			BoardStore.dispatch(DrawCard("PlayerOne"));

			expect(Llama.List.equals(BoardStore.getState().PlayerOne.Hand, [Cards.Sunrise])).to.be.ok();
		});

		it("should shuffle the discard pile into the deck, and draw", () => {
			const BoardStore = CreateBoardStore({
				PlayerOne: {
					Hand: [],
					Field: [],
					Deck: [],
					DiscardPile: [Cards.Sunrise],
				},

				PlayerTwo: {
					Hand: [Cards.Sunset],
					Field: [],
					Deck: [],
					DiscardPile: [],
				},
			});

			BoardStore.dispatch(DrawCard("PlayerOne"));

			expect(Llama.List.equals(BoardStore.getState().PlayerOne.Hand, [Cards.Sunrise])).to.be.ok();
		});
	});
};
