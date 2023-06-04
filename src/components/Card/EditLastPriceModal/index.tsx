import { ModalProps, Text, TextInput, View } from "react-native";
import { ModalContainer } from "../../UI/Modal";
import { PriceContainer, PriceInput } from "./styles";
import { Button } from "../../UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { Product } from "../../../interfaces/Product";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props extends ModalProps {
  product: Product;
  close: () => void;
  price: number;
  setPrice: React.Dispatch<React.SetStateAction<number>>;
}

export function EditLastPriceModal({
  product,
  close,
  price,
  setPrice,
  ...props
}: Props) {
  async function handleConfirm() {
    try {
      const products = await AsyncStorage.getItem("products");
      const productsObject: Product[] = JSON.parse(products as string);
      const newProducts = productsObject.map((product) => {
        if (product.name === product.name) {
          return { ...product, lastPrice: price };
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
    <ModalContainer title="Edit last price" {...props} close={close}>
      <View style={{ alignItems: "center", justifyContent: "center", gap: 10 }}>
        <PriceContainer>
          <Text style={{ fontSize: 22, fontWeight: "bold" }}>€</Text>
          <PriceInput
            keyboardType="numeric"
            value={price.toString()}
            onChangeText={(text) => setPrice(Number(text))}
          />
        </PriceContainer>
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
