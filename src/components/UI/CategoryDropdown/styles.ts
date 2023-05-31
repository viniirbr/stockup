import DropDownPicker from "react-native-dropdown-picker";
import styled from "styled-components/native";

export const Container = styled.View`
  width: 50%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;

export const HorizontalView = styled.View`
  display: flex;
  width: 70%;
  align-items: center;
  justify-content: space-between;
`;

export const DropdownStyled = styled(DropDownPicker)`
  width: 100%;
  border: 2px solid #000;
  background: transparent;
`;
