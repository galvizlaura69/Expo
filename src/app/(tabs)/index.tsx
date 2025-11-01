import Button from "@/src/components/Button";
import GestureImageViewer from "@/src/components/GestureImageViewer";
import { createHunter, deleteHunter, getAllHunters, getHunterByName, Hunter, updateHunter } from "@/src/services/hunterService";
import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HuntersScreen() {
  const [hunters, setHunters] = useState<Hunter[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentHunter, setCurrentHunter] = useState<Hunter | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");

  const generateGuid = () => {
  return 'xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx'.replace(/[x]/g, () =>
    Math.floor(Math.random() * 16).toString(16)
  );
};


  const fetchAllHunters = async () => {
    try {
      setLoading(true);
      const data = await getAllHunters();
      setHunters(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllHunters();
  }, []);

  const openModal = (mode: "view" | "edit" | "create", hunter?: Hunter) => {
    if (hunter) setCurrentHunter(hunter);
    else
      setCurrentHunter({
        _id: "",
        nombre: "",
        edad: 0,
        altura_cm: 0,
        peso_kg: 0,
        imagen: "",
        habilidad: "",
        tipoNen: "",
      });
    setModalMode(mode);
    setModalVisible(true);
  };

const saveHunter = async () => { 
  if (!currentHunter) return;
  try {
    setLoading(true);

    if (modalMode === "edit" && currentHunter._id) {
      await updateHunter(currentHunter._id, currentHunter);
    }

    if (modalMode === "create") {
      currentHunter._id = generateGuid();
      await createHunter(currentHunter);
    }

    await fetchAllHunters();
    setModalVisible(false);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const openDeleteModal = (hunter: Hunter) => {
    setCurrentHunter(hunter);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!currentHunter?._id) return;
    try {
      setLoading(true);
      await deleteHunter(currentHunter._id);
      await fetchAllHunters();
      setDeleteModalVisible(false);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleView = async (nombre: string) => {
    try {
      setLoading(true);
      const hunter = await getHunterByName(nombre);
      setCurrentHunter(hunter);
      openModal("view", hunter);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      {loading && <ActivityIndicator size="large" color="#fff" />}

      <FlatList
        data={hunters}
        keyExtractor={(item) => item._id || Math.random().toString()}
        renderItem={({ item }) => (
          <View style={styles.row}>
            <Text style={styles.name}>{item.nombre}</Text>
            <View style={styles.icons}>
              <TouchableOpacity onPress={() => handleView(item.nombre)}>
                <Ionicons name="eye" size={24} color="#4caf50" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openModal("edit", item)}>
                <Ionicons name="pencil" size={24} color="#2196f3" />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => openDeleteModal(item)}>
                <Ionicons name="trash" size={24} color="#f44336" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />

      <Button label="Crear Hunter" size="sm" onPress={() => openModal("create")} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>
              {modalMode === "view" ? "Ver Hunter" : modalMode === "edit" ? "Editar Hunter" : "Crear Hunter"}
            </Text>

            {currentHunter &&
              ["nombre", "edad", "altura_cm", "peso_kg", "habilidad", "tipoNen", "imagen"].map((field) => (
                <TextInput
                  key={field}
                  style={styles.input}
                  placeholder={field}
                  value={(currentHunter as any)[field]?.toString()}
                  onChangeText={(text) =>
                    setCurrentHunter({
                      ...currentHunter,
                      [field]:
                        field === "edad" || field.includes("cm") || field.includes("kg") ? Number(text) : text,
                    })
                  }
                  editable={modalMode !== "view"}
                />
              ))}

            {currentHunter?.imagen && modalMode !== "create" && <GestureImageViewer source={currentHunter.imagen} />}

            <View style={styles.modalButtons}>
              <Button label="Cancelar" size="xs" theme="secondary" onPress={() => setModalVisible(false)} />
              {modalMode !== "view" && <Button label="Guardar" size="xs" onPress={saveHunter} />}
            </View>
          </ScrollView>
        </View>
      </Modal>

      <Modal visible={deleteModalVisible} animationType="fade" transparent>
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.title}>Eliminar Hunter</Text>
            <Text style={styles.confirmText}>¿Seguro que quieres eliminar este hunter?</Text>
            <View style={styles.modalButtons}>
              <Button label="Cancelar" size="xs" theme="secondary" onPress={() => setDeleteModalVisible(false)} />
              <Button label="Eliminar" size="xs" onPress={handleDelete} />
            </View>
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
