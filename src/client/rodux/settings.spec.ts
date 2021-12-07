/// <reference types="@rbxts/testez/globals" />
import { ChangeSettings, SettingsStore } from "./rodux";

export = () => {
	describe("Settings", () => {
		it("should change", () => {
			const OriginalSettings = SettingsStore.getState();
			SettingsStore.dispatch(
				ChangeSettings({
					TradeRequests: true,
					DuelRequests: true,
				}),
			);

			expect(OriginalSettings).never.to.equal(SettingsStore.getState());
		});
	});
};
