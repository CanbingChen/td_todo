import { defineConfig } from "umi";
import ROTES from "./src/config/rotes";

export default defineConfig({
  routes: ROTES,
  npmClient: "yarn",
});
