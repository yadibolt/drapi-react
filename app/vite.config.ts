import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import tsconfigPaths from "vite-tsconfig-paths";
import react from "@vitejs/plugin-react";
import fs from "fs";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
    tailwindcss(),
    tsconfigPaths(),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  server: {
    host: "0.0.0.0",
    port: 5173,
    strictPort: true,
    https: {
      key: fs.readFileSync(
        path.resolve(
          __dirname,
          "/home/mpo/wdttgo/certs/dev/drapireact.loc-key.pem",
        ),
      ),
      cert: fs.readFileSync(
        path.resolve(
          __dirname,
          "/home/mpo/wdttgo/certs/dev/drapireact.loc.pem",
        ),
      ),
    },
    hmr: {
      protocol: "wss",
      host: "drapireact.loc",
      port: 5173,
    },
    allowedHosts: ["drapireact.loc", "api.drapireact.loc"],
  },
});
