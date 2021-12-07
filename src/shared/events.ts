import { Networking } from "@flamework/networking";
import { IBoard, StoreActions } from "./rodux/board-state";

interface ServerEvents {}

interface ClientEvents {
	boardStateChange(Action: StoreActions): void;
}

interface ServerFunctions {
	playSolo(): IBoard;
}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
