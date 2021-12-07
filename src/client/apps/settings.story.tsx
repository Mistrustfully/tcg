import Roact from "@rbxts/roact";
import { SettingsUI } from "./settings";

export = (instance: Instance) => {
	const tree = Roact.mount(<SettingsUI />, instance);
	return () => {
		Roact.unmount(tree);
	};
};
