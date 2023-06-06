import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  flex: 1;
  justify-content: center;
`;

export const InnerContainer = styled.View`
  display: flex;
  justify-content: space-between;
  padding: 0 20px;
  gap: 10px;
`;

export const HorizontalView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
  margin-bottom: 100px;
`;
