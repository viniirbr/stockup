import { useState, useEffect } from "react";
import { Container, DropdownStyled, HorizontalView } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootDrawerParamList } from "../../../../App";
import {
  DrawerNavigationProp,
  DrawerScreenProps,
} from "@react-navigation/drawer";

interface Props {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    "CreateProduct",
    undefined
  >;
}

export function CategoryDropdown({ navigation }: Props) {
  const [value, setValue] = useState(null);
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState<{ label: string; value: string }[]>([]);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await AsyncStorage.getItem("categories");
        if (categories) {
          const categoriesObject = JSON.parse(categories) as {
            name: string;
            color: string;
          }[];
          setItems(
            categoriesObject.map((category) => ({
              label: category.name.toUpperCase(),
              value: category.name,
            }))
          );
        }
        // console.log(JSON.parse(categories as string));
        // if (categories) setItems(JSON.parse(categories));
        // console.log(JSON.parse(categories as string));
      } catch (error) {
        console.log(error);
      }
    }
    loadCategories();
  }, []);

  return (
    <Container>
      <HorizontalView>
        <DropdownStyled
          items={items}
          value={value}
          open={open}
          setOpen={setOpen}
          setValue={setValue}
          setItems={setItems}
          placeholder="Category"
        />
      </HorizontalView>
      <Button
        activeOpacity={0.7}
        style={{
          position: "relative",
          top: 5,
          width: "auto",
        }}
        onPress={() => navigation.navigate("CreateCategory")}
      >
        <Ionicons name="add-outline" size={38} color="black" />
      </Button>
    </Container>
  );
}
