import styled from "styled-components/native";

interface ContainerProps {
  selected: boolean;
}

export const ItemContainer = styled.TouchableOpacity<ContainerProps>`
  border: solid 2px #000;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 14px;
  width: 100%;
  align-items: center;
  opacity: ${(props) => (props.selected ? 1 : 0.5)};
`;

export const ItemText = styled.Text`
  font-weight: bold;
`;

export const Title = styled.Text`
  font-size: 16px;
  font-weight: bold;
  text-align: justify;
`;
