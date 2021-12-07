import { GroupMotor, Instant, SingleMotor, Spring } from "@rbxts/flipper";
import Roact, { Binding } from "@rbxts/roact";
import { Cards, CardInterface } from "shared/cards";
import Snapdragon from "@rbxts/snapdragon";
import { IBoard } from "shared/rodux/board-state";
import { Dispatch } from "@rbxts/rodux";
import RoactRodux from "@rbxts/roact-rodux";

interface props {
	Card: CardInterface;
	CardNumber: number;
}

interface state {
	Dragging: boolean;
}

const mapStateToProps = (State: IBoard, Props: props) => {
	print(Props.CardNumber - (State.PlayerOne.Hand.size() - 1) / 2);
	return {
		position: new UDim2(0.5 - (Props.CardNumber - (State.PlayerOne.Hand.size() - 1) / 2) / 7, 0, 0.9, 0),
	};
};

const mapDispatchToProps = (dispatch: Dispatch) => {
	return {};
};

export const Card = RoactRodux.connect(
	mapStateToProps,
	mapDispatchToProps,
)(
	class Card extends Roact.Component<
		ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & props,
		state
	> {
		private Motor = new SingleMotor(0);
		private Binding: Binding<number>;

		private CardRef = Roact.createRef<ImageLabel>();

		constructor(props: ReturnType<typeof mapStateToProps> & ReturnType<typeof mapDispatchToProps> & props) {
			super(props);

			const [binding, setBinding] = Roact.createBinding(this.Motor.getValue());
			this.Binding = binding;
			this.Motor.onStep(setBinding);

			this.setState(() => {
				return {
					Dragging: false,
				};
			});
		}

		didMount() {
			const Controller = Snapdragon.createDragController(this.CardRef.getValue()!, {
				DragThreshold: 5,
			});
			/*
			Controller.Connect();

			Controller.DragBegan.Connect(() => {
				this.setState(() => {
					return {
						Dragging: true,
					};
				});
				print("Drag began");
				this.Motor.setGoal(new Spring(0));
			})};
			
			Controller.DragEnded.Connect(() => {
				print("Drag ended");
				this.setState(() => {
					return {
						Dragging: false,
					};
				});
				this.Motor.setGoal(new Spring(0));
			});
			*/
		}

		render() {
			this.Motor.step(0);
			return (
				<imagelabel
					Ref={this.CardRef}
					Image={this.props.Card.artwork === undefined ? "0" : this.props.Card.artwork}
					ScaleType={Enum.ScaleType.Crop}
					Size={this.Binding.map((vals: number) => {
						return new UDim2(0, 150, 0, 225);
					})}
					Position={this.Binding.map((vals: number) => {
						return new UDim2(
							this.props.position.X.Scale,
							this.props.position.X.Offset,
							this.props.position.Y.Scale,
							this.props.position.Y.Offset - vals,
						);
					})}
					Event={{
						MouseEnter: () => {
							this.Motor.setGoal(new Spring(200));
						},
						MouseLeave: () => {
							this.Motor.setGoal(new Spring(0));
						},
					}}
					AnchorPoint={new Vector2(0.5, 0)}
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
				</imagelabel>
			);
		}
	},
);
