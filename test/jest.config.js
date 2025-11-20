export default {
testEnvironment: "node", // o 'jsdom' para tests de UI
roots: ["<rootDir>/src"],
moduleFileExtensions: ["js","ts"],
transform: {},
collectCoverage: true,
collectCoverageFrom: ["src/**/*.{js,ts}"],
coverageThreshold: {
global: { lines: 80, statements: 80, branches: 70, functions: 80 }
}
};