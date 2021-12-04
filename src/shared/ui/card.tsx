import { SingleMotor, Spring } from "@rbxts/flipper";
import Maid from "@rbxts/maid";
import Roact, { Binding } from "@rbxts/roact";
import { Cards, CardInterface } from "shared/cards";

interface props {
	Position: UDim2;
	Card: CardInterface;
}

export class Card extends Roact.Component<props> {
	private Motor = new SingleMotor(0);
	private Binding: Binding<number>;

	constructor(props: props) {
		super(props);

		const [binding, setBinding] = Roact.createBinding(this.Motor.getValue());
		this.Binding = binding;

		this.Motor.onStep(setBinding);
	}

	render() {
		return (
			<frame
				Size={new UDim2(0, 200, 0, 250)}
				Position={this.Binding.map((val: number) => {
					return new UDim2(
						this.props.Position.X.Scale,
						this.props.Position.X.Offset,
						this.props.Position.Y.Scale,
						this.props.Position.Y.Offset - val,
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
			</frame>
		);
	}
}
