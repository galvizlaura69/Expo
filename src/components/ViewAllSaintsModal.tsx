import { normalizeImageUrl } from "@/src/utils/normalizeImageUrl";
import React, { useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Modal,
    Pressable,
    StyleSheet,
    Text,
    View,
} from "react-native";
import { getAllSaints, SaintResponse } from "../services/saintService";

export default function ViewAllSaintsModal() {
  const [visible, setVisible] = useState(false);
  const [saints, setSaints] = useState<SaintResponse[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleFetchSaints = async () => {
    setVisible(true);
    setLoading(true);
    setError(null);
    const result = await getAllSaints();
    setLoading(false);

    if ("error" in result) {
      setError(result.error);
      setSaints([]);
    } else {
      setSaints(result);
    }
  };

  const renderItem = ({ item }: { item: SaintResponse }) => {
    const safeImageUrl = normalizeImageUrl(item.imageUrl);
    return (
      <View style={styles.card}>
        {safeImageUrl ? (
          <Image source={{ uri: safeImageUrl }} style={styles.image} />
        ) : (
          <Text style={styles.noImage}>Sin imagen</Text>
        )}
        <Text style={styles.name}>{item.name}</Text>
        <Text style={styles.data}>Constelación: {item.constellation}</Text>
        <Text style={styles.data}>Tipo: {item.armorType}</Text>
        <Text style={styles.data}>Poder: {item.powerLevel}</Text>
        <Text style={styles.data}>Dios: {item.guardianGod}</Text>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Pressable style={styles.openButton} onPress={handleFetchSaints}>
        <Text style={styles.buttonText}>Ver Todos los Caballeros</Text>
      </Pressable>

      <Modal
        animationType="fade"
        transparent
        visible={visible}
        onRequestClose={() => setVisible(false)}
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <Text style={styles.title}>⚔️ Caballeros del Zodiaco ⚔️</Text>

            {loading ? (
              <ActivityIndicator size="large" color="#4A90E2" />
            ) : error ? (
              <Text style={styles.noData}>{error}</Text>
            ) : (
              <FlatList
                data={saints}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
                showsVerticalScrollIndicator={false}
                style={{ width: "100%" }}
                horizontal
              />
            )}

            <Pressable
              style={[styles.openButton, { backgroundColor: "#333" }]}
              onPress={() => setVisible(false)}
            >
              <Text style={styles.buttonText}>Cerrar</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  openButton: {
    backgroundColor: "#4A90E2",
    borderRadius: 10,
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 10,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0,0,0,0.4)",
  },
  modalView: {
    width: "90%",
    height: "80%",
    backgroundColor: "#2e2e2e",
    borderRadius: 16,
    padding: 16,
    alignItems: "center",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 10,
  },
  card: {
    backgroundColor: "#3b3b3b",
    borderRadius: 10,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 10,
    marginBottom: 8,
  },
  noImage: {
    color: "#aaa",
    marginBottom: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 4,
  },
  data: {
    color: "#ddd",
    fontSize: 14,
  },
  noData: {
    color: "#bbb",
    textAlign: "center",
    marginVertical: 20,
  },
});
