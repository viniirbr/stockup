import { View, StyleSheet } from "react-native";
import { CreateProductForm } from "../components/CreateProductForm";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList, "CreateProduct">;

export function CreateProduct({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <CreateProductForm navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
