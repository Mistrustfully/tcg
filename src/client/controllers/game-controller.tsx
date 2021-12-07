import { Controller, OnStart } from "@flamework/core";
import { Events, Functions } from "client/events";
import { CreateBoardStore, IBoard, StoreActions } from "shared/rodux/board-state";

@Controller()
export class GameController implements OnStart {
	onStart() {
		Functions.playSolo.invoke().andThen((InitialState: IBoard) => {
			const BoardStore = CreateBoardStore(InitialState);

			Events.boardStateChange.connect((storeActions: StoreActions) => {
				BoardStore.dispatch(storeActions);
			});
		});
	}
}
