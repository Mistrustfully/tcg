import { OnStart, Service } from "@flamework/core";
import { Players } from "@rbxts/services";
import { Cards } from "shared/cards";

// Knuth-Fisher-Yates shuffle
// https://stackoverflow.com/questions/2450954/how-to-randomize-shuffle-a-javascript-array
function shuffle(array: unknown[]) {
	let currentIndex = array.size(),
		randomIndex;

	// While there remain elements to shuffle...
	while (currentIndex !== 0) {
		// Pick a remaining element...
		randomIndex = math.floor(math.random() * currentIndex);
		currentIndex--;

		// And swap it with the current element.
		[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
	}

	return array;
}

@Service()
export class cardService implements OnStart {
	createDeck(player: Player) {
		const deck = [Cards.Sunrise, Cards.Sunset];
		shuffle(deck);
		print(player, deck);
	}

	onStart() {
		Players.PlayerAdded.Connect((player) => this.createDeck(player));
	}
}
