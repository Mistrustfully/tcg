import Roact from "@rbxts/roact";
import { StoreProvider } from "@rbxts/roact-rodux";
import { Cards } from "shared/cards";
import { CreateBoardStore } from "shared/rodux/board-state";
import { Board } from "./board";

export = (instance: Instance) => {
	const tree = Roact.mount(<Board />, instance);
	return () => {
		Roact.unmount(tree);
	};
};
