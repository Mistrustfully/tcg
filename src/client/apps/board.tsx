import Roact, { Children } from "@rbxts/roact";
import RoactRodux from "@rbxts/roact-rodux";
import { IBoard } from "shared/rodux/board-state";

interface Props {
	CardSlot: number;
}

function mapStateToProps(state: IBoard, props: Props) {
	return {
		Card: state.PlayerOne.Field.get(props.CardSlot),
	};
}

function mapDispatchToProps() {
	return {};
}

export const CardSlot = RoactRodux.connect(
	mapStateToProps,
	mapDispatchToProps,
)(
	class CardSlot extends Roact.Component<
		ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & Props
	> {
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
					{this.props.Card ? (
						<imagelabel
							Image={this.props.Card.artwork === undefined ? "0" : this.props.Card.artwork}
							ScaleType={Enum.ScaleType.Crop}
							Size={UDim2.fromScale(1, 1)}
							AnchorPoint={new Vector2(0.5, 1)}
							Position={UDim2.fromScale(0.5, 1)}
						>
							<textlabel
								Size={new UDim2(1, 0, 0.1, 0)}
								Text={this.props.Card.name}
								BorderSizePixel={0}
								BackgroundTransparency={1}
							>
								<textlabel
									Position={new UDim2(1, 0, 0, 0)}
									AnchorPoint={new Vector2(1, 0)}
									Size={new UDim2(1, 0, 1, 0)}
									Text={tostring(this.props.Card.mana)}
									BorderSizePixel={0}
									BackgroundTransparency={1}
								>
									<uiaspectratioconstraint AspectRatio={1} />
								</textlabel>
							</textlabel>
							<textlabel
								Size={new UDim2(1, 0, 0.25, 0)}
								Text={this.props.Card.description}
								BorderSizePixel={0}
								BackgroundTransparency={1}
								AnchorPoint={new Vector2(0, 1)}
								Position={new UDim2(0, 0, 1, 0)}
								TextWrapped={true}
							/>
							<uicorner />
							<uiaspectratioconstraint AspectRatio={0.666} DominantAxis={Enum.DominantAxis.Width} />
						</imagelabel>
					) : (
						<></>
					)}
					<uicorner CornerRadius={new UDim(0.1, 0)} />
					<uiaspectratioconstraint Key="4" AspectRatio={0.666} />
				</frame>
			);
		}
	},
);

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
					<CardSlot CardSlot={0} />
					<CardSlot CardSlot={1} />
					<CardSlot CardSlot={2} />
					<CardSlot CardSlot={3} />
					<CardSlot CardSlot={4} />
				</Field>
				<Field Position={new UDim2(0.5, 0, 0.243, 0)}>
					<CardSlot CardSlot={0} />
					<CardSlot CardSlot={1} />
					<CardSlot CardSlot={2} />
					<CardSlot CardSlot={3} />
					<CardSlot CardSlot={4} />
				</Field>
			</frame>
		);
	}
}
