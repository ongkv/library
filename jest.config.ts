/** @jest-config-loader */

import { defineConfig } from "jest";
import { createDefaultPreset } from "ts-jest";

const tsJestTransformCfg = createDefaultPreset().transform;

export default defineConfig({
  verbose: true,
  rootDir: "./src",
  testEnvironment: "node",
  transform: {
    ...tsJestTransformCfg,
  },
  modulePaths: ["<rootDir>"],
});
