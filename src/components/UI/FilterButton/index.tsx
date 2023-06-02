import { Category } from "../../../interfaces/Category";
import { Button } from "../Button";

interface Props {
  category: Category;
  active?: boolean;
  selected?: boolean;
  onPress: (category: string) => void;
}

export function FilterButton({
  category,
  active = true,
  selected = false,
  onPress,
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
      onPress={() => onPress(category.name)}
    />
  );
}

/*padding: 5px 10px;
  border: solid 2px #000;
  border-radius: 100px;
  max-width: 100px;*/
