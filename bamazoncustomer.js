var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "stonecold",
  database: "bamazon_db"
});

function purchase() {
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "rawlist",
          choices: function() {
            var itemsForSale = [];
            for (var i = 0; i < results.length; i++) {
              itemsForSale.push(results[i].product_name);
            }
            return itemsForSale;
          },
          message: "What product would you like to purchase?"
        },
        {
          name: "quantity",
          type: "input",
          message: "How many would you like to purchase?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        var chosenItemQuantity
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        var chosenItemQuantity = chosenItem.stock_quantity;
        var chosenQuantity = (answer.quantity);
        var newItemQuantity = (chosenItemQuantity - chosenQuantity);

        if (chosenQuantity > chosenItemQuantity) {
          console.log("Sorry, there aren't enough left in stock!");
          purchase();
        }
        else if (chosenQuantity <= chosenItemQuantity) {

        var total_price = chosenItem.price * chosenQuantity;
        console.log("Thank you for your purchase, Your grand total is $" + total_price)
        updateQuantity(newItemQuantity, chosenItem);
      }

      });
  });
}

function updateQuantity(newQuantity, item) {
  connection.query("UPDATE products SET ? WHERE ?",
  [
    {
      stock_quantity: newQuantity
    },
    {
      item_id: item.item_id
    }
  ],
  function(err, results) {
    if (err) throw err;
    console.log("Stock quantity has been updated");
    inquirer
      .prompt({
        name: "action",
        type: "list",
        message: "Would you like to make another purchase?",
        choices: [
          "Yes",
          "No"
        ]
      })
      .then(function(answer) {
        switch (answer.action) {
          case "Yes":
            purchase();
            break;

          case "No":
            console.log("Good bye, have a great day!")
            process.exit(0);
            break;
        }
      });
  }
)
};


purchase();
