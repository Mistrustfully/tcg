import { Controller, OnStart } from "@flamework/core";
import { SettingsStore, ChangeSettings } from "client/rodux/rodux";

@Controller()
export class settingsController implements OnStart {
	onStart() {
		SettingsStore.dispatch(
			ChangeSettings({
				TradeRequests: true,
			}),
		);
	}
}
