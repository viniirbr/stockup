import { useEffect, useState, useContext } from "react";
import { Product } from "../../shared/interfaces/Product";
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
import { Category } from "../../shared/interfaces/Category";
import { TouchableOpacity } from "react-native";
import { EditQuantityModal } from "./EditQuantityModal";
import { EditLastPriceModal } from "./EditLastPriceModal";
import { OptionsModal } from "./OptionsModal";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { ProductsContext } from "../../contexts/ProductsContext";

interface Props {
  product: Product;
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function Card({ product, navigation }: Props) {
  const [editingQuantity, setEditingQuantity] = useState<boolean>(false);
  const [editingLastPrice, setEditingLastPrice] = useState<boolean>(false);
  const [quantity, setQuantity] = useState(product.quantity || 1);
  const [price, setPrice] = useState(product.lastPrice?.toString() || "0");
  const [optionsModalVisible, setOptionsModalVisible] =
    useState<boolean>(false);

  const { toggleProductState, categories } = useContext(ProductsContext);
  const category = categories.find(
    (category) => category.name === product.category
  );

  return (
    <Container
      activeOpacity={0.7}
      onLongPress={() => setOptionsModalVisible(true)}
    >
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
            onPress={() => toggleProductState(product.id)}
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

      <OptionsModal
        product={product}
        close={() => setOptionsModalVisible(false)}
        visible={optionsModalVisible}
        price={price}
        setPrice={setPrice}
        navigation={navigation}
      />
    </Container>
  );
}
