import { OnStart, Service } from "@flamework/core";
import { Events } from "server/events";

// Handles the game loop
@Service()
export class GameService implements OnStart {
	onStart() {
		Events.playSolo.connect((player) => {
			// Player requests to play solo game.
		});
	}
}
