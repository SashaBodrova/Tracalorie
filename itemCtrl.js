// Item Controller
const ItemCtrl = (function() {
		// Item Constructor
		const Item = function(id, name, calories) {
				this.id = id;
				this.name = name;
				this.calories = calories;
		}

		// Data Structure / State
		const data = {
				// items: [
				// 		// {id: 0, name: 'Steak Dinner', calories: 900},
				// 		// {id: 1, name: 'Ice Cream', calories: 300},
				// 		// {id: 2, name: 'Salad', calories: 200},
				// ],
				items: StorageCtrl.getItemsFromStorage(),
				currentItem: null,
				totalCalories: 0
		}

		// Public methods
		return {
				getItems: function() {
						return data.items;
				},

				addItem: function(name, calories) {
						let ID;

						// Create ID (it is can be confusing ok)
						if(data.items.length > 0) {
								ID = data.items[data.items.length - 1].id + 1;
						} else {
								ID = 0;
						};

						// Calories to number
						calories = parseInt(calories);

						// Create new item
						newItem = new Item(ID, name, calories);

						// Add to items arr
						data.items.push(newItem);

						return newItem;
				},

				getItemById: function(id) {
						let found = null;
						// Loop through items
						data.items.forEach((item) => {
								if(item.id === id) {
										found = item;
								}
						});
						return found;
				},

				// Update item
				updateItem: function(name, calories) {
						// Calories to a number
						calories = parseInt(calories);

						let found = null;

						data.items.forEach((item) => {
								if(item.id === data.currentItem.id) {
										item.name = name;
										item.calories = calories;
										found = item;
								}
						})
						return found;
				},

				deleteItem: function(id) {
						// Get ids
						const ids = data.items.map((item) => {
								return item.id;
						})

						// Get index
						const index = ids.indexOf(id);

						// Remove item
						data.items.splice(index, 1);
				},

				clearAllItems: function() {
						data.items = [];
				},

				// Set current item
				setCurrentItem: function(item) {
						data.currentItem = item;
				},

				// Get Current Item
				getCurrentItem: function() {
						return data.currentItem;
				},

				// Get total calories
				getTotalCalories: function() {
						let total = 0;

						data.items.forEach((item) => {
								total += item.calories;
						});

						data.totalCalories = total;

						return data.totalCalories;
				},

				logData: function() {
						return data;
				}
		}
})();