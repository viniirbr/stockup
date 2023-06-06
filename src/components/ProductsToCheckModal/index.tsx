import { ProductsContext } from "../../contexts/ProductsContext";
import { ModalContainer } from "../UI/Modal";
import { useContext, useState } from "react";
import { Text, ModalProps, FlatList } from "react-native";
import { ItemContainer, ItemText, Title } from "./styles";
import { Button } from "../UI/Button";

interface Props extends ModalProps {
  close: () => void;
}

export function ProductsToCheckModal({ close, ...props }: Props) {
  const { products, clearShoppingList } = useContext(ProductsContext);
  const [productsSelected, setProductsSelected] = useState<number[]>([]);
  const productsToBuy = products.filter((product) => !product.checked);

  function toggleSelected(productId: number) {
    if (productsSelected.includes(productId)) {
      setProductsSelected((prev) => prev.filter((id) => id !== productId));
    } else {
      setProductsSelected((prev) => [...prev, productId]);
    }
  }

  function handleConfirm() {
    clearShoppingList(productsSelected);
    close();
  }

  return (
    <ModalContainer close={close} title="" {...props}>
      <Title>
        It seems like you have bought everything. If any item is missing and you
        want to keep it in your shopping list, this is your chance. Select those
        you want to keep.
      </Title>
      <FlatList
        data={productsToBuy}
        keyExtractor={(item) => item.id.toString()}
        style={{ marginTop: 20 }}
        renderItem={({ item }) => (
          <ItemContainer
            activeOpacity={0.7}
            selected={productsSelected.includes(item.id as number)}
            onPress={() => toggleSelected(item.id as number)}
          >
            <ItemText>{item.name}</ItemText>
          </ItemContainer>
        )}
      />
      <Button
        text="Confirm"
        textStyle={{ fontSize: 22 }}
        onPress={handleConfirm}
      />
    </ModalContainer>
  );
}
