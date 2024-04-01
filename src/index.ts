import { Database, OPEN_READWRITE } from "sqlite3";
import express from "express";
import bodyParser from "body-parser";
import { error } from "console";
import { tableQuery } from "./main/table";

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


const data = [
  {
    "TYPE": "GET",
    "SUCCESS": 200,
    "TABLE": "users",
    "path": "/users/:id",
    "q":"id",
    "SQL": "SELECT * from users where id = ?",
    
  }
];

app.get('/users/:id', async (req,res) => {
  const sql = "SELECT * FROM users WHERE id = ?"
  const { id } = req.params;
  
  tableQuery(database, "users", "id, username, password", "WHERE id = ?", [id], (data) => {
    if (data.length < 1) return res.status(400).json({error: "There is no user with such id."});
    
    res.status(200).json(data);
  });
  
});

app.listen(port);