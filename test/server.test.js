const request = require("supertest");
const app = require("../server");

describe("TESTS API → Romanos ↔ Arábigos", () => {
  // -------------------------------
  // ROMANO → ARÁBIGO
  // -------------------------------
  describe("POST /romanos/a-arabigo", () => {
    test("MCMXCIV → 1994", async () => {
      const res = await request(app)
        .post("/romanos/a-arabigo")
        .send({ roman: "MCMXCIV" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ arabic: 1994 });
    });

    test("MMXXIII → 2023", async () => {
      const res = await request(app)
        .post("/romanos/a-arabigo")
        .send({ roman: "MMXXIII" });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ arabic: 2023 });
    });

    test("Debe fallar si el romano está vacío", async () => {
      const res = await request(app)
        .post("/romanos/a-arabigo")
        .send({ roman: "" });

      expect(res.status).toBe(400);
    });

    test("Debe fallar con romano inválido", async () => {
      const res = await request(app)
        .post("/romanos/a-arabigo")
        .send({ roman: "ASDF" });

      expect(res.status).toBe(400);
    });
  });

  // -------------------------------
  // ARÁBIGO → ROMANO
  // -------------------------------
  describe("POST /romanos/a-romano", () => {
    test("7 → VII", async () => {
      const res = await request(app)
        .post("/romanos/a-romano")
        .send({ arabic: 7 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ roman: "VII" });
    });

    test("944 → CMXLIV", async () => {
      const res = await request(app)
        .post("/romanos/a-romano")
        .send({ arabic: 944 });

      expect(res.status).toBe(200);
      expect(res.body).toEqual({ roman: "CMXLIV" });
    });

    test("Debe fallar si el arábigo está vacío", async () => {
      const res = await request(app)
        .post("/romanos/a-romano")
        .send({ arabic: "" });

      expect(res.status).toBe(400);
    });

    test("Debe fallar si el número está fuera de rango", async () => {
      const res = await request(app)
        .post("/romanos/a-romano")
        .send({ arabic: 5000 });

      expect(res.status).toBe(422);
    });

    test("Debe fallar si no es un número válido", async () => {
      const res = await request(app)
        .post("/romanos/a-romano")
        .send({ arabic: "12abc" });

      expect(res.status).toBe(400);
    });
  });
});
