# bamazon


1. A node customer CLI app that creates a database and populates the database with 10 products.
   a. The products have columns of a primary key id, name, department, price, and quantity.
   <img width="1391" alt="display" src="https://user-images.githubusercontent.com/38018516/47407294-6cdebb00-d728-11e8-828e-47715955ea85.png">
   b. The customer app displays all of the items for sale and then prompts the customer with 2 questions.
   c. the first prompt asks the customer the ID of the product that they want to purchase.
   d. The second prompt asks how many units of the product that they want to purchase.
   e. Once the order is placed the app checks to see if there are enough of the product to meet the customer's request.
   f. If there is enough the order goes thru and shows the customer the total cost of the purchase.

2. A node managers CLI app that provides a list of menu options that performs different actions.
   a. If the manager selects View Products for Sale, the app will list every available item: the item IDs, names, prices, and quantities.
   b. If the manager selects View Low Inventory, then it will list all items with an inventory count lower than five.
   c. If the manager selects Add to Inventory, the app will display a prompt that will let the manager "add more" of any item currently in the store.
   d. If the manager selects Add New Product, the app will allow the manager to add a completely new product to the store.
