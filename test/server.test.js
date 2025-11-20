import request from "supertest";
import app from "../server.js";

describe("TESTS API → Romanos ↔ Arábigos", () => {
  test("Debe fallar con romano inválido", async () => {
    const res = await request(app).post("/romanos/a-arabigo").send({ roman: "ASDF" });
    expect(res.status).toBe(400);
  });

  test("Debe fallar si no es un número válido", async () => {
    const res = await request(app).post("/romanos/a-romano").send({ arabic: "12abc" });
    expect(res.status).toBe(400);
  });
});
