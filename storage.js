// Storage Controller
const StorageCtrl = (function() {
		// Public methods
		return {
				storeItem: function(item) {
						let items;

						// Check if there any items
						if(localStorage.getItem('items') === null) {
								items = [];
								// push new item
								items.push(item);
								// set ls
								localStorage.setItem('items', JSON.stringify(items));
						} else {
								// get what is already in ls
								items = JSON.parse(localStorage.getItem('items'));

								// push new item
								items.push(item);

								// reset ls
								localStorage.setItem('items', JSON.stringify(items));
						}
				},

				getItemsFromStorage: function() {
						let items;
						if(localStorage.getItem('items') === null) {
								items = [];
						} else {
								items = JSON.parse(localStorage.getItem('items'))
						}
						return items;
				},

				updateItemStorage: function(updatedItem) {
						let items = JSON.parse(localStorage.getItem('items'));

						items.forEach((item, index) => {
								if(updatedItem.id === item.id) {
										items.splice(index, 1, updatedItem)
								}
						});
						localStorage.setItem('items', JSON.stringify(items));
				},

				deleteItemFromStorage: function(id) {
						let items = JSON.parse(localStorage.getItem('items'));

						items.forEach((item, index) => {
								if(id === item.id) {
										items.splice(index, 1)
								}
						});
						localStorage.setItem('items', JSON.stringify(items));
				},

				clearItemsFromStorage: function() {
						localStorage.removeItem('items');
				}
		}
})();