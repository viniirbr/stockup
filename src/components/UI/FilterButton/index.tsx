import { DrawerNavigationProp } from "@react-navigation/drawer";
import { Category } from "../../../shared/interfaces/Category";
import { Button } from "../Button";
import { RootDrawerParamList } from "../../../../App";

interface Props {
  category: Category;
  active?: boolean;
  selected?: boolean;
  onPress: (categoryId: string | number) => void;
  onLongPress?: () => void;
  navigation?: DrawerNavigationProp<RootDrawerParamList, "Home", undefined>;
}

export function FilterButton({
  category,
  active = true,
  selected = false,
  onPress,
  navigation,
}: Props) {
  return (
    <Button
      text={category.name}
      style={{
        borderRadius: 50,
        paddingVertical: 5,
        paddingHorizontal: 10,
        borderWidth: 2,
        borderColor: "#000",
        borderStyle: "solid",
        maxWidth: 100,
        opacity: active ? 1 : 0.5,
        backgroundColor: selected ? category.color : "transparent",
        width: "100%",
      }}
      textStyle={{ fontSize: 18, textAlign: "center", fontWeight: "bold" }}
      onPress={() => onPress(category.id)}
      onLongPress={() =>
        navigation && navigation.navigate("CreateCategory", { category })
      }
    />
  );
}
