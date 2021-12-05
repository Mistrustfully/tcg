import { Controller, OnStart } from "@flamework/core";
import Llama from "@rbxts/llama";
import Rodux from "@rbxts/rodux";

// Rodux Store Stuff

interface ISettings {
	TradeRequests?: boolean;
	DuelRequests?: boolean;
}

interface ChangeSettingsAction extends Rodux.Action<"ChangeSettingsAction"> {
	newSettings: ISettings;
}

function ChangeSettings(newSettings: ChangeSettingsAction["newSettings"]): ChangeSettingsAction {
	return {
		type: "ChangeSettingsAction",
		newSettings: newSettings,
	};
}

type StoreActions = ChangeSettingsAction;

const ChangeSettingsReducer = Rodux.createReducer<ISettings, ChangeSettingsAction>(
	{
		TradeRequests: false,
		DuelRequests: false,
	},
	{
		ChangeSettingsAction: (state, action) => {
			return { ...state, ...action.newSettings };
		},
	},
);

@Controller()
export class settingsController implements OnStart {
	public SettingsStore = new Rodux.Store<ISettings, StoreActions, {}>(ChangeSettingsReducer, undefined, [
		Rodux.loggerMiddleware,
	]);

	onStart() {
		this.SettingsStore.dispatch(
			ChangeSettings({
				TradeRequests: true,
			}),
		);
	}
}
