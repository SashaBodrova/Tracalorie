// App Controller
const App = (function(ItemCtrl, StorageCtrl, UICtrl) {
		// Load Event Listeners
		const loadEventListeners = function() {
				// it is not the same variable as UISelectors in UICtrl, cos' second one was privet
				// so, we can use this name again ok
				const UISelectors = UICtrl.getSelectors();

				// Add item event
				document.querySelector(UISelectors.addBtn).addEventListener('click', itemAddSubmit);

				// Disable submit on enter
				document.addEventListener('keypress', function(e) {
						if(e.keyCode === 13 || e.which === 13) {
								e.preventDefault();
								return false;
						}
				})

				// Edit icon click event
				document.querySelector(UISelectors.itemList).addEventListener('click', itemEditClick);

				// Update item event
				document.querySelector(UISelectors.updateBtn).addEventListener('click', itemUpdateSubmit);

				// Delete btn event
				document.querySelector(UISelectors.deleteBtn).addEventListener('click', itemDeleteSubmit);

				// Back btn event
				document.querySelector(UISelectors.backBtn).addEventListener('click', UICtrl.clearEditState);

				// Clear btn event
				document.querySelector(UISelectors.clearAllBtn).addEventListener('click', clearAllItemsClick);
		}

		// Add item submit
		const itemAddSubmit = function(e) {
				// Get form input from UI Controller
				const input = UICtrl.getItemInput();

				// Check for name and calorie input
				if(input.name !== '' && input.calories !== '') {
						// Add item
						const newItem = ItemCtrl.addItem(input.name, input.calories);

						// Add item to UI List
						UICtrl.addListItem(newItem);

						// Get total calories
						const totalCalories = ItemCtrl.getTotalCalories();
						// Add totalCalories to UI
						UICtrl.showTotalCalories(totalCalories);

						// Store in LocalStorage
						StorageCtrl.storeItem(newItem);

						// Clear inputs
						UICtrl.clearInputs();
				}

				e.preventDefault();
		}

		// Click edit item
		const itemEditClick = function(e) {
				if(e.target.classList.contains('edit-item')) {
						// Get list item id
						const listId = e.target.parentNode.parentNode.id;

						// Break into an array
						const listIdArr = listId.split('-');

						// Get the actual id
						const id = parseInt(listIdArr[1]);

						// Get item
						const itemToEdit = ItemCtrl.getItemById(id);

						// Set current item
						ItemCtrl.setCurrentItem(itemToEdit);

						// Add item to form
						UICtrl.addItemToForm();
				}

				e.preventDefault();
		}

		// Update item Submit
		const itemUpdateSubmit = function(e) {
				// Get item input
				const input = UICtrl.getItemInput();

				// Update item
				const updatedItem = ItemCtrl.updateItem(input.name, input.calories);

				// Update UI
				UICtrl.updateListItem(updatedItem);

				// Get total calories
				const totalCalories = ItemCtrl.getTotalCalories();
				// Add totalCalories to UI
				UICtrl.showTotalCalories(totalCalories);

				// Update LS
				StorageCtrl.updateItemStorage(updatedItem);

				UICtrl.clearEditState();

				e.preventDefault();
		}

		// Delete button event
		const itemDeleteSubmit = function(e) {
				// Get current item
				const currentItem = ItemCtrl.getCurrentItem();

				// Delete from data structure
				ItemCtrl.deleteItem(currentItem.id);

				// Delete from UI
				UICtrl.deleteListItem(currentItem.id);

				// Get total calories
				const totalCalories = ItemCtrl.getTotalCalories();
				// Add totalCalories to UI
				UICtrl.showTotalCalories(totalCalories);

				// Delete from LS
				StorageCtrl.deleteItemFromStorage(currentItem.id);

				UICtrl.clearEditState();

				e.preventDefault();
		};

		// Clear items event
		const clearAllItemsClick = function() {
				// Delete all items from data structure
				ItemCtrl.clearAllItems()

				// Get total calories
				const totalCalories = ItemCtrl.getTotalCalories();
				// Add totalCalories to UI
				UICtrl.showTotalCalories(totalCalories);

				// Delete all items from UI
				UICtrl.removeAllItems();

				// Remove all from storage
				StorageCtrl.clearItemsFromStorage();

				// Hide UL
				UICtrl.hideList();
		};

		// Public methods
		return {
				init: function() {
						// Set initial State / Clear Edit State
						UICtrl.clearEditState();

						// Fetch items from data structure
						const items = ItemCtrl.getItems();

						// Check if any items
						if(items.length === 0) {
								UICtrl.hideList();
						} else {
								// Populate list with items
								UICtrl.populateItemList(items);
						};

						// Get total calories
						const totalCalories = ItemCtrl.getTotalCalories();
						// Add total calories to UI
						UICtrl.showTotalCalories(totalCalories);

						// Load event Listeners
						loadEventListeners();
				}
		}
})(ItemCtrl, StorageCtrl, UICtrl);


// Initialize App
App.init();