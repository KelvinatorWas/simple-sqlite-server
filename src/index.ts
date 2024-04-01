import { Database, OPEN_READWRITE } from "sqlite3";
import express from "express";
import bodyParser from "body-parser";
import {
  tableDelete,
  tableInsert,
  tableQuery,
  tableUpdate,
} from "./main/table";
import { apis } from "./main/tests";

const app = express();
const port = 3004;

app.use(bodyParser.json());

const hasError = (error: Error | null) =>
  error ? console.log("ERROR: ", error.message) : null;

const database = new Database(
  "./src/db/database.db",
  OPEN_READWRITE,
  (error) => {
    hasError(error);
  }
);

app.post("/post", (req, res) => {
  try {
    console.log(req.body);
    res.json({
      status: 200,
      success: true,
    });
  } catch (error) {
    return res.json({
      status: 400,
      success: false,
    });
  }
});

const get = (path: string, sql: string, paramKeys: string[]) => {
  app.get(path, async (req, res) => {
    const params: string[] = [];

    for (let key of paramKeys) {
      params.push(req.params[key]);
    }

    tableQuery(database, sql, params, (data) => {
      if (data.length < 1)
        return res
          .status(400)
          .json({ error: "There is no user with such id." });

      res.status(200).json(data);
    });
  });
};

const post = (
  path: string,
  sql: string,
  paramKeys: string[],
  body: string[]
) => {
  app.post(path, async (req, res) => {
    const params: string[] = [];
    const dataOfBody = req.body;

    for (let key of body) {
      params.push(dataOfBody[key]);
    }

    for (let key of paramKeys) {
      params.push(req.params[key]);
    }

    let message = tableInsert(database, sql, params);
    if (message === "SUCCESS") res.status(200).json(message);
    else res.status(500).json(message);
  });
};

const remove = (path: string, sql: string, paramKeys: string[]) => {
  app.delete(path, async (req, res) => {
    const params: string[] = [];

    for (let key of paramKeys) {
      params.push(req.params[key]);
    }

    const message = tableDelete(database, sql, params);
    if (message === "SUCCESS") res.status(200).json(message);
    else res.status(500).json(message);
  });
};

const put = (
  path: string,
  sql: string,
  paramKeys: string[],
  body: string[]
) => {
  app.put(path, async (req, res) => {
    const params: string[] = [];
    const dataOfBody = req.body;

    for (let key of body) {
      params.push(dataOfBody[key]);
    }

    for (let key of paramKeys) {
      params.push(req.params[key]);
    }

    console.log(params);

    const message = tableUpdate(database, sql, params);
    if (message === "SUCCESS") res.status(200).json(message);
    else res.status(500).json(message);
  });
};

for (let i = 0; i < apis.length; i++) {
  const { path, sql, keys, method, body } = apis[i];

  switch (method) {
    case "GET": {
      get(path, sql, keys);
      break;
    }
    case "POST": {
      // console.log("keys: ", keys, " | Method: ", method);
      post(path, sql, keys, body);
      break;
    }
    case "DELETE": {
      // console.log("keys: ", keys, " | Method: ", method);
      remove(path, sql, keys);
      break;
    }

    case "PUT": {
      // console.log("keys: ", keys, " | Method: ", method);
      put(path, sql, keys, body);
      break;
    }

    default:
      break;
  }
}

app.listen(port);
