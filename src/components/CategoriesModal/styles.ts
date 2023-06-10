import styled from "styled-components/native";

export const ModalContainer = styled.Modal`
  display: flex;
  flex: 1;
`;
export const ModalTitle = styled.Text`
  text-align: center;
  font-size: 22px;
  font-weight: bold;
`;

export const CategoriesContainer = styled.View`
  display: flex;
  flex-direction: row;
  align-items: center;
  flex-wrap: wrap;
  padding: 10% 5%;
  gap: 10px;
`;

export const EmptyText = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const FilterTouchable = styled.TouchableOpacity`
  padding: 5px 10px;
  border: solid 2px #000;
  border-radius: 100px;
  max-width: 100px;
`;
