import { Database, OPEN_READWRITE } from "sqlite3";
import express from "express";
import bodyParser from "body-parser";
import { tableQuery } from "./main/table";
import { apis } from "./main/tests";

const app = express();
const port = 3004;

app.use(bodyParser.json());


const hasError = (error:Error | null) => error ? console.log("ERROR: ", error.message) : null;  

const database = new Database('./src/db/database.db', OPEN_READWRITE, (error) => {
  hasError(error);
});

app.post('/post', (req,res) => {
  try {
    console.log(req.body);
    res.json({
      status:200,
      success: true,
    });
  } catch (error) {
    return res.json(
      {
        status:400,
        success: false,
      }
    );
  }
});

const get = (path:string, sql:string, paramKeys:string[]) => {
  app.get(path, async (req,res) => {
      const params:string[] = [];

      for (let key of paramKeys){
        params.push(req.params[key]);
      }

      tableQuery(database, sql, params, (data) => {
        if (data.length < 1) return res.status(400).json({error: "There is no user with such id."});
        
        res.status(200).json(data);
      });
    });
}

for (let i = 0; i < apis.length; i++) {
  const {path, sql, keys, method} = apis[i];

  switch (method) {
    case "GET": get(path, sql, keys); 

    default:
  }

}

app.listen(port);
