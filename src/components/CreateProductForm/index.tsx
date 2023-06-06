import { Input } from "../UI/Input";
import { Container, HorizontalView, InnerContainer } from "./styles";
import { CategoryDropdown } from "../UI/CategoryDropdown";
import { Button } from "../UI/Button";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { useState, useEffect, useContext } from "react";
import { RouteProp } from "@react-navigation/native";
import { ProductsContext } from "../../contexts/ProductsContext";
import { Platform, TouchableWithoutFeedback, Keyboard } from "react-native";

interface Props {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    "CreateProduct",
    undefined
  >;
  route: RouteProp<RootDrawerParamList, "CreateProduct">;
}

interface Form {
  name: string;
  lastPrice: string;
}

export function CreateProductForm({ navigation, route }: Props) {
  const [form, setForm] = useState<Form>({
    name: route.params?.product?.name || "",
    lastPrice: route.params?.product?.lastPrice?.toString() || "",
  });
  const [category, setCategory] = useState<string | null>(
    route.params?.product?.category || null
  );
  const [loading, setLoading] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const { addProduct, editProduct } = useContext(ProductsContext);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setForm({
        name: route.params?.product?.name || "",
        lastPrice: route.params?.product?.lastPrice?.toString() || "",
      });
      setCategory(route.params?.product?.category || null);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      navigation.setParams({ product: undefined });
      setForm({ name: "", lastPrice: "" });
      setCategory(null);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [route, navigation]);

  useEffect(() => {
    if (Object.values(form).every((value) => !!value === true) && category) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [form, category]);

  async function handleSave() {
    try {
      setLoading(true);
      if (!category || !form.name || !form.lastPrice)
        throw new Error("Missing fields");
      if (!route.params?.product.id) {
        const product = {
          id: (Math.random() * 2000).toFixed(0),
          name: form.name,
          lastPrice: Number(form.lastPrice),
          category,
          checked: true,
        };
        await addProduct(product);
      } else {
        const product = {
          id: route.params?.product.id as string,
          name: form.name,
          lastPrice: Number(form.lastPrice),
          category,
          checked: true,
        };
        await editProduct(product);
      }
      setForm({ name: "", lastPrice: "" });
      setCategory(null);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container behavior={Platform.OS === "ios" ? "padding" : "height"}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <InnerContainer>
          <Input
            label="Name"
            keyboardType="default"
            value={form.name}
            onChangeText={(text) =>
              setForm((prev) => ({ ...prev, name: text }))
            }
          />
          <HorizontalView>
            <Input
              label="Last price"
              keyboardType="numeric"
              value={form.lastPrice}
              onChangeText={(text) =>
                setForm((prev) => ({ ...prev, lastPrice: text }))
              }
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
            disabled={buttonDisabled}
          />
        </InnerContainer>
      </TouchableWithoutFeedback>
    </Container>
  );
}
