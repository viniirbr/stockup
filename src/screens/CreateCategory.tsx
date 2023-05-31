import { View } from "react-native";
import { CreateCategoryForm } from "../components/CreateCategoryForm";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList, "CreateCategory">;

export function CreateCategory({ navigation, route }: Props) {
  return (
    <View>
      <CreateCategoryForm navigation={navigation} route={route} />
    </View>
  );
}
