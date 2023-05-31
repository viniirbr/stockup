import { View, TextInputProps, ViewStyle } from "react-native";
import { TextInputStyled, TextLabel } from "./styles";
import { StyleProp } from "react-native";

interface Props extends TextInputProps {
  label: string;
  style?: StyleProp<ViewStyle>;
}

export function Input({ label, style, ...props }: Props) {
  return (
    <View style={style}>
      <TextLabel>{label}</TextLabel>
      <TextInputStyled
        {...props}
        style={{
          textAlign: props.keyboardType === "numeric" ? "center" : "left",
        }}
      />
    </View>
  );
}
