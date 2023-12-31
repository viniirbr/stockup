import {
  ActivityIndicator,
  StyleProp,
  TextStyle,
  TouchableOpacityProps,
  ViewStyle,
} from "react-native";
import { ButtonText, TouchableContainer } from "./styles";

interface Props extends TouchableOpacityProps {
  text?: string;
  style?: StyleProp<ViewStyle>;
  textStyle?: StyleProp<TextStyle>;
  children?: React.ReactNode;
  loading?: boolean;
}

export function Button({
  text,
  style,
  textStyle,
  children,
  loading,
  ...props
}: Props) {
  return (
    <TouchableContainer {...props} style={style} activeOpacity={0.7}>
      {loading ? (
        <ActivityIndicator size={32} color="white" />
      ) : (
        <ButtonText style={textStyle}>{text}</ButtonText>
      )}
      {children}
    </TouchableContainer>
  );
}
