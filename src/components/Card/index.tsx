import { Text } from "react-native";
import { ItemToBuy } from "../../interfaces/ItemToBuy";
import {
  CheckText,
  CheckTouchable,
  Container,
  VerticalView,
  PicPlaceHolder,
  PicView,
  PriceText,
  QuantityText,
  ShoppingText,
  Title,
  ViewInfo,
  CategoryView,
  CategoryText,
} from "./styles";

interface Props {
  itemToBuy: ItemToBuy;
  changeItemState: (id: number) => void;
}

export function Card({ itemToBuy, changeItemState }: Props) {
  return (
    <Container>
      <PicView>
        <PicPlaceHolder />
      </PicView>
      <ViewInfo>
        <VerticalView>
          <Title>{itemToBuy.name}</Title>
          <CategoryView color={itemToBuy.category?.color || "transparent"}>
            <CategoryText style={{ color: "black" }}>
              {itemToBuy.category?.name}
            </CategoryText>
          </CategoryView>
          <PriceText>Last price: €{itemToBuy.lastPrice}</PriceText>
        </VerticalView>
        <VerticalView>
          <QuantityText>x{itemToBuy.quantity}</QuantityText>
          <CheckTouchable
            activeOpacity={0.7}
            checked={itemToBuy.checked}
            onPress={() => changeItemState(itemToBuy.id)}
          >
            {itemToBuy.checked ? (
              <CheckText name="check" size={26} />
            ) : (
              <ShoppingText name="shopping-cart" size={26} />
            )}
          </CheckTouchable>
        </VerticalView>
      </ViewInfo>
    </Container>
  );
}
