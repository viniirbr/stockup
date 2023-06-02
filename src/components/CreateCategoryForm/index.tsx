import { Input } from "../UI/Input";
import { Container, HorizontalView } from "./styles";
import { Button } from "../UI/Button";
import { ColorDropdown } from "../ColorsDropdown";
import { View } from "react-native";
import { useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { RouteProp } from "@react-navigation/native";
import { Category } from "../../interfaces/Category";

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
  const [color, setColor] = useState(null);
  const [loading, setLoading] = useState(false);

  async function onSubmit() {
    try {
      setLoading(true);
      const categories = await AsyncStorage.getItem("categories");
      if (categories) {
        const categoriesObject = JSON.parse(categories) as Category[];
        const categoryFound = categoriesObject.find(
          (category) => category.name === name
        );
        if (categoryFound) {
          console.log("Category already exists");
          return;
        }
        await AsyncStorage.setItem(
          "categories",
          JSON.stringify([...categoriesObject, { name, color, active: true }])
        );
      } else {
        await AsyncStorage.setItem(
          "categories",
          JSON.stringify([{ name, color, active: true }])
        );
      }
      await AsyncStorage.getItem("categories");
      navigation.goBack();
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
        onPress={onSubmit}
        loading={loading}
      />
    </Container>
  );
}
