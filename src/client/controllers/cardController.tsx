import { Controller, OnStart } from "@flamework/core";
import Roact from "@rbxts/roact";
import { Players } from "@rbxts/services";
import { Hand } from "shared/ui/hand";

@Controller()
export class cardController implements OnStart {
	onStart() {
		Roact.mount(
			<screengui>
				<Hand />
			</screengui>,
			Players.LocalPlayer.WaitForChild("PlayerGui"),
		);
	}
}
