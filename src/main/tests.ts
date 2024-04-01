import { readFileSync } from "fs";
import { apiData } from "./types";

const data = JSON.parse(readFileSync("./src/db/api.json", "utf-8"));

const apis: apiData[] = [];

for (const key in data["api"]) {
  apis.push({
    path: key,
    method: data["api"][key]["method"],
    sql: data["api"][key]["sql"],
    keys: data["api"][key]["keys"],
  });
}

console.log(apis);

export { apis };
