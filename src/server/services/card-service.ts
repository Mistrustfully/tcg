import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Cards } from "shared/cards";

@Service()
export class cardService implements OnStart {
	createDeck(player: Player) {
		const deck = [Cards.Sunrise, Cards.Sunset];
		print(player, deck);
	}

	onStart() {
		Players.PlayerAdded.Connect((player) => this.createDeck(player));
	}
}
