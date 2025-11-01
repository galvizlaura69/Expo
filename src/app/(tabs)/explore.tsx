import Button from "@/src/components/Button";
import GestureImageViewer from "@/src/components/GestureImageViewer";
import { HunterSql, createHunterSql, deleteHunterSql, getAllHuntersSql, getHunterSqlByName, updateHunterSql } from "@/src/services/hunterSqlService";
import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from "react-native";

export default function HuntersSqlScreen() {
  const [hunters, setHunters] = useState<HunterSql[]>([]);
  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const [currentHunter, setCurrentHunter] = useState<HunterSql | null>(null);
  const [modalMode, setModalMode] = useState<"view" | "edit" | "create">("view");

  const fetchAllHunters = async () => {
    try {
      setLoading(true);
      const data = await getAllHuntersSql();
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

  const openModal = (mode: "view" | "edit" | "create", hunter?: HunterSql) => {
    if (hunter) setCurrentHunter(hunter);
    else
      setCurrentHunter({
        id: 0,
        nombre: "",
        edad: 0,
        altura_cm: 0,
        peso_kg: 0,
        imagen: "",
        habilidad: "",
        tiponen: "",
      });
    setModalMode(mode);
    setModalVisible(true);
  };

const saveHunter = async () => {
  if (!currentHunter) return;

  try {
    setLoading(true);

    if (modalMode === "edit") {
      await updateHunterSql(currentHunter.id, currentHunter);
    }
    if (modalMode === "create") {
      const newId = hunters.length > 0 ? Math.max(...hunters.map(h => h.id)) + 1 : 1;
      currentHunter.id = newId;
      await createHunterSql(currentHunter);
    }

    await fetchAllHunters();
    setModalVisible(false);
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};


  const openDeleteModal = (hunter: HunterSql) => {
    setCurrentHunter(hunter);
    setDeleteModalVisible(true);
  };

  const handleDelete = async () => {
    if (!currentHunter) return;
    try {
      setLoading(true);
      await deleteHunterSql(currentHunter.id);
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
      const hunter = await getHunterSqlByName(nombre);
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
        keyExtractor={(item) => item.id.toString()}
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

      <Button label="Crear Hunter SQL" size="sm" onPress={() => openModal("create")} />

      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalContainer}>
          <ScrollView contentContainerStyle={styles.modalContent}>
            <Text style={styles.title}>
              {modalMode === "view" ? "Ver Hunter" : modalMode === "edit" ? "Editar Hunter" : "Crear Hunter"}
            </Text>

            {currentHunter &&
              ["nombre", "edad", "altura_cm", "peso_kg", "habilidad", "tiponen", "imagen"].map((field) => (
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
  modalContent: { width: "90%", backgroundColor: "#2e2e2e", borderRadius: 12, padding: 20 },
  title: { color: "#fff", fontSize: 20, fontWeight: "bold", marginBottom: 12, textAlign: "center" },
  confirmText: { color: "#ddd", fontSize: 16, marginBottom: 16, textAlign: "center" },
  input: { backgroundColor: "#3a3a3a", color: "#fff", padding: 10, borderRadius: 8, marginBottom: 10 },
  modalButtons: { flexDirection: "row", justifyContent: "space-between", marginTop: 10 },
});
