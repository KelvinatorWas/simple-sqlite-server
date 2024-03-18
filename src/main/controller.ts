import SQL from "sql-template-strings";
import { Database, open } from "sqlite";
import sqlite3 from 'sqlite3';

class DatbaseController {
  db?:Database;
  
  constructor() {
    this.initDb();
  }

  async initDb() {
    this.db = await open(
      {
        filename: 'src/db/database.db',
        driver:sqlite3.Database,
      }
    )
  }

  async createUser(user:any) { // change later
    if (!this.db) return; 
    
    const { emale, username, password } = user;
    
    const sqlData = SQL`INSERT INTO users (userEmale, userUsername, userPassword) VALUES (${emale}, ${username}, ${password})`;
    const result = await this.db.run(sqlData);

    if (!result.lastID) throw Error('Failed to create user');
  }
}

export default DatbaseController;
