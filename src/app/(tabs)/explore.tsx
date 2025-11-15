import Button from "@/src/components/Button";
import Caja from "@/src/components/Caja";
import { useUserContext } from "@/src/context/userContext";
import { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Text } from "react-native-gesture-handler";

export default function Index() {


  const [lastname, setLastName] = useState("")
  const { setUser, user } = useUserContext()
  const [resetSignal, setResetSignal] = useState(false)

  const today = new Date;


  const handleChange = () => {
    setUser({
      name: user?.name,
      lastname: lastname,
      date: String(today)
    })
    alert("Apellido agregado")
    setLastName("")
    setResetSignal(true)
  }

  return (
    <View style={styles.container}>
      <Caja onChange={(e) => setLastName(e)} resetSignal={resetSignal} />
      <Button onPress={handleChange} label="Agregar apellido" theme="primary" />
      <View style={styles.modalContainer}>
        <Text> Datos del usuario</Text>
        <Text> {user?.name} {user?.lastname}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#25292e", padding: 20 },
  row: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: 10, padding: 10, backgroundColor: "#3a3a3a", borderRadius: 8 },
  name: { color: "#fff", fontSize: 16 },
  icons: { flexDirection: "row", gap: 15 },
  modalContainer: { flex: 1, justifyContent: "center", alignItems: "center", backgroundColor: "red", margin: 30 },
  modalContent: { width: "100%", backgroundColor: "#2e2e2e", borderRadius: 12, padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  confirmText: { color: "#ddd", fontSize: 16, marginBottom: 16, textAlign: "center" },
  input: { backgroundColor: "#3a3a3a", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});
