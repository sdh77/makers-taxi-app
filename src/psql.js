const { Client } = require("pg");
const client = new Client({
  user: "sanggeukz",
  host: "127.0.0.1",
  database: "tanyang",
  password: "taxi",
  port: 5432,
});
client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});
