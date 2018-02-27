var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
  host: "localhost",
  port: 3306,

  user: "root",

  password: "stonecold",
  database: "bamazon_db"
});

function mainMenu() {
inquirer
.prompt({
  name: "action",
  type: "list",
  message: "Welcome to Bamazon Manager Services! What would you like to do?",
  choices: [
    "View products for sale",
    "View low inventory",
    "Add to inventory",
    "Add new product",
    "Exit"
  ]
})
.then(function(answer) {
  switch (answer.action) {
    case "View products for sale":
      viewProducts();
      break;

    case "View low inventory":
      viewLowInventory();
      break;

    case "Add to inventory":
      addToInventory();
      break;

    case "Add new product":
      addNewProduct();
      break;

    case "Exit":
      console.log("Have a nice day!");
      process.exit(0);
  }
});
};

 function viewProducts() {
  console.log("These are the products you have for sale, press ENTER to return to main menu")
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    var itemsForSale = [];
    for (var i = 0; i < results.length; i++) {
    itemsForSale.push(results[i].product_name);
    };
    console.log(itemsForSale);
    goBack();
    });
  };

function viewLowInventory() {
  console.log("Viewing low inventory (where stock less than 5)");
  connection.query("SELECT * FROM products WHERE stock_quantity BETWEEN 1 AND 5", function(err, results) {
  if (err) throw err;
  var lowInventory = [];
    for (var i = 0; i < results.length; i++) {
      lowInventory.push(results[i].product_name);
    };
    console.log(lowInventory);
    goBack();
  })
};

function addToInventory() {
  console.log("Add to current stock inventory");
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    inquirer
      .prompt([
        {
          name: "choice",
          type: "list",
          choices: function() {
            var itemsForSale = [];
            for (var i = 0; i < results.length; i++) {
              itemsForSale.push(results[i].product_name);
            }
            return itemsForSale;
          },
          message: "Choose a product to add inventory too: "
        },
        {
          name: "quantity",
          type: "input",
          message: "How much quantity would you like to add?"
        }
      ])
      .then(function(answer) {
        var chosenItem;
        var itemString = answer.choice;
        for (var i = 0; i < results.length; i++) {
          if (results[i].product_name === answer.choice) {
            chosenItem = results[i];
          }
        }
        var chosenItemQuantity = chosenItem.stock_quantity;
        console.log("Current product quantity for " + itemString + ": " + chosenItemQuantity);
        var chosenQuantity = answer.quantity;
        var newItemQuantity = (parseInt(chosenItemQuantity) + parseInt(chosenQuantity));

        updateInventory(newItemQuantity, itemString);
      });
    });
};

function addNewProduct() {
  console.log("Add a product for sale")
  inquirer
  .prompt([{
    name: "item",
    type: "input",
    message: "Please enter product name: "
  },
  {
    name: "department",
    type: "input",
    message: "Please enter a department for the product: "
  },
  {
    name: "price",
    type: "input",
    message: "Please enter a price for the product: "
  },
  {
    name: "quantity",
    type: "input",
    message: "Please enter a quantity for the product: "
  }
    ])
  .then(function(answer) {
    connection.query(
      "INSERT INTO products SET ?",
      {
        product_name: answer.item,
        department_name: answer.department,
        price: answer.price,
        stock_quantity: answer.quantity
      },
      function(err) {
        if (err) throw err;
        console.log("Your product was successfully added!");
        goBack();
      }
    );
  })
};

function updateInventory(newQuantity, item) {
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
      console.log("Stock quantity has been updated, new quantity for " + item + " is now " + newQuantity);
      goBack();
    });
};

function goBack() {
  inquirer
  .prompt ([{
    name: "action",
    type: "list",
    message: "Press ENTER to retun to main menu",
    choices: [
      " "
    ]
  }])
  .then(function(answer) {
    switch (answer.action) {
      case " ":
      mainMenu();
      break;
    }
  })
}

mainMenu();
