const request = require("supertest");
const fs = require("fs");
const path = require("path");
const app = require("../server");

const testsFile = path.join(__dirname, "tests.json");
const testData = JSON.parse(fs.readFileSync(testsFile, "utf8"));

describe("Runner dinámico Romanos ↔ Arábigos (JSON)", () => {
  testData.tests.forEach((t) => {
    test(t.description, async () => {
      const res = await request(app)
        [t.method.toLowerCase()](t.endpoint)
        .send(t.payload || {}); // <-- enviar body JSON

      expect(res.statusCode).toBe(t.expectedStatus);

      if (t.expectedBody) {
        expect(res.body).toEqual(t.expectedBody);
      }
    });
  });
});

