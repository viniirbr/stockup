import { Input } from "../UI/Input";
import { Container, HorizontalView } from "./styles";
import { Button } from "../UI/Button";
import { ColorDropdown } from "../ColorsDropdown";
import { View } from "react-native";
import { useState, useContext, useEffect } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { RouteProp } from "@react-navigation/native";
import { Category } from "../../shared/interfaces/Category";
import { ProductsContext } from "../../contexts/ProductsContext";

interface Props {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    "CreateCategory",
    undefined
  >;
  route: RouteProp<RootDrawerParamList, "CreateCategory">;
}

export function CreateCategoryForm({ route, navigation }: Props) {
  const [name, setName] = useState("");
  const [color, setColor] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const { addCategory, editCategory } = useContext(ProductsContext);

  useEffect(() => {
    const unsubscribeFocus = navigation.addListener("focus", () => {
      setName(route.params?.category?.name || "");
      setColor(route.params?.category?.color || null);
    });

    const unsubscribeBlur = navigation.addListener("blur", () => {
      navigation.setParams({ category: undefined });
      setName(route.params?.category?.name || "");
      setColor(route.params?.category?.color || null);
    });

    return () => {
      unsubscribeFocus();
      unsubscribeBlur();
    };
  }, [route, navigation]);

  async function handleSave() {
    try {
      setLoading(true);
      if (!name || !color) throw new Error("Missing fields");
      if (!route.params?.category.id) {
        const category: Category = {
          id: (Math.random() * 2000).toFixed(0),
          name,
          color,
          active: true,
        };
        await addCategory(category);
      } else {
        const category: Category = {
          id: route.params?.category.id,
          name,
          color,
          active: true,
        };
        await editCategory(category);
      }
      setName("");
      setColor(null);
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Container>
      <HorizontalView>
        <Input
          label="Name"
          keyboardType="default"
          style={{ width: "60%" }}
          value={name}
          onChangeText={(text) => setName(text)}
        />
        <View style={{ width: "30%" }}>
          <ColorDropdown value={color} setValue={setColor} />
        </View>
      </HorizontalView>
      <Button
        text="Save"
        style={{ backgroundColor: "#A0D8B3", marginTop: 200 }}
        activeOpacity={0.7}
        onPress={handleSave}
        loading={loading}
      />
    </Container>
  );
}
