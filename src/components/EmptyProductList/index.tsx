import { Text, View } from "react-native";
import { CenteredView, Container, EmptyText } from "./styles";
import { Button } from "../UI/Button";
import { Ionicons } from "@expo/vector-icons";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";
import { joinArray } from "../../shared/helpers/joinArray";

interface Props {
  toBuyActive: boolean;
  filters: string[];
  navigation: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export const EmptyProductList = ({
  toBuyActive,
  filters,
  navigation,
}: Props) => {
  return (
    <CenteredView>
      {toBuyActive && filters.length === 0 && (
        <EmptyText>No products to buy</EmptyText>
      )}
      {!toBuyActive && filters.length === 0 && (
        <View>
          <EmptyText>No products. Add a new product here</EmptyText>
          <Button
            activeOpacity={0.7}
            style={{
              position: "relative",
              width: "auto",
              height: 50,
            }}
            onPress={() => navigation.navigate("CreateProduct")}
          >
            <Ionicons name="add-outline" size={38} color="black" />
          </Button>
        </View>
      )}
      {filters.length > 0 && (
        <EmptyText>
          No products{toBuyActive ? " to buy" : ""} when it comes to{" "}
          {joinArray(filters)}
        </EmptyText>
      )}
    </CenteredView>
  );
};
