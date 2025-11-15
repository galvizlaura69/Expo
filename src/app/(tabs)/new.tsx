import Button from "@/src/components/Button";
import { useUserContext } from "@/src/context/userContext";
import { createUsers } from "@/src/services/userService";
import { useState } from "react";
import { Modal, Pressable, StyleSheet, View } from "react-native";
import { Text } from "react-native-gesture-handler";

export default function newIndex() {

  const [modalVisible, setModalVisible] = useState(false);
  const { user } = useUserContext()
  const [loading, setLoading] = useState(false);

  const saveHunter = async () => {
    if (!user) return;
    try {
      setLoading(true);
      await createUsers({
        name: user?.name,
        lastName: user?.lastname,
        date: user?.date
      });
      alert("Usuario creado exitosamente")
      setModalVisible(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Button onPress={() => setModalVisible(true)} label="Mostrar datos" theme="primary" />
      <Button onPress={() => saveHunter()} label="Guardar" theme="primary" />
      <Modal visible={modalVisible} animationType="fade" transparent  >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            {user ?
              <Text> {user?.name} {user?.lastname} {user.date}</Text> :
              <Text> No hay datos del usuario</Text>
            }
            <Pressable
              onPress={() => setModalVisible(false)}
            >
              <Text style={{ color: "#fff" }}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e", padding: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: 10, backgroundColor: "#3a3a3a", borderRadius: 8 },
  name: { color: "#fff", fontSize: 16 },
  icons: { flexDirection: "row", gap: 15 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "rgba(0,0,0,0.5)" },
  modalContent: { width: "100%", backgroundColor: "#2e2e2e", borderRadius: 12, padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  confirmText: { color: "#ddd", fontSize: 16, marginBottom: 16, textAlign: "center" },
  input: { backgroundColor: "#3a3a3a", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});
