import styled from "styled-components/native";

export const Container = styled.KeyboardAvoidingView`
  justify-content: center;
  flex: 1;
`;

export const InnerContainer = styled.View`
  padding: 0 20px;
  display: flex;
  justify-content: space-between;
`;

export const HorizontalView = styled.View`
  width: 100%;
  flex-direction: row;
  align-items: flex-end;
  justify-content: space-between;
`;
