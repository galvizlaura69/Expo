import axios from "axios";

const API_URL = "https://apimobile-sjrq.onrender.com/api/users";

export interface User {
    id?:string,
    name?: string,
    lastName?: string,
    date?: string
}

export const getAllUsers = async (): Promise<User[]> => {
    try {
        const response = await axios.get<User[]>(API_URL);
        return response.data;
    } catch (error) {
        console.error("Error obteniendo todos los hunters:", error);
        throw error;
    }
};

export const createUsers = async (hunterData: User): Promise<User> => {
    try {
        const response = await axios.post<User>(API_URL, hunterData);
        return response.data;
    } catch (error) {
        console.error("Error creando el usuario:", error);
        throw error;
    }
};