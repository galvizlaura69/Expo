import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { useAnimalContext } from "../context/animalContext";

type AnimalProps = {
    name: string;
    temperament?: string;
    origin: string;
    life_span?: string;
    description?: string;
    image?: string;
};

type Props = {
    animal?: AnimalProps | null;
    errorProps?: string
};

export default function AnimalText({ animal,errorProps }: Props) {
    const { animal: contextAnimal, error:errorContext } = useAnimalContext();
    const data = animal || contextAnimal;
    const error = errorProps || errorContext

  if (error) {
    return (
      <View style={styles.container}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }
  if (!data || !data.name) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No hay datos del animal</Text>
      </View>
    );
  }

    return (
        <View style={styles.container}>
            {(!animal && contextAnimal?.image) && (
                <Image
                    source={{ uri: data.image }}
                    style={styles.image}
                    resizeMode="cover"
                />
            )}
            <Text style={styles.text}>Nombre: {data.name}</Text>
            <Text style={styles.text}>Tipo: {data.origin}</Text>
            {data.description &&
                <Text style={styles.textLocal}>Descripción local: {data.description}</Text>}
            {data?.temperament && (
                <>
                    <Text style={styles.textLocal}>
                        Temperamento local: {data.temperament}
                    </Text>
                </>
            )}
            {!animal && (
                <>
                    {contextAnimal?.life_span && (
                        <Text style={styles.textContext}>Esperanza de vida context:{contextAnimal?.life_span} años</Text>
                    )}
                </>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        marginTop: 20,
        alignItems: "center",
    },
    text: {
        fontSize: 16,
        marginVertical: 4,
        textAlign: "center",
    },
    textContext: {
        fontSize: 16,
        marginVertical: 4,
        textAlign: "center",
        color: "green"
    },
    textLocal: {
        fontSize: 16,
        marginVertical: 4,
        textAlign: "center",
        color: "blue"
    },
    image: {
        width: 200,
        height: 200,
        borderRadius: 10,
        marginBottom: 10,
    },
    errorText: {
        fontSize: 16,
        color: "red",
        textAlign: "center",
        marginVertical: 10,
    },
});
