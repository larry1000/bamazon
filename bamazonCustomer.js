var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",

  // Your port; if not 3306
  port: 8889,

  // Your username
  user: "root",

  // Your password
  password: "root",
  database: "bamazon"
});
connection.connect(function(err) {
  if (err) throw err;
  console.log("connected as id " + connection.threadId + "\n");
  displayProducts();
});

function displayProducts() {
  connection.query(
    "SELECT item_id, product_name, price, stock_quanity FROM products",
    function(err, res) {
      if (err) throw err;
      console.table(res);
      //   connection.end();
      promptCustomer(res);
    }
  );
}

function promptCustomer(data) {
  inquirer
    .prompt([
      {
        type: "input",
        name: "id",
        message: "What is the ID of the item you want to buy?"
      },
      {
        type: "input",
        name: "quanity",
        message: "How many items do you want to buy?"
      }
    ])
    .then(function(val) {
      for (let i = 0; i < data.length; i++) {
        if (parseInt(data[i].item_id) === parseInt(val.id)) {
          if (parseInt(val.quanity) <= parseInt(data[i].stock_quanity)) {
            var total = parseInt(val.quanity) * parseFloat(data[i].price);
            console.log("Purchased Accepted");
            console.log("Price $", total);
            // connect.query(UPDATE)
            connection.query(
              "UPDATE products SET ? WHERE ?",
              [
                {
                  stock_quanity:
                    parseInt(data[i].stock_quanity) - parseInt(val.quanity)
                },
                {
                  item_id: parseInt(val.id)
                }
              ],

              function(err, res) {
                if (err) throw err;
                console.table(total);
              }
            );
          } else {
            console.log("Insufficient Quantity!");
          }
        }
      }
    });
}
