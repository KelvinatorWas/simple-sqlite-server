import { Database } from "sqlite3";
import { hasError, joinData } from "../utils/helperFunctions";

const tableCreate = (db: Database, tableName: string, sqlData: string) => {
  const sql = `CREATE TABLE IF NOT EXISTS ${tableName} (${sqlData})`;
  db.run(sql);
};

const tableDrop = (db: Database, tableName: string) => {
  const sql = `DROP TABLE IF EXISTS ${tableName}`;
  db.run(sql);
};

const tableInsert = (
  db: Database,
  sql: string,
  dataValues: (string | number)[]
) => {
  let message = "SUCCESS";
  db.run(sql, dataValues, (err) => {
    hasError(err);
    if (err?.message) message = "FAILED";
  });
  return message;
};

const tableQuery = (
  db: Database,
  sql: string,
  params: string[],
  setter?: (data: unknown[]) => void
) => {
  db.all(sql, params, (err, rows) => {
    hasError(err);
    if (setter) setter(rows);
  });
};

const tableUpdate = (
  db: Database,
  sql: string,
  dataValues: (string | number)[]
) => {
  let message = "SUCCESS";
  db.run(sql, dataValues, (err) => {
    hasError(err);
    if (err?.message) message = "FAILED";
  });
  return message;
};

const tableDelete = (
  db: Database,
  sql: string,
  dataValues: (string | number)[]
) => {
  let message = "SUCCESS";
  db.run(sql, dataValues, (err) => {
    hasError(err);
    if (err?.message) message = "FAILED";
  });
  return message;
};

const tableRunSql = (
  db: Database,
  sql: string,
  dataValues: (string | number)[],
  error?: (error: Error | null) => void
) => {
  db.run(sql, dataValues, (err) => {
    hasError(err);
    if (error) error(err);
  });
};

export {
  tableCreate,
  tableDelete,
  tableDrop,
  tableInsert,
  tableQuery,
  tableUpdate,
  tableRunSql
};
