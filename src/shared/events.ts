import { Networking } from "@flamework/networking";

interface ServerEvents {
	playSolo(): void; // Request to play a game against an AI
}

interface ClientEvents {}

export const GlobalEvents = Networking.createEvent<ServerEvents, ClientEvents>();
