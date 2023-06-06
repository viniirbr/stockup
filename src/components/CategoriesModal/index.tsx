import { ModalProps } from "react-native";
import { CategoriesContainer, ModalContainer, ModalTitle } from "./styles";
import { Button } from "../UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { useContext } from "react";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { FilterButton } from "../UI/FilterButton";
import { ProductsContext } from "../../contexts/ProductsContext";

interface Props extends ModalProps {
  setModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function CategoriesModal({
  setModalVisible,
  navigation,
  ...props
}: Props) {
  const { categories, toggleCategoryActivate } = useContext(ProductsContext);

  async function handlePress(categoryId: string | number) {
    await toggleCategoryActivate(categoryId);
  }

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
            navigation={navigation}
          />
        ))}
        <Button
          activeOpacity={0.7}
          style={{
            position: "relative",
            width: "auto",
            height: 50,
          }}
          onPress={() => navigation.navigate("CreateCategory")}
        >
          <Ionicons name="add-outline" size={38} color="black" />
        </Button>
      </CategoriesContainer>
    </ModalContainer>
  );
}
