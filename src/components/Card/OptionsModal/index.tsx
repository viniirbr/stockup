import { ModalProps, FlatList, View, TouchableOpacity } from "react-native";
import { ModalContainer } from "../../UI/Modal";
import { OptionContainer, OptionText } from "./styles";
import { Product } from "../../../shared/interfaces/Product";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../../App";
import { ProductsContext } from "../../../contexts/ProductsContext";
import { useContext, useState } from "react";
import { Ionicons } from "@expo/vector-icons";

interface Props extends ModalProps {
  product: Product;
  close: () => void;
  price: string;
  setPrice: React.Dispatch<React.SetStateAction<string>>;
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function OptionsModal({
  product,
  close,
  price,
  setPrice,
  navigation,
  ...props
}: Props) {
  return (
    <ModalContainer title="Select an option" {...props} close={close}>
      <FlatList
        data={[
          { text: "Delete product", productId: product.id },
          {
            text: "Edit product",
            onPress: () => navigation.navigate("CreateProduct", { product }),
          },
        ]}
        renderItem={({ item }) => (
          <Option
            text={item.text}
            onPress={item.onPress}
            productId={item.productId}
            close={close}
          />
        )}
        keyExtractor={(item) => item.text}
      />
    </ModalContainer>
  );
}

interface OptionsProps {
  onPress?: () => void;
  text: string;
  productId?: number | string;
  close: () => void;
}
export function Option({ onPress, text, productId, close }: OptionsProps) {
  const [confirm, setConfirm] = useState(false);
  const { deleteProduct } = useContext(ProductsContext);

  return (
    <OptionContainer
      activeOpacity={0.7}
      onPress={
        onPress
          ? () => {
              close();
              onPress();
            }
          : () => setConfirm(true)
      }
    >
      {confirm ? (
        <View
          style={{
            flexDirection: "row",
            justifyContent: "center",
            gap: 10,
            width: "100%",
          }}
        >
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setConfirm(false)}
          >
            <Ionicons name="close" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => {
              close();
              deleteProduct(productId as number);
            }}
          >
            <Ionicons name="checkmark" size={24} color="green" />
          </TouchableOpacity>
        </View>
      ) : (
        <OptionText>{text}</OptionText>
      )}
    </OptionContainer>
  );
}
