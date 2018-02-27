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

    case "View low inventory ":
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
  console.log("These are the products you have for sale")
  connection.query("SELECT * FROM products", function(err, results) {
    if (err) throw err;
    var itemsForSale = [];
    for (var i = 0; i < results.length; i++) {
    itemsForSale.push(results[i].product_name);
    };
    console.log(itemsForSale);
  });

};

function viewLowInventory() {
  console.log("viewing low inventory")
};

function addToInventory() {
  console.log("adding to inventory")
};

function addNewProduct() {
  console.log("adding new product")
};

function goBack() {
  inquirer
  .prompt ([{
    name: "action",
    type: "list",
    message: "Press Back to retun to main menu",
    choices: [
      "Back"
    ]
  }])
  .then(function(answer) {
    switch (answer.action) {
      case "Back":
      mainMenu();
      break;
    }
  })
}

mainMenu();
