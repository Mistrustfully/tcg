/// <reference types="@rbxts/testez/globals" />

import Llama from "@rbxts/llama";
import { CardInterface, Cards } from "shared/cards";
import { CreateBoardStore, DrawCard, PlayCard } from "./board-state";

export = () => {
	describe("Board State", () => {
		const BoardStore = CreateBoardStore({
			PlayerOne: {
				Hand: [Cards.Sunrise],
				Field: new Map<number, CardInterface>(),
				Deck: [Cards.Sunset],
				DiscardPile: [Cards.BoilingRain],
			},

			PlayerTwo: {
				Hand: [],
				Field: new Map<number, CardInterface>(),
				Deck: [],
				DiscardPile: [],
			},
		});

		it("should play a card from the hand.", () => {
			BoardStore.dispatch(PlayCard("PlayerOne", 0, 4));
			expect(Llama.Dictionary.equals(BoardStore.getState().PlayerOne.Field, { 4: Cards.Sunset })).to.be.ok();
		});

		it("should draw a card", () => {
			BoardStore.dispatch(DrawCard("PlayerOne"));
			expect(Llama.List.equals(BoardStore.getState().PlayerOne.Hand, [Cards.Sunset])).to.be.ok();
		});

		it("should shuffle the discard pile into the deck, and draw", () => {
			BoardStore.dispatch(DrawCard("PlayerOne"));
			expect(
				Llama.List.equals(BoardStore.getState().PlayerOne.Hand, [Cards.Sunrise, Cards.BoilingRain]),
			).to.be.ok();
		});
	});
};
