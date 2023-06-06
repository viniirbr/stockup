import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { CategoriesModal } from "../CategoriesModal";
import { Button } from "../UI/Button";
import { ToBuyText, ToBuyTouchable } from "./styles";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect, useContext } from "react";
import { FilterButton } from "../UI/FilterButton";
import { View, Text, ScrollView } from "react-native";
import { ProductsContext } from "../../contexts/ProductsContext";

interface FilterProps {
  filters: string[];
  handlePress: (name: string) => void;
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function Filter({ filters, handlePress, navigation }: FilterProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const { categories } = useContext(ProductsContext);

  useEffect(() => {
    const unsubscribe = navigation.addListener("blur", () => {
      setModalOpen(false);
    });

    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{
          alignItems: "center",
          gap: 10,
        }}
        horizontal
        scrollEnabled
      >
        {categories
          .filter((category) => category.active === true)
          .map((category) => (
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
