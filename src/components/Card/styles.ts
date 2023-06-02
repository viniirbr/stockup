import styled from "styled-components/native";
import { Feather } from "@expo/vector-icons";

export const Container = styled.View`
  border: solid 2px #000;
  border-radius: 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  height: 100px;
  margin-bottom: 14px;
`;

export const PicView = styled.View`
  width: 20%;
`;

export const PicPlaceHolder = styled.View`
  width: 100%;
  height: 80px;
  background: #ccc;
  border-radius: 10px;
`;

export const ViewInfo = styled.View`
  width: 76%;
  height: 100%;
  display: flex;
  justify-content: space-between;
`;

export const HoriontalView = styled.View`
  display: flex;
  justify-content: space-between;
  flex-direction: row;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
export const QuantityText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: #aaa;
`;

interface CategoryProps {
  color: string;
}
export const CategoryView = styled.View<CategoryProps>`
  background: ${({ color }) => color};
  border-radius: 5px;
  width: 20%;
  padding: 4px;
`;

export const CategoryText = styled.Text`
  text-align: center;
  font-weight: bold;
`;

export const PriceText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

interface CheckProps {
  checked: boolean;
}

export const CheckTouchable = styled.TouchableOpacity<CheckProps>`
  background: ${({ checked }) => (checked ? "#ddffbb" : "#FA9884")};
  padding: 6px;
  border-radius: 100px;
  position: absolute;
  bottom: 2px;
  right: 2px;
`;

export const CheckText = styled(Feather)`
  color: #a4bc92;
`;

export const ShoppingText = styled(Feather)`
  color: #e74646;
`;
