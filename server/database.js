const initSqlJs = require("sql.js");
const path = require("path");
const fs = require("fs");

const DB_PATH = path.join(__dirname, "fitcoach.db");

let dbInstance = null;

async function getDb() {
  if (dbInstance) return dbInstance;

  const SQL = await initSqlJs();

  let sqliteDb;
  if (fs.existsSync(DB_PATH)) {
    const fileBuffer = fs.readFileSync(DB_PATH);
    sqliteDb = new SQL.Database(fileBuffer);
  } else {
    sqliteDb = new SQL.Database();
  }

  function persist() {
    const data = sqliteDb.export();
    fs.writeFileSync(DB_PATH, Buffer.from(data));
  }

  sqliteDb.run(`
    CREATE TABLE IF NOT EXISTS testimonials (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      role        TEXT    NOT NULL,
      rating      INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
      text        TEXT    NOT NULL,
      approved    INTEGER NOT NULL DEFAULT 0,
      featured    INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS reviews (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      email       TEXT    NOT NULL,
      plan        TEXT,
      rating      INTEGER NOT NULL CHECK(rating BETWEEN 1 AND 5),
      comment     TEXT    NOT NULL,
      approved    INTEGER NOT NULL DEFAULT 0,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS leads (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      name        TEXT    NOT NULL,
      email       TEXT    NOT NULL,
      whatsapp    TEXT    NOT NULL,
      goal        TEXT    NOT NULL,
      created_at  TEXT    NOT NULL DEFAULT (datetime('now', 'localtime'))
    );

    CREATE TABLE IF NOT EXISTS trainer (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      tag         TEXT    NOT NULL,
      name        TEXT    NOT NULL,
      photo_url   TEXT    NOT NULL,
      bio         TEXT    NOT NULL,
      quote       TEXT    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS trainer_credentials (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      trainer_id  INTEGER NOT NULL REFERENCES trainer(id),
      icon        TEXT    NOT NULL,
      text        TEXT    NOT NULL
    );

    CREATE TABLE IF NOT EXISTS stats (
      id          INTEGER PRIMARY KEY AUTOINCREMENT,
      value       REAL    NOT NULL,
      label       TEXT    NOT NULL,
      suffix      TEXT    NOT NULL DEFAULT '',
      is_decimal  INTEGER NOT NULL DEFAULT 0,
      sort_order  INTEGER NOT NULL DEFAULT 0
    );

    CREATE TABLE IF NOT EXISTS results (
      id           INTEGER PRIMARY KEY AUTOINCREMENT,
      name         TEXT    NOT NULL,
      duration     TEXT    NOT NULL,
      goal         TEXT    NOT NULL,
      before_image TEXT    NOT NULL,
      after_image  TEXT    NOT NULL,
      sort_order   INTEGER NOT NULL DEFAULT 0
    );
  `);

  persist(); 


  function toObjects(result) {
    if (!result || result.length === 0) return [];
    const { columns, values } = result[0];
    return values.map((row) => {
      const obj = {};
      columns.forEach((col, i) => {
        obj[col] = row[i];
      });
      return obj;
    });
  }

  function runSelect(sql, params = []) {
    const stmt = sqliteDb.prepare(sql);
    if (params.length > 0) stmt.bind(params);
    const rows = [];
    while (stmt.step()) {
      rows.push(stmt.getAsObject());
    }
    stmt.free();
    return rows;
  }

  function prepare(sql) {
    return {
      all(...params) {
        return runSelect(sql, params);
      },
      get(...params) {
        const rows = runSelect(sql, params);
        return rows[0];
      },
      run(...params) {
        const stmt = sqliteDb.prepare(sql);
        if (params.length > 0) stmt.bind(params);
        stmt.step();
        stmt.free();
        const lastId = runSelect("SELECT last_insert_rowid() as id");
        const id = lastId[0]?.id ?? null;
        persist(); 
        return { lastInsertRowid: id };
      },
    };
  }

  function exec(sql) {
    sqliteDb.run(sql);
    persist();
  }

  dbInstance = { prepare, exec };
  return dbInstance;
}

module.exports = { getDb };
