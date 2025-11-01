import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { ANIMAL_NAMES } from "../utils/constPokemons";

type Props = {
  onChange: (text: string) => void;  
  resetSignal?: boolean;             
};

export default function Caja({ onChange, resetSignal }: Props) {
  const [nombre, setNombre] = useState("");
  const [suggestion, setSuggestion] = useState("");

  const handleChange = (text: string) => {
    setNombre(text);
    onChange(text); 

    if (text.length > 0) {
      const match = ANIMAL_NAMES.find((p) =>
        p.toLowerCase().startsWith(text.toLowerCase())
      );
      setSuggestion(match && match !== text ? match : "");
    } else {
      setSuggestion("");
    }
  };

  useEffect(() => {
    if (resetSignal) {
      setNombre("");
      setSuggestion("");
      onChange(""); 
    }
  }, [resetSignal]);

  return (
    <View style={styles.container}>
      <View style={styles.inputWrapper}>
        <TextInput
          placeholder="Escribe el nombre del Animal"
          value={nombre}
          onChangeText={handleChange}
          style={styles.input}
          autoCapitalize="none"
          onSubmitEditing={() => onChange(nombre.trim())}
        />
        {suggestion ? (
          <Text style={styles.suggestion}>{suggestion}</Text>
        ) : null}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { padding: 10, width: "100%", alignItems: "center" },
  inputWrapper: { position: "relative", width: "100%" },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
    borderRadius: 5,
    fontSize: 16,
  },
  suggestion: {
    position: "absolute",
    top: 9,
    left: 12,
    color: "#aaa",
    fontSize: 16,
  },
});
