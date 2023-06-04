import { Modal, ModalProps, StyleSheet, Text } from "react-native";
import { CenteredView, ModalView } from "./styles";
import { Title } from "../../Card/styles";
import { Button } from "../Button";
import { Ionicons } from "@expo/vector-icons";

interface Props extends ModalProps {
  title: string;
  children: React.ReactNode;
  close: () => void;
}

export function ModalContainer({ title, close, children, ...props }: Props) {
  return (
    <Modal {...props} transparent>
      <CenteredView>
        <ModalView style={styles.modal}>
          <Title>{title}</Title>
          <Button
            style={{ position: "absolute", top: 10, left: "45%" }}
            onPress={close}
          >
            <Ionicons name="close" size={32} />
          </Button>
          {children}
        </ModalView>
      </CenteredView>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});
