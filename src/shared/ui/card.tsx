import { SingleMotor, Spring } from "@rbxts/flipper";
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
	private Motor = new SingleMotor(0);
	private Binding: Binding<number>;

	private LerpMotor = new SingleMotor(1);
	private LerpBinding: Binding<number>;

	private CardRef = Roact.createRef<ImageLabel>();

	constructor(props: props) {
		super(props);

		const [binding, setBinding] = Roact.createBinding(this.Motor.getValue());
		this.Binding = binding;
		this.Motor.onStep(setBinding);

		const [lerpBinding, lerpSetBinding] = Roact.createBinding(this.LerpMotor.getValue());
		this.LerpBinding = lerpBinding;
		this.LerpMotor.onStep(lerpSetBinding);

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
			this.LerpMotor.setGoal(new Spring(0));
		});
		Controller.DragEnded.Connect(() => {
			print("Drag ended");
			this.setState(() => {
				return {
					Dragging: false,
				};
			});
			this.LerpMotor.setGoal(new Spring(1));
			this.Motor.setGoal(new Spring(0));
		});
	}

	render() {
		return (
			<imagelabel
				Ref={this.CardRef}
				Image={this.props.Card.artwork === undefined ? "0" : this.props.Card.artwork}
				ScaleType={Enum.ScaleType.Crop}
				Size={new UDim2(0, 200, 0, 250)}
				Position={this.Binding.map((val: number) => {
					return this.state.Dragging
						? this.CardRef.getValue()!.Position
						: (this.CardRef.getValue()?.Position || this.props.Position).Lerp(
								new UDim2(
									this.props.Position.X.Scale,
									this.props.Position.X.Offset,
									this.props.Position.Y.Scale,
									this.props.Position.Y.Offset - val,
								),
								this.LerpMotor.getValue(),
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
}
