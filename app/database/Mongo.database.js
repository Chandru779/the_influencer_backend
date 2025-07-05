const { MongoClient } = require('mongodb');
const config = require('../config/db.conf.js');

let db;

async function connect() {
    if (db) return db;

    const client = new MongoClient(config.uri, { useNewUrlParser: true, useUnifiedTopology: true });
    await client.connect();
    db = client.db(config.databaseName);
    return db;
}

async function find(collection, query) {
    const database = await connect();
    return database.collection(collection).find(query).toArray();
}

async function insert(collection, document) {
    const database = await connect();
    const result = await database.collection(collection).insertOne(document);
    return result.insertedId;
}

async function update(collection, query, update) {
    const database = await connect();
    const result = await database.collection(collection).updateOne(query, { $set: update });
    return result.modifiedCount;
}

async function remove(collection, query) {
    const database = await connect();
    const result = await database.collection(collection).deleteOne(query);
    return result.deletedCount;
}

module.exports = {
    connect,
    find,
    insert,
    update,
    remove
};