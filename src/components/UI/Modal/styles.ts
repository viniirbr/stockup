import styled from "styled-components/native";

export const CenteredView = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  background: rgba(0, 0, 0, 0.2);
`;

export const ModalView = styled.View`
  background-color: white;
  border-radius: 20px;
  align-items: center;
  width: 80%;
  padding: 30px 10px;
  min-height: 200px;
  gap: 20px;
`;

export const Title = styled.Text`
  font-size: 20px;
  font-weight: bold;
`;
