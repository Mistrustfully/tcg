import Rodux from "@rbxts/rodux";

interface ISettings {
	TradeRequests?: boolean;
	DuelRequests?: boolean;
}

interface ChangeSettingsAction extends Rodux.Action<"ChangeSettingsAction"> {
	newSettings: ISettings;
}

export function ChangeSettings(newSettings: ChangeSettingsAction["newSettings"]): ChangeSettingsAction {
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

export const SettingsStore = new Rodux.Store<ISettings, StoreActions, {}>(ChangeSettingsReducer, undefined, [
	Rodux.loggerMiddleware,
]);
