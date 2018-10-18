var mysql = require("mysql");
require("console.table");
var inquirer = require("inquirer");

var input = process.argv[2];

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
  //   displayProducts();
});

function displayProducts() {
  connection.query(
    "SELECT item_id, product_name, price, stock_quanity FROM products",
    function(err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}
function viewInventory() {
  connection.query(
    "SELECT item_id, product_name, stock_quanity FROM products WHERE stock_quanity < 5",
    function(err, res) {
      if (err) throw err;
      console.table(res);
    }
  );
}

function promptManager() {
  inquirer
    .prompt([
      {
        type: "rawlist",
        name: "yesOrNo",
        message: "Do you want to add inventory?",
        choices: ["Yes", "No"]
      }
    ])
    .then(function(val) {
      if (val.yesOrNo === "Yes") {
        console.log("Order Something");
        addInventory();
      } else {
        console.log("Insufficient Quantity!");
      }
    });
}
function addInventory() {
  // query the database for all items being auctioned
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    // once you have the items, prompt the manager for which product they want to add
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
          },
          message: "What item would you like to add?"
        },
        {
          name: "item",
          type: "input",
          message: "How many would you like to add?"
        }
      ])

      .then(function(answer) {
        // get the information of the chosen item
        var chosenItem;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }

        var inventoryUpdated = chosenItem.stock_quanity + parseInt(answer.item);
        // if (chosenItem.stock_quanity < parseInt(answer.item))
        if (isNaN(answer.item) === false) {
          connection.query(
            "UPDATE products SET ? WHERE ?",
            [
              {
                stock_quanity: inventoryUpdated
              },
              {
                item_id: chosenItem.item_id
              }
            ],
            function(error) {
              if (error) throw err;
              console.log("Inventory updated!");
              displayProducts();
            }
          );
        } else {
          console.log("No inventory added");
        }
      });
  });
}

// Logic
switch (input) {
  case "view-products-for-sale":
    displayProducts(process.argv[3]);

    break;
  case "view-low-inventory":
    viewInventory(process.argv[3]);

    break;
  case "add-to-inventory":
    promptManager(process.argv[3]);

    break;
  //   case "do-what-it-says":
  //     doWhatItSays(process.argv[3]);

  //     break;
  default:
    console.log("No input was found");
    break;
}
