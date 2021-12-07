import { Networking } from "@flamework/networking";

interface ServerEvents {
	playSolo(): void; // Request to play a game against an AI
}

interface ClientEvents {}

interface ServerFunctions {}

interface ClientFunctions {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
export const GlobalFunctions = Networking.createFunction<ServerFunctions, ClientFunctions>();
