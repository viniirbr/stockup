import { Input } from "../UI/Input";
import { Container, HorizontalView } from "./styles";
import { CategoryDropdown } from "../UI/CategoryDropdown";
import { Button } from "../UI/Button";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import { RootDrawerParamList } from "../../../App";

interface Props {
  navigation: DrawerNavigationProp<
    RootDrawerParamList,
    "CreateProduct",
    undefined
  >;
}

export function CreateProductForm({ navigation }: Props) {
  return (
    <Container>
      <Input label="Name" keyboardType="default" />
      <HorizontalView style={{ zIndex: 1 }}>
        <Input label="Last price" keyboardType="numeric" />
        <CategoryDropdown navigation={navigation} />
      </HorizontalView>
      <Button
        text="Save"
        style={{ backgroundColor: "#A0D8B3" }}
        activeOpacity={0.7}
      />
    </Container>
  );
}
