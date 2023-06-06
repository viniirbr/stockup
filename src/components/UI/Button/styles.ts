import styled from "styled-components/native";

interface ButtonProps {
  disabled?: boolean;
}
export const TouchableContainer = styled.TouchableOpacity<ButtonProps>`
  width: 100%;
  border-radius: 5px;
  padding: 10px;
  flex-direction: row;
  justify-content: center;
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
`;

export const ButtonText = styled.Text`
  text-align: center;
  font-size: 24px;
  font-weight: bold;
`;
