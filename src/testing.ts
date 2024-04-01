import SQL from "sql-template-strings";
import { Database, OPEN_READWRITE } from "sqlite3";
import { hasError } from "./utils/helperFunctions";
import { tableQuery, tableDelete, tableInsert } from "./main/table";

const database = new Database('./src/db/database.db', OPEN_READWRITE, (error) => {
  hasError(error);
});

//tableDrop(database, "users");
// tableCreate(database, "users", "id INTEGER PRIMARY KEY, email, username, password");
tableInsert(database, "users", ["email", "username", "password"], ["lobama@gmail.com", "Bromama", "password"]);
tableQuery(database, "users", "*");

// tableUpdate(database, "users", "username = ? WHERE id = ?", ["xXNotObamaXx", 2]);
// tableQuery(database, "users", "id, username, password");




