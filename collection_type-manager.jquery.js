/* CollectionType-Manager by A. Udoh | MIT */
/* General-purpose solution for adding to and removing from Symfony CollectionTypes */
(function($)
{ 
	$.fn.collectionManager = function(fn, args)
	{
		return fnMap[fn].apply(this, args);
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

		// Find the CSS selector used to identify child item elements, defaults to div.

		'childSelector': function()
		{
			return $(this).data('itemSelector') !== undefined ? $(this).data('itemSelector') : 'div';
		},

		// Find the name of the prototype to use, defaults to __name__.

		'prototypeName': function()
		{
			return $(this).data('prototypeName') !== undefined ? $(this).data('prototypeName') : '__name__';
		},

		// Add a new item to an element based on its data-prototype (from Symfony).

		'addCollectionItem': function(parent)
		{
			// Get prototype data.

			var prototype = $(parent).data('prototype');
			var prototypeName = $(parent).collectionManager('prototypeName');
			var childSelector = $(parent).collectionManager('childSelector');

			// Build prototype with new id.

			var id = $(parent).children(childSelector).length;

	        // Replace __name__ with id.

	        var matchName = new RegExp(prototypeName, 'g');
	        var prototype = prototype.replace(matchName, id);

			// Build new element from the prototype.

			var item = $(prototype).insertBefore($(this));

			// Give the new element a delete button if allowed and update on it.

			if($(parent).collectionManager('isDeleteAllowed'))
				$(item).collectionManager('provideDeleteButton');

			$(item).collectionManager('updateCollection');

			// Trigger add event.

			$(parent).trigger('collection_add');
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

			button.addClass('collection_add');

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

			button.addClass('collection_delete');

			return button;
		},

		// Creates an add button on `element` if one does not already exist.

		'provideAddButton': function()
		{
			var needed = $(this).find('> .collection_add').length == 0;

			if(needed)
			{
				// Create add button.

				var parent = this;

				addButton = $(this).collectionManager('newAddButton')
					.appendTo(this)
					.click(function()
					{
						$(this).collectionManager('addCollectionItem', parent);
					})
				;
			}
		},

		// Creates a delete button on `element` if one does not already exist.

		'provideDeleteButton': function()
		{
			var needed = $(this).find('> .collection_delete').length == 0;

			if(needed)
			{
				var deletable = this;

				deleteButton = $(this).collectionManager('newDeleteButton')
					.appendTo(this)
					.click(function()
					{
						$(deletable).remove();
						$(deletable).parent().trigger('collection_delete');
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
					var children = $(this).find('> ' + childSelector);

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