/* CollectionType-Manager by A. Udoh | MIT */
/* General-purpose solution for adding to and removing from Symfony CollectionTypes */
(function($)
{
	$.fn.collectionManager = function(fn, args)
	{
		return (ret = fnMap[fn].apply(this, args)) !== undefined ? ret : $(this);
	};

	var fnMap =
		{
			'isDeleteAllowed': function()
			{
				return $(this).data('allowDelete') === false ? false : true;
			},

			'isAddAllowed': function()
			{
				// Addition is never allowed if there's no prototype.

				if($(this).data('prototype') === undefined)
					return false;

				return $(this).data('allowAdd') === false ? false : true;
			},

			'isDeleteNewAllowed': function()
			{
				return $(this).data('allowDeleteNew') === false ? false : true;
			},

			// Find the CSS selector used to identify child item elements, defaults to div.

			'childSelector': function()
			{
				return '>' + ($(this).data('itemSelector') !== undefined ? $(this).data('itemSelector') : 'div');
			},

			// Find the name of the prototype to use, defaults to __name__.

			'prototypeName': function()
			{
				return $(this).data('prototypeName') !== undefined ? $(this).data('prototypeName') : '__name__';
			},

			'insert': function(el)
			{
				// Try to find last element to insert after.

				var childSelector = $(this).collectionManager('childSelector');
				var lastChild = $(this).find(childSelector).last();

				if(lastChild.length !== 0)
				{
					$(el).insertAfter(lastChild);
					return;
				}

				// Try to find add button to insert before.

				var addButton = $(this).find('.collection_adder').first();

				if(addButton.length !== 0)
				{
					$(el).insertBefore(addButton);
					return;
				}

				// Append to collection when all else fails.

				el.appendTo($(this));
			},

			// Add a new item to an element based on its data-prototype (from Symfony).

			'addCollectionItem': function()
			{
				// Get prototype data.

				var prototype = $(this).data('prototype');
				var prototypeName = $(this).collectionManager('prototypeName');
				var childSelector = $(this).collectionManager('childSelector');

				// Build prototype with new id.

				var id = $(this).find(childSelector).length;

				// Replace labels and then names with the id.

				var matchName = new RegExp(prototypeName, 'g');
				var matchLabel = new RegExp(prototypeName + 'label__', 'g');

				var prototype = prototype.replace(matchLabel, id).replace(matchName, id);

				// Build new element from the prototype.

				var item = $(prototype);

				$(this).collectionManager('insert', item);

				// Give the new element a delete button if allowed and update on it.

				if($(this).collectionManager('isDeleteNewAllowed'))
					$(item).collectionManager('provideDeleteButton');

				$(item).collectionManager('updateCollection');

				// Trigger add event.

				$(this).trigger('collection_add');
			},

			'deleteCollectionItem': function(item)
			{
				$(item).remove();
				$(this).trigger('collection_delete');
			},

			// Return an add button element.

			'newAddButton': function()
			{
				// Check for add button prototype in this element.

				var button, prototype = $(this).data('adderPrototype');

				if(prototype !== undefined)
				{
					button = $(prototype);
				}
				else
				{
					button = $('<button/>')

						.attr('type', 'button')
						.html('add')
					;
				}

				button.addClass('collection_adder');

				return button;
			},

			// Return a delete button element.

			'newDeleteButton': function()
			{
				// Check for delete button prototype in parent.

				var button, prototype = $(this).parent().data('deleterPrototype');

				if(prototype !== undefined)
				{
					button = $(prototype);
				}
				else
				{
					button = $('<button/>')

						.attr('type', 'button')
						.html('delete')
					;
				}

				button.addClass('collection_deleter');

				return button;
			},

			// Creates an add button on `element` if one does not already exist.

			'provideAddButton': function()
			{
				var needed = $(this).find('> .collection_adder').length == 0;

				if(needed)
				{
					// Create add button.

					var parent = this;

					addButton = $(this).collectionManager('newAddButton')
						.appendTo(this)
						.click(function()
						{
							$(parent).collectionManager('addCollectionItem');
						})
					;
				}
			},

			// Creates a delete button on `element` if one does not already exist.

			'provideDeleteButton': function()
			{
				var needed = $(this).find('> .collection_deleter').length == 0;

				if(needed)
				{
					var deletable = this;

					deleteButton = $(this).collectionManager('newDeleteButton')
						.appendTo(this)
						.click(function()
						{
							$(deletable).parent().collectionManager('deleteCollectionItem', deletable);
						})
					;
				}
			},

			// Updates stuff.

			'updateCollection': function()
			{
				// Get all applicable forms/form fragments.

				var elements = $(this).find('[data-prototype], [data-allow-remove="true"]');

				// Iterate over each one, adding 'add' and 'delete' controls.

				elements.each(function()
				{
					// Create 'add' button if needed and allowed.

					if($(this).collectionManager('isAddAllowed'))
						$(this).collectionManager('provideAddButton');

					// Create 'delete' buttons if needed and allowed.

					if($(this).collectionManager('isDeleteAllowed'))
					{
						var childSelector = $(this).collectionManager('childSelector');
						var children = $(this).find(childSelector);

						children.each(function()
						{
							$(this).collectionManager('provideDeleteButton');
						})
					}
				});
			}
		}

	$(document).ready(function()
	{
		$(this).collectionManager('updateCollection');
	});
}(jQuery));