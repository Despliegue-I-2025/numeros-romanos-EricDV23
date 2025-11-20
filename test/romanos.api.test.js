import request from "supertest";
import app from "../server.js";

describe("API TESTS - Romanos ↔ Arábigos", () => {
  describe("GET /r2a", () => {
    test("Error por caracteres inválidos", async () => {
      const res = await request(app).get("/r2a").query({ value: "ASDF" });
      expect(res.status).toBe(400);
    });

    test("Error por repeticiones excesivas", async () => {
      const res = await request(app).get("/r2a").query({ value: "IIII" });
      expect(res.status).toBe(400);
    });

    test("Error por orden incorrecto", async () => {
      const res = await request(app).get("/r2a").query({ value: "VX" });
      expect(res.status).toBe(400);
    });
  });

  describe("GET /a2r", () => {
    test("Error por negativo", async () => {
      const res = await request(app).get("/a2r").query({ value: -5 });
      expect(res.status).toBe(400);
    });

    test("Error por fuera de rango (0)", async () => {
      const res = await request(app).get("/a2r").query({ value: 0 });
      expect(res.status).toBe(400);
    });

    test("Error por fuera de rango (>3999)", async () => {
      const res = await request(app).get("/a2r").query({ value: 5000 });
      expect(res.status).toBe(400);
    });
  });
});
