import { readFileSync } from "fs";
import { apiData } from "./types";

const data = JSON.parse(readFileSync("./src/db/api.json", "utf-8"));

const apis: apiData[] = [];

for (const method in data["api"]) {
  for (const key in data["api"][method]) {
    apis.push({
      path: key,
      method: method,
      sql: data["api"][method][key]["sql"],
      keys: data["api"][method][key]["keys"],
      body: data["api"][method][key]["body"] ? data["api"][method][key]["body"] : [],
    });
  }
}

// console.log(apis);

export { apis };
