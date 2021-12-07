import Roact from "@rbxts/roact";
import { Card } from "./card";
import { Cards, CardInterface } from "shared/cards";
export class Hand extends Roact.Component {
	render() {
		return (
			<frame
				BackgroundTransparency={1}
				Size={new UDim2(1, 0, 1, 0)}
				Position={new UDim2(0, 0, 1, 0)}
				AnchorPoint={new Vector2(0, 1)}
			>
				{/* <uilistlayout
					HorizontalAlignment={Enum.HorizontalAlignment.Center}
					VerticalAlignment={Enum.VerticalAlignment.Center}
					FillDirection={Enum.FillDirection.Horizontal}
					Padding={new UDim(0.05, 0)}
				/> */}
				<Card Position={new UDim2(0.5, 0, 0.9, 0)} Card={Cards.BoilingRain} />
				<Card Position={new UDim2(0.5 + 0.15, 0, 0.9, 0)} Card={Cards.Sunset} />
				<Card Position={new UDim2(0.5 - 0.15, 0, 0.9, 0)} Card={Cards.Sunrise} />
			</frame>
		);
	}
}
