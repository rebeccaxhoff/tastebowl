// this package behaves just like the mysql one, but uses async await instead of
// callbacks.
const mysql = require(`mysql-await`); // npm install mysql-await
// first -- I want a connection pool: https://www.npmjs.com/package/mysql#pooling-connections

// this is used a bit differently, but I think it's just better -- especially if
// server is doing heavy work.
var connPool = mysql.createPool({
connectionLimit: 5, // it's a shared resource, let's not go nuts.
host: "127.0.0.1",// this will work
user: "C4131F23U91",
database: "C4131F23U91",
password: "8331", // we really shouldn't be saving this here long-term
// -- and I probably shouldn't be sharing it with you...
});
// later you can use connPool.awaitQuery(query, data) -- it will return a promise for the query results. async function addContact(data){
// you CAN change the parameters for this function. please do not change the parameters for any other function in this file.}
async function createUser(data){
    return await connPool.awaitQuery(`INSERT INTO contact (contact_name, email, appt_date, appt_reason, signup)
    VALUES ("${data.name}", "${data.email}", "${data.date}", "${data.apptReason}", ${data.signup});`)
}

async function deleteContact(id){
    return await connPool.awaitQuery(`DELETE FROM contact WHERE id=${id};`)
}
async function getContacts() {
    return await connPool.awaitQuery("SELECT * from contact")
}
async function addSale(message) {
    return await connPool.awaitQuery(`INSERT INTO sale (sale_text)
    VALUES ("${message}");`)
}
async function endSale() {
    return await connPool.awaitQuery(`UPDATE sale
    SET time_end = CURRENT_TIMESTAMP
    WHERE time_end IS NULL;`)
}

// used method 2 in https://www.geeksforgeeks.org/sql-select-last/ to help get the most recent sale
async function getRecentSales() {
    return await connPool.awaitQuery("SELECT * FROM sale ORDER BY time_start DESC LIMIT 3;")
}

module.exports = {addContact, getContacts, deleteContact, addSale, endSale,
getRecentSales}
