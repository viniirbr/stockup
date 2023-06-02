import { Input } from "../UI/Input";
import { Container, HorizontalView } from "./styles";
import { CategoryDropdown } from "../UI/CategoryDropdown";
import { Button } from "../UI/Button";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Props {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    "CreateProduct",
    undefined
  >;
}

export function CreateProductForm({ navigation }: Props) {
  const [name, setName] = useState("");
  const [lastPrice, setLastPrice] = useState<string>("");
  const [category, setCategory] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSave() {
    try {
      setLoading(true);
      const product = await AsyncStorage.getItem("products");
      if (product) {
        const productsObject = JSON.parse(product) as {
          name: string;
          color: string;
        }[];
        const productFound = productsObject.find(
          (product) => product.name === name
        );
        if (productFound) {
          console.log("Product already exists");
          return;
        }
        console.log("creating", productsObject);
        console.log("info", name);
        await AsyncStorage.setItem(
          "products",
          JSON.stringify([
            ...productsObject,
            { name, lastPrice, category, checked: true },
          ])
        );
      } else {
        console.log("else");
        await AsyncStorage.setItem(
          "products",
          JSON.stringify([{ name, lastPrice, category }])
        );
      }
      await AsyncStorage.getItem("products");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <Input
        label="Name"
        keyboardType="default"
        value={name}
        onChangeText={(text) => setName(text)}
      />
      <HorizontalView>
        <Input
          label="Last price"
          keyboardType="numeric"
          value={lastPrice}
          onChangeText={(text) => setLastPrice(text)}
        />
        <CategoryDropdown
          navigation={navigation}
          value={category}
          setValue={setCategory}
        />
      </HorizontalView>
      <Button
        text="Save"
        style={{ backgroundColor: "#A0D8B3" }}
        activeOpacity={0.7}
        onPress={handleSave}
        loading={loading}
      />
    </Container>
  );
}
