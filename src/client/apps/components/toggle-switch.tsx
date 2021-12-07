import Roact, { JsxInstanceEvents, JsxInstanceProperties } from "@rbxts/roact";

interface Props {
	NativeProps: JsxInstanceProperties<TextButton>;
	Connections: JsxInstanceEvents<TextButton>;
}

export class ToggleSwitch extends Roact.Component<Props, { ToggleState: boolean }> {
	constructor(props: Props) {
		super(props);
		this.setState({ ToggleState: false });
	}

	render() {
		return (
			<textbutton
				Text={this.state.ToggleState ? "On" : "Off"}
				{...this.props.NativeProps}
				Event={{ ...this.props.Connections }}
			/>
		);
	}
}
