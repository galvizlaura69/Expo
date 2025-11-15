import { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { getAllUsers, User } from "../services/userService";

export default function ListUsers() {
    const [visible, setVisible] = useState(false);
    const [users, setUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(false);

    const fetchAllUsers = async () => {
        try {
            setLoading(true);
            const data = await getAllUsers();
            setUsers(data);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (visible) fetchAllUsers();
    }, [visible]);

    return (
        <>
            <Pressable
                onPress={() => setVisible(true)}
                style={{ padding: 10 }}
            >
                <Text style={{ fontSize: 18, fontWeight: "bold" }}>Usuarios</Text>
            </Pressable>

            <Modal animationType="slide" visible={visible} transparent={true}>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>

                        <Text style={styles.title}>Lista de Usuarios</Text>

                        {loading ? (
                            <ActivityIndicator size="large" color="#fff" />
                        ) : (
                            <FlatList
                                data={users}
                                keyExtractor={(item) => item.id?.toString() || Math.random().toString()}
                                renderItem={({ item }) => (
                                    <View style={styles.row}>
                                        <Text style={styles.name}>{item.name} </Text>
                                        <Text style={styles.name}>{item.lastName}</Text>
                                        <Text style={styles.name}>{item.date}</Text>
                                    </View>
                                )}
                            />
                        )}

                        <Pressable
                            style={styles.closeBtn}
                            onPress={() => setVisible(false)}
                        >
                            <Text style={{ color: "#fff" }}>Cerrar</Text>
                        </Pressable>

                    </View>
                </View>
            </Modal>
        </>
    );
}

const styles = StyleSheet.create({
    modalContainer: {
        flex: 1,
        justifyContent: "center",
        backgroundColor: "rgba(0,0,0,0.5)",
    },
    modalContent: {
        margin: 20,
        backgroundColor: "#222",
        padding: 20,
        borderRadius: 12,
        maxHeight: "70%",
    },
    title: {
        color: "#fff",
        fontSize: 22,
        textAlign: "center",
        marginBottom: 15,
    },
    row: {
        padding: 10,
        backgroundColor: "#333",
        borderRadius: 8,
        marginBottom: 8,
        flexDirection: "row",
        justifyContent: "space-between",
    },
    name: { color: "#fff", margin:2 },
    closeBtn: {
        marginTop: 15,
        padding: 10,
        backgroundColor: "#444",
        borderRadius: 8,
        alignSelf: "center",
    },
});
