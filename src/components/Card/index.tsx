import { useEffect, useState } from "react";
import { Product } from "../../interfaces/Product";
import {
  CheckText,
  CheckTouchable,
  Container,
  HoriontalView,
  PicPlaceHolder,
  PicView,
  QuantityText,
  ShoppingText,
  Title,
  ViewInfo,
  CategoryView,
  CategoryText,
  PriceContainer,
  PriceTitleText,
  PriceValueText,
  PriceValueContainer,
} from "./styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Category } from "../../interfaces/Category";
import { TouchableOpacity, View } from "react-native";
import { Text } from "react-native";
import { EditQuantityModal } from "./EditQuantityModal";
import { EditLastPriceModal } from "./EditLastPriceModal";

interface Props {
  product: Product;
  changeItemState: (name: string) => void;
}

export function Card({ product, changeItemState }: Props) {
  const [category, setCategory] = useState<Category>();
  const [editingQuantity, setEditingQuantity] = useState<boolean>(false);
  const [editingLastPrice, setEditingLastPrice] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [price, setPrice] = useState(product.lastPrice || 0);

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
        <PicPlaceHolder style={{ backgroundColor: category?.color }} />
      </PicView>
      <ViewInfo>
        <HoriontalView>
          <Title>{product.name}</Title>
          {!product.checked && (
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => setEditingQuantity(true)}
            >
              <QuantityText>
                {quantity ? `x${quantity}` : "Add quantity"}
              </QuantityText>
            </TouchableOpacity>
          )}
        </HoriontalView>
        <CategoryView color={category?.color || "transparent"}>
          <CategoryText style={{ color: "black" }}>
            {category?.name}
          </CategoryText>
        </CategoryView>
        <HoriontalView>
          <PriceContainer>
            <PriceTitleText>Last price: </PriceTitleText>
            <PriceValueContainer
              activeOpacity={0.7}
              onPress={() => setEditingLastPrice(true)}
              style={{
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 4,
                elevation: 5,
              }}
            >
              <PriceValueText>€{price}</PriceValueText>
            </PriceValueContainer>
          </PriceContainer>
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

      <EditQuantityModal
        product={product}
        close={() => setEditingQuantity(false)}
        visible={editingQuantity}
        quantity={quantity}
        setQuantity={setQuantity}
      />

      <EditLastPriceModal
        product={product}
        close={() => setEditingLastPrice(false)}
        visible={editingLastPrice}
        price={price}
        setPrice={setPrice}
      />
    </Container>
  );
}
