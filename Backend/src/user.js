let mysql = require("mysql");
let Promise = require("bluebird");
Promise.promisifyAll(require("mysql/lib/Connection").prototype);

let dbinfo = {
  host: "localhost",
  user: "root",
  password: "cdac",
  database: "jsdata",
};

async function connectionCheck() {
  let connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  console.log("Connection Success");
  await connection.endAsync();
}
connectionCheck();

async function adduser(user) {
  let connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();
  let sql = `insert into user values (?,?,?,?,?)`;
  await connection.queryAsync(sql, [
    user.id,
    user.name,
    user.email,
    user.mobile,
    user.password,
  ]);

  console.log("Recorded Success");
  await connection.endAsync();
}

// let user = {
//   id: 1,
//   name: "Rakesh Bhondave",
//   email: "rakeshbhondave1997@gmail.com",
//   mobile: 9075,
//   password: "12345",
// };

// adduser(user);

async function showData() {
  let connection = mysql.createConnection(dbinfo);
  await connection.connectAsync();

  let sql = `SELECT * FROM USER`;
  let list = await connection.queryAsync(sql, []);

  console.log(list);
  await connection.endAsync();
  return list;
}

// showData();

module.exports = { showData, adduser };
