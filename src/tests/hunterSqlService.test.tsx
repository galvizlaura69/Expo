import axios from "axios";
import MockAdapter from "axios-mock-adapter";
import { createHunterSql, deleteHunterSql, getAllHuntersSql, HunterSql } from "../services/hunterSqlService";

const mock = new MockAdapter(axios);

describe("hunterSqlService", () => {
  const mockHunters: HunterSql[] = [
    { id: 1, nombre: "Gon", edad: 12, altura_cm: 154, peso_kg: 45, imagen: "", habilidad: "Adivinación", tiponen: "Enhancer" },
    { id: 2, nombre: "Killua", edad: 12, altura_cm: 150, peso_kg: 40, imagen: "", habilidad: "Electricidad", tiponen: "Transmuter" },
  ];

  afterEach(() => {
    mock.reset();
  });

 test("debería obtener todos los hunters SQL", async () => {
    mock.onGet("https://apimobile-sjrq.onrender.com/api/hunters-sql").reply(200, mockHunters);

    const hunters = await getAllHuntersSql();
    expect(hunters).toHaveLength(2);
    expect(hunters[1].nombre).toBe("Killua");
  });

 test("debería crear un nuevo hunter SQL", async () => {
    const newHunter: HunterSql = { id: 3, nombre: "Leorio", edad: 19, altura_cm: 180, peso_kg: 75, imagen: "", habilidad: "Medicina", tiponen: "Emitter" };
    mock.onPost("https://apimobile-sjrq.onrender.com/api/hunters-sql", newHunter).reply(201, newHunter);

    const created = await createHunterSql(newHunter);
    expect(created.id).toBe(3);
    expect(created.nombre).toBe("Leorio");
  });

 test("debería eliminar un hunter SQL (mock)", async () => {
    mock.onDelete("https://apimobile-sjrq.onrender.com/api/hunters-sql/1").reply(200, { msg: "Eliminado correctamente" });

    const res = await deleteHunterSql(1);
    expect(res.msg).toBe("Eliminado correctamente");
  });
});
