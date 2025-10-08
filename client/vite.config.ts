import { defineConfig, type Plugin } from "vite";
import react from "@vitejs/plugin-react";
import openapiTS, { astToString } from "openapi-typescript";
import { writeFileSync } from "node:fs";
import { resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { pathToFileURL } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

function generateApiTypes(): Plugin {
  return {
    name: "generate-api-types",
    async buildStart() {
      const inputPath = resolve(__dirname, "src/types/openapi.json");
      const outputPath = resolve(__dirname, "src/types/api.d.ts");

      try {
        console.log("🔄 Generating TypeScript types from OpenAPI spec...");
        // Convert file path to file:// URL as required by openapi-typescript
        const fileUrl = pathToFileURL(inputPath).href;
        const ast = await openapiTS(fileUrl);
        const output = astToString(ast);
        writeFileSync(outputPath, output);
        console.log("✅ Client-side API types generated successfully!");
      } catch (error) {
        console.error("❌ Error generating CLient-side API types:", error);
        // Don't fail the build if openapi.json doesn't exist yet
        if ((error as NodeJS.ErrnoException).code !== "ENOENT") {
          throw error;
        }
      }
    },
    handleHotUpdate({ file, server }) {
      // Watch for changes to openapi.json
      if (file.includes("openapi.json")) {
        console.log("🔄 OpenAPI spec changed, regenerating types...");
        // Trigger a full reload to regenerate types
        server.restart();
      }
    },
  };
}

export default defineConfig({
  plugins: [
    react({ babel: { plugins: ["babel-plugin-react-compiler"] } }),
    generateApiTypes(),
  ],
  resolve: {
    alias: {
      components: "/src/components",
      pages: "/src/pages",
      types: "/src/types",
      httpClient: "/src/httpClient",
    },
  },
});
