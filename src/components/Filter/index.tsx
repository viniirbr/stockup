import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { Category } from "../../interfaces/Category";
import { CategoriesModal } from "../CategoriesModal";
import { Button } from "../UI/Button";
import { ToBuyText, ToBuyTouchable } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { FilterButton } from "../UI/FilterButton";
import { ScrollView } from "react-native";
import { View } from "react-native";

interface FilterProps {
  filters: string[];
  handlePress: (name: string) => void;
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function Filter({ filters, handlePress, navigation }: FilterProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  console.log(categories);

  useEffect(() => {
    async function loadCategories() {
      try {
        const categories = await AsyncStorage.getItem("categories");
        if (categories) {
          const categoriesObject = JSON.parse(
            categories as string
          ) as Category[];

          const activeCategories = categoriesObject.filter(
            (category) => category.active === true
          );
          setCategories(activeCategories);
        }
      } catch (error) {
        console.log(error);
      }
    }
    loadCategories();
  }, [modalOpen]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          flexDirection: "row",
          alignItems: "center",
          gap: 10,
          flexGrow: 1,
          width: `${categories.length * 35}%`,
        }}
        horizontal
        scrollEnabled
      >
        {categories.map((category) => (
          <FilterButton
            key={category.name}
            category={category}
            onPress={() => handlePress(category.name)}
            selected={filters?.includes(category.name)}
          />
        ))}
        <Button
          activeOpacity={0.7}
          style={{
            width: 50,
          }}
          onPress={() => setModalOpen(true)}
        >
          <Ionicons name="add-outline" size={38} color="black" />
        </Button>
        <CategoriesModal
          visible={modalOpen}
          setModalVisible={setModalOpen}
          navigation={navigation}
        />
      </ScrollView>
    </View>
  );
}

interface ToBuyButtonProps {
  toBuyActive: boolean;
  setActive: React.Dispatch<React.SetStateAction<boolean>>;
}

export function ToBuyButton({ toBuyActive, setActive }: ToBuyButtonProps) {
  return (
    <ToBuyTouchable
      active={toBuyActive}
      activeOpacity={0.7}
      color={"#ddd"}
      onPress={() => setActive(!toBuyActive)}
    >
      <ToBuyText>To buy</ToBuyText>
    </ToBuyTouchable>
  );
}
