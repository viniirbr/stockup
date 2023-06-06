import styled from "styled-components/native";

export const PriceContainer = styled.View`
  flex-direction: row;
  align-items: center;
  width: 20%;
  gap: 10px;
`;

export const PriceInput = styled.TextInput`
  border-radius: 5px;
  border: 2px solid #000;
  width: 80px;
  height: 50px;
  text-align: center;
  font-size: 24px;
  padding: 10px;
`;

export const OptionContainer = styled.TouchableOpacity`
  width: 100%;
  border: 2px black solid;
  padding: 10px 5px;
  margin-bottom: 16px;
`;

export const OptionText = styled.Text`
  font-size: 18px;
  text-align: center;
  font-weight: bold;
`;
