import { defineConfig } from "tsdown";

export default defineConfig({
  entry: ["src/index.ts"],
  outDir: "dist",
  format: ["esm", "cjs"],
  platform: "neutral",
  dts: { sourcemap: true },
  sourcemap: true,
  clean: true,
  treeshake: false,
  minify: false,
  exports: {
    all: true,
    devExports: true,
  },
  unbundle: true,
});
