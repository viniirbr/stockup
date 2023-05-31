import styled from "styled-components/native";

export const FilterContainer = styled.View`
  width: 100%;
  overflow-x: scroll;
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  gap: 10px;
`;

interface FilterTouchableProps {
  active: boolean;
  color: string;
}

export const FilterTouchable = styled.TouchableOpacity<FilterTouchableProps>`
  padding: 5px 10px;
  border: solid 2px #000;
  border-radius: 100px;
  max-width: 100px;
  background: ${(props) => (props.active ? props.color : "#fff")};
`;

export const FilterText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;
