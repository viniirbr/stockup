import { View, StyleSheet } from "react-native";
import { CreateCategoryForm } from "../components/CreateCategoryForm";
import { DrawerScreenProps } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../App";

type Props = DrawerScreenProps<RootDrawerParamList, "CreateCategory">;

export function CreateCategory({ navigation, route }: Props) {
  return (
    <View style={styles.container}>
      <CreateCategoryForm navigation={navigation} route={route} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
