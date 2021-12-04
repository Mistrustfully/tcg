import Roact from "@rbxts/roact";
import { Hand } from "./hand";

export = (instance: Instance) => {
	const tree = Roact.mount(<Hand />, instance);
	return () => {
		Roact.unmount(tree);
	};
};
