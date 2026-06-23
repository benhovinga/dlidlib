import { resolve } from "path";
import { defineConfig } from "vite";
import dts from "unplugin-dts/vite";

// https://vite.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, "src/index.ts"),
      name: "dlidlib",
      fileName: "index",
    },
  },
  plugins: [
    dts({
      tsconfigPath: "./tsconfig.lib.json",
    }),
  ],
});
