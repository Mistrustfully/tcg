import { GroupMotor, Instant, SingleMotor, Spring } from "@rbxts/flipper";
import Roact, { Binding } from "@rbxts/roact";
import { Cards, CardInterface } from "shared/cards";
import Snapdragon from "@rbxts/snapdragon";

interface props {
	Position: UDim2;
	Card: CardInterface;
}

interface state {
	Dragging: boolean;
}

export class Card extends Roact.Component<props, state> {
	private Motor = new GroupMotor([0, 0]);
	private Binding: Binding<number[]>;

	private CardRef = Roact.createRef<ImageLabel>();

	constructor(props: props) {
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
		Controller.Connect();

		Controller.DragBegan.Connect(() => {
			this.setState(() => {
				return {
					Dragging: true,
				};
			});
			print("Drag began");
			this.Motor.setGoal([new Spring(0), new Spring(0)]);
		});
		Controller.DragEnded.Connect(() => {
			print("Drag ended");
			this.setState(() => {
				return {
					Dragging: false,
				};
			});
			this.Motor.setGoal([new Spring(0), new Spring(1)]);
		});
	}

	render() {
		return (
			<imagelabel
				Ref={this.CardRef}
				Image={this.props.Card.artwork === undefined ? "0" : this.props.Card.artwork}
				ScaleType={Enum.ScaleType.Crop}
				Size={this.Binding.map((vals: number[]) => {
					return new UDim2(0, 150, 0, 225);
				})}
				Position={this.Binding.map((vals: number[]) => {
					return this.state.Dragging
						? this.CardRef.getValue()!.Position
						: (this.CardRef.getValue()?.Position || this.props.Position).Lerp(
								new UDim2(
									this.props.Position.X.Scale,
									this.props.Position.X.Offset,
									this.props.Position.Y.Scale,
									this.props.Position.Y.Offset - vals[0],
								),
								vals[1],
						  );
				})}
				Event={{
					MouseEnter: () => {
						this.Motor.setGoal([new Spring(200), new Instant(this.Motor.getValue()[1])]);
					},
					MouseLeave: () => {
						this.Motor.setGoal([new Spring(0), new Instant(this.Motor.getValue()[1])]);
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
}
