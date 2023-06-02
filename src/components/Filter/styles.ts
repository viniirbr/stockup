import styled from "styled-components/native";

export const FilterContainer = styled.ScrollView`
  width: 100%;
  align-items: center;
  overflow-x: scroll;
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

export const ToBuyTouchable = styled(FilterTouchable)`
  margin-right: 20px;
  border-radius: 10px;
  border-bottom-width: 8px;
`;

export const FilterText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  text-align: center;
`;

export const ToBuyText = styled(FilterText)`
  font-size: 22px;
`;
