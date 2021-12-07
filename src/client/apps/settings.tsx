import Roact from "@rbxts/roact";
import { ToggleSwitch } from "./components/toggle-switch";

export class SettingsUI extends Roact.Component {
	render() {
		return (
			<ToggleSwitch
				NativeProps={{ Size: UDim2.fromScale(0.5, 0.5) }}
				Connections={{
					MouseButton1Down: () => {
						print("Hello World");
					},
				}}
			/>
		);
	}
}
