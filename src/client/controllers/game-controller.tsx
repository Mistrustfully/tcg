import { Controller, OnStart } from "@flamework/core";
import Roact from "@rbxts/roact";
import RoactRodux, { StoreProvider } from "@rbxts/roact-rodux";
import { Players } from "@rbxts/services";
import { Board } from "client/apps/board";
import Hand from "client/apps/hand";
import { Events, Functions } from "client/events";
import { CreateBoardStore, IBoard, StoreActions } from "shared/rodux/board-state";

@Controller()
export class GameController implements OnStart {
	onStart() {
		wait(10);
		Functions.playSolo
			.invoke()
			.andThen((InitialState: IBoard) => {
				const BoardStore = CreateBoardStore(InitialState);

				Roact.mount(
					<screengui IgnoreGuiInset={true}>
						<StoreProvider store={BoardStore}>
							<Hand />
							<Board />
						</StoreProvider>
					</screengui>,
					Players.LocalPlayer.WaitForChild("PlayerGui"),
				);

				Events.boardStateChange.connect((storeActions: StoreActions) => {
					BoardStore.dispatch(storeActions);
				});
			})
			.catch(error);
	}
}
