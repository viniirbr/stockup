import { ModalProps, Text, TextInput, View } from "react-native";
import { ModalContainer } from "../../UI/Modal";
import { InputContainer, QuantityInput } from "./styles";
import { Button } from "../../UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../../shared/interfaces/Product";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props extends ModalProps {
  product: Product;
  close: () => void;
  quantity: number;
  setQuantity: React.Dispatch<React.SetStateAction<number>>;
}

export function EditQuantityModal({
  product,
  close,
  quantity,
  setQuantity,
  ...props
}: Props) {
  async function handleConfirm() {
    try {
      const products = await AsyncStorage.getItem("products");
      const productsObject: Product[] = JSON.parse(products as string);
      const newProducts = productsObject.map((product) => {
        if (product.name === product.name) {
          return { ...product, quantity };
        }
        return product;
      });
      await AsyncStorage.setItem("products", JSON.stringify(newProducts));
      close();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <ModalContainer title="Edit quantity" {...props} close={close}>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 10 }}>
        <InputContainer>
          <Button
            onPress={() => setQuantity((prev) => (prev > 1 ? prev - 1 : prev))}
          >
            <Ionicons name="remove" size={32} />
          </Button>
          <QuantityInput
            keyboardType="numeric"
            value={quantity.toString()}
            onChangeText={(text) => setQuantity(Number(text))}
          />
          <Button onPress={() => setQuantity((prev) => prev + 1)}>
            <Ionicons name="add" size={32} />
          </Button>
        </InputContainer>
        <Button
          text="Ok"
          style={{
            backgroundColor: "#D1FFF3",
            justifyContent: "center",
            width: 200,
          }}
          textStyle={{ textAlign: "center" }}
          onPress={handleConfirm}
        />
      </View>
    </ModalContainer>
  );
}
