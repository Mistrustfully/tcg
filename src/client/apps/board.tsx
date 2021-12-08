import Roact, { Children } from "@rbxts/roact";

export class CardSlot extends Roact.Component {
	render() {
		return (
			<frame
				Key="1"
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={0.9}
				BorderSizePixel={0}
				Position={new UDim2(0.113, 0, 0.544, 0)}
				Size={new UDim2(0.163, 0, 0.914, 0)}
			>
				<uicorner CornerRadius={new UDim(0.1, 0)} />
				<uiaspectratioconstraint Key="4" AspectRatio={0.666} />
			</frame>
		);
	}
}

export class Field extends Roact.Component<{ Position: UDim2 }> {
	render() {
		return (
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundTransparency={1}
				Position={this.props.Position}
				Size={new UDim2(1, 0, 0.485, 0)}
			>
				<uilistlayout
					FillDirection={Enum.FillDirection.Horizontal}
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					Padding={new UDim(0.035, 0)}
					SortOrder={Enum.SortOrder.LayoutOrder}
					VerticalAlignment={Enum.VerticalAlignment.Center}
				/>
				{this.props[Children]}
			</frame>
		);
	}
}

export class Board extends Roact.Component {
	render() {
		return (
			<frame
				AnchorPoint={new Vector2(0.5, 0.5)}
				BackgroundColor3={Color3.fromRGB(0, 0, 0)}
				BackgroundTransparency={0.4}
				BorderSizePixel={0}
				Position={new UDim2(0.5, 0, 0.5, 0)}
				Size={new UDim2(0.82, 0, 0.782, 0)}
			>
				<uicorner CornerRadius={new UDim(0.025, 0)} />
				<frame
					AnchorPoint={new Vector2(0.5, 0.5)}
					BackgroundColor3={Color3.fromRGB(255, 255, 255)}
					BackgroundTransparency={0.9}
					BorderSizePixel={0}
					Position={new UDim2(0.5, 0, 0.501, 0)}
					Size={new UDim2(1, 0, 0.029, 0)}
				/>
				<Field Position={new UDim2(0.5, 0, 0.758, 0)}>
					<CardSlot />
					<CardSlot />
					<CardSlot />
					<CardSlot />
					<CardSlot />
				</Field>
				<Field Position={new UDim2(0.5, 0, 0.243, 0)}>
					<CardSlot />
					<CardSlot />
					<CardSlot />
					<CardSlot />
					<CardSlot />
				</Field>
			</frame>
		);
	}
}
