import { Dependency } from "@flamework/core";
import { ChangeSettings, settingsController } from "client/controllers/settingsController";

/// <reference types="@rbxts/testez/globals" />
export = () => {
	const settingsController = Dependency<settingsController>();
	describe("Settings", () => {
		it("should change", () => {
			const OriginalSettings = settingsController.SettingsStore.getState();
			settingsController.SettingsStore.dispatch(
				ChangeSettings({
					TradeRequests: true,
					DuelRequests: true,
				}),
			);

			expect(OriginalSettings).never.to.equal(settingsController.SettingsStore.getState());
		});
	});
};
