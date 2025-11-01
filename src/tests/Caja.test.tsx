import { fireEvent, render, waitFor } from "@testing-library/react-native";
import React from "react";
import Caja from "../components/Caja";

jest.mock("../utils/constPokemons", () => ({
  ANIMAL_NAMES: [
    "Siamese",
    "Persian",
    "Maine Coon",],
}));

describe("Caja", () => {
  test("llama onChange con el texto ingresado", () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText } = render(<Caja onChange={mockOnChange} />);

    const input = getByPlaceholderText("Escribe el nombre del Animal");
    fireEvent.changeText(input, "Pe");

    expect(mockOnChange).toHaveBeenCalledWith("Pe");
  });

  test("reinicia el valor cuando resetSignal cambia a true", async () => {
    const mockOnChange = jest.fn();
    const { getByPlaceholderText, rerender } = render(
      <Caja onChange={mockOnChange} resetSignal={false} />
    );

    const input = getByPlaceholderText("Escribe el nombre del Animal");
    fireEvent.changeText(input, "Gato");
    expect(input.props.value).toBe("Gato");

    rerender(<Caja onChange={mockOnChange} resetSignal={true} />);

    await waitFor(() => {
      expect(input.props.value).toEqual("");
    });

    expect(mockOnChange).toHaveBeenCalledWith("");
  });
});
