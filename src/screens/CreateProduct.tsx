import { View } from "react-native";
import { CreateProductForm } from "../components/CreateProductForm";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList, "CreateProduct">;

export function CreateProduct({ navigation, route }: Props) {
  return (
    <View>
      <CreateProductForm navigation={navigation} route={route} />
    </View>
  );
}
