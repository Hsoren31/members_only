#! /usr/bin/env node

const { Client } = require("pg");

const SQL = `
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  first_name VARCHAR (255),
  last_name VARCHAR (255),
  username VARCHAR (255),
  password VARCHAR (255),
  membership_status BOOLEAN,
  admin_status BOOLEAN);

CREATE TABLE IF NOT EXISTS posts (
  id INTEGER PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  message CHAR (255),
  timestamp TIMESTAMP,
  author_id INTEGER REFERENCES users);
`;

async function main() {
  console.log("seeding...");
  const client = new Client({
    connectionString: process.env.CONNECTIONSTRING,
  });
  await client.connect();
  await client.query(SQL);
  await client.end();
  console.log("done");
}

main();
