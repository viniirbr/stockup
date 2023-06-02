import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";
import {
  CheckText,
  CheckTouchable,
  Container,
  HoriontalView,
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
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category } from "../../interfaces/Category";

interface Props {
  product: Product;
  changeItemState: (name: string) => void;
}

export function Card({ product, changeItemState }: Props) {
  const [category, setCategory] = useState<Category>();

  useEffect(() => {
    async function getCategoryInfo() {
      try {
        const categories = await AsyncStorage.getItem("categories");
        const categoriesObject: Category[] = JSON.parse(categories as string);
        setCategory(
          categoriesObject.find(
            (category) => category.name === product.category
          )
        );
      } catch (error) {}
    }
    getCategoryInfo();
  }, []);
  return (
    <Container>
      <PicView>
        <PicPlaceHolder />
      </PicView>
      <ViewInfo>
        <HoriontalView>
          <Title>{product.name}</Title>
          {<QuantityText>x10{product.quantity}</QuantityText>}
        </HoriontalView>
        <CategoryView color={category?.color || "transparent"}>
          <CategoryText style={{ color: "black" }}>
            {category?.name}
          </CategoryText>
        </CategoryView>
        <HoriontalView>
          <PriceText>Last price: €{product.lastPrice}</PriceText>
          <CheckTouchable
            activeOpacity={0.7}
            checked={product.checked}
            onPress={() => changeItemState(product.name)}
          >
            {product.checked ? (
              <CheckText name="check" size={26} />
            ) : (
              <ShoppingText name="shopping-cart" size={26} />
            )}
          </CheckTouchable>
        </HoriontalView>
      </ViewInfo>
    </Container>
  );
}
