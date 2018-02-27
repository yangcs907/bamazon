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
            var choiceArray = [];
            for (var i = 0; i < results.length; i++) {
              choiceArray.push(results[i].product_name);
            }
            return choiceArray;
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
        console.log(chosenItemQuantity);
        var chosenQuantity = (answer.quantity);
        console.log(chosenQuantity);
        var newItemQuantity = (chosenItemQuantity - chosenQuantity);
        console.log(newItemQuantity);

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
    if (err) throw err; }
)
purchase();
};



purchase();
