import { useState, useEffect } from "react";
import { Container, DropdownStyled, HorizontalView } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { Button } from "../Button";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { RootDrawerParamList } from "../../../../App";
import { DrawerNavigationProp } from "@react-navigation/drawer";

interface Props {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    "CreateProduct",
    undefined
  >;
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<string | null>>;
}

export function CategoryDropdown({ navigation, value, setValue }: Props) {
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
              label: category.name,
              value: category.name,
            }))
          );
        }
      } catch (error) {
        console.log(error);
      }
    }
    function onFocus() {
      navigation.addListener("focus", () => {
        loadCategories();
      });
    }
    onFocus();
    return () => navigation.removeListener("focus", () => {});
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
          zIndex={100}
          listMode="MODAL"
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
