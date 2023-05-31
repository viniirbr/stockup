import { View } from "react-native";
import { CreateProductForm } from "../components/CreateProductForm";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList, "CreateProduct">;

export function CreateProduct({ navigation }: Props) {
  return (
    <View>
      <CreateProductForm navigation={navigation} />
    </View>
  );
}
