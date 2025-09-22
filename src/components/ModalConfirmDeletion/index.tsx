import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch, useAppSelector } from "../../redux/hooks";
import { deleteTask } from "../../redux/tasks/operations";
import { ScreenNames } from "../../constants/screenNames";
import DefaultButton from "../DefaultButton";
import { selectThemeColors } from "../../redux/theme/selectors";

type Props = {
  taskId: string;
  backPath?: ScreenNames; 
  isVisible: boolean;
  onClose: () => void;
};

export default function ModalConfirmDeletion({
  taskId,
  backPath,
  isVisible,
  onClose,
}: Props) {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<any>();
  const color = useAppSelector(selectThemeColors);

  const handleDelete = async () => {
    await dispatch(deleteTask(taskId));
    onClose();
    if (backPath) {
      navigation.navigate(backPath);
    }
  };

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>Підтвердити видалення?</Text>

        <View style={styles.actions}>
          <DefaultButton
            text="Ні"
            onPress={onClose}
            backgroundColor={color.secondary}
          />
          <DefaultButton
            text="Так"
            onPress={handleDelete}
            backgroundColor={color.secondary}
          />
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: "white",
    padding: 20,
    borderRadius: 10,
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});
