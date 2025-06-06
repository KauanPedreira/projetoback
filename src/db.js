import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017';
const dbName = 'streamingDB';

let client;
let db;

async function connect() {
  if (db) return db;
  try {
    client = new MongoClient(uri);
    await client.connect();
    db = client.db(dbName);
    return db;
  } catch (error) {
    throw new Error('Erro ao conectar no MongoDB: ' + error.message);
  }
}

async function close() {
  if (client) await client.close();
}

export { connect, close };
