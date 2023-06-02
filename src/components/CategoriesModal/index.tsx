import { ModalProps, Text } from "react-native";
import {
  CategoriesContainer,
  FilterTouchable,
  ModalContainer,
  ModalTitle,
} from "./styles";
import { Button } from "../UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { Category } from "../../interfaces/Category";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterButton } from "../UI/FilterButton";

interface Props extends ModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function CategoriesModal({
  setModalVisible,
  navigation,
  ...props
}: Props) {
  const [categories, setCategories] = useState<Category[]>([]);

  function handlePress(categoryName: string) {
    const categoryIndex = categories.findIndex(
      (category) => category.name === categoryName
    );
    const newCategories = [...categories];
    newCategories[categoryIndex].active = !newCategories[categoryIndex].active;
    setCategories(newCategories);
    updateCategories(newCategories);
  }

  useEffect(() => {
    async function loadCategories() {
      try {
        const categoriesStored = await AsyncStorage.getItem("categories");
        if (categories) {
          const categoriesObject = JSON.parse(
            categoriesStored as string
          ) as Category[];
          setCategories(categoriesObject);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadCategories();
  }, [props.visible]);

  return (
    <ModalContainer {...props}>
      <Button
        style={{ justifyContent: "flex-start" }}
        activeOpacity={0.7}
        onPress={() => setModalVisible(!props.visible)}
      >
        <Ionicons name="close-outline" size={38} color="black" />
      </Button>
      <ModalTitle>Select the categories you want to activate</ModalTitle>
      <CategoriesContainer>
        {categories.map((category) => (
          <FilterButton
            key={category.name}
            category={category}
            onPress={handlePress}
            active={category.active}
          />
        ))}
      </CategoriesContainer>
    </ModalContainer>
  );
}

function updateCategories(categories: Category[]) {
  try {
    if (categories.length === 0) return;
    console.log("categories modal", categories);
    AsyncStorage.setItem("categories", JSON.stringify(categories));
  } catch (error) {
    console.log(error);
  }
}
