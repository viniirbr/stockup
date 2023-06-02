import { Text, TouchableOpacity } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import { useState } from "react";

interface Props {
  value: string | null;
  setValue: React.Dispatch<React.SetStateAction<null>>;
}

export function ColorDropdown({ value, setValue }: Props) {
  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([
    { label: "Gray ", value: "#F1F1EF" },
    { label: "Brown ", value: "#F3EEEE" },
    { label: "Orange ", value: "#F8ECDF" },
    { label: "Yellow ", value: "#FAF3DD" },
    { label: "Green ", value: "#EEF3ED" },
    { label: "Blue", value: "#E9F3F7" },
    { label: "Purple", value: "#F6F3F8" },
    { label: "Pink", value: "#F9F2F5" },
    { label: "Red", value: "#FAECEC" },
  ]);
  return (
    <DropDownPicker
      renderListItem={(props) => (
        <TouchableOpacity
          activeOpacity={0.7}
          style={{
            borderRadius: 5,
            backgroundColor: props.value,
            width: 30,
            height: 30,
            margin: 5,
          }}
          onPress={() => props.onPress(props as any)}
        />
      )}
      value={value}
      setValue={setValue}
      items={items}
      setItems={setItems}
      multiple={false}
      open={open}
      setOpen={setOpen}
      placeholder="color"
      style={{ width: "100%", borderColor: value || "#000" }}
      listMode="MODAL"
    />
  );
}
