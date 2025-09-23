import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Modal from "react-native-modal";
import { useNavigation } from "@react-navigation/native";
import { useAppDispatch } from "../../redux/hooks";
import { deleteTask } from "../../redux/tasks/operations";
import { ScreenNames } from "../../constants/screenNames";
import DefaultButton from "../DefaultButton";
import { selectThemeColors } from "../../redux/theme/selectors";
import { selectTranslations } from "../../redux/language/selector";
import { useSelector } from "react-redux";

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
  const color = useSelector(selectThemeColors);
  const t = useSelector(selectTranslations);

  const handleDelete = async () => {
    await dispatch(deleteTask(taskId));
    onClose();
    if (backPath) {
      navigation.navigate(backPath);
    }
  };

  const styles = StyleSheet.create({
  modalBox: {
    backgroundColor: color.tertiary,
    padding: 20,
      borderRadius: 10,
      borderWidth: 1,
    borderColor: color.secondary
  },
  title: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: "center",
    color: color.quaternary
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    gap: 10
    
  },
  buttonContainer: {
    flex: 1
  },
});

  return (
    <Modal isVisible={isVisible} onBackdropPress={onClose}>
      <View style={styles.modalBox}>
        <Text style={styles.title}>{t.ModalConfirmDeletion.title}</Text>

        <View style={styles.actions}>
          <View  style={styles.buttonContainer}>
            <DefaultButton
              text={t.ModalConfirmDeletion.noBtn}
              onPress={onClose}
              backgroundColor={color.secondary}
            />
          </View>

          <View style={styles.buttonContainer}>
            <DefaultButton
              text={t.ModalConfirmDeletion.yesBtn}
              onPress={handleDelete}
              backgroundColor={color.nonary}
            />
          </View>
          </View>
      </View>
    </Modal>
  );
}


