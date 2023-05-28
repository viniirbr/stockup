import { GestureResponderEvent } from "react-native";
import { Category } from "../../interfaces/Category";
import { FilterContainer, FilterText, FilterTouchable } from "./styles";

interface Props {
  categories: { category: Category; active: boolean }[];
  handlePress: (id: number) => void;
  toBuyActive: boolean;
}

export function Filter({ categories, handlePress, toBuyActive }: Props) {
  return (
    <FilterContainer>
      {[
        {
          category: { id: 1, name: "To buy", color: "#ddd" },
          active: toBuyActive,
        },
        ...categories,
      ].map((category) => (
        <FilterTouchable
          active={category.active}
          activeOpacity={0.7}
          key={category.category.id}
          color={category.category.color}
          onPress={() => handlePress(category.category.id)}
        >
          <FilterText>{category.category.name}</FilterText>
        </FilterTouchable>
      ))}
    </FilterContainer>
  );
}
