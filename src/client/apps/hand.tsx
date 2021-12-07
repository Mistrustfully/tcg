import Roact from "@rbxts/roact";
import { Card } from "./card";
import { CardInterface } from "shared/cards";
import { IBoard } from "shared/rodux/board-state";
import RoactRodux from "@rbxts/roact-rodux";
import { Dispatch } from "@rbxts/rodux";

const mapStateToProps = (State: IBoard) => {
	return {
		state: State,
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {};
};

export = RoactRodux.connect(
	mapStateToProps,
	mapDispatchToProps,
)(
	class Hand extends Roact.Component<ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps>> {
		render() {
			const Cards = this.props.state.PlayerOne.Hand;
			const CardElements: Roact.Element[] = [];

			Cards.forEach((c: CardInterface, i: number) => {
				CardElements.push(<Card Card={c} CardNumber={i} />);
			});

			return (
				<frame
					BackgroundTransparency={1}
					Size={new UDim2(1, 0, 1, 0)}
					Position={new UDim2(0, 0, 1, 0)}
					AnchorPoint={new Vector2(0, 1)}
				>
					{...CardElements}
				</frame>
			);
		}
	},
);
