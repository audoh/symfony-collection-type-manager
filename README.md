# CollectionType Manager
JQuery plugin to handle addition to and removal from Symfony CollectionTypes with minimal effort.

## Installation and usage

The easiest way to get started with the CollectionType Manager is to simply include the script in the page containing your form. It will automatically insert 'add' and 'delete' buttons into any form fragment containing either a `data-prototype` or the attribute `data-allow-remove="true"`.

## Overriding the default buttons

Use `data-adder-prototype` and `data-deleter-prototype` to override the default buttons. You can set these to an empty string if you would like to manually create the buttons yourself (e.g. to place them elsewhere).

If you would like to disable addition and/or deletion entirely, don't set the prototypes to the empty string. Instead set `data-allow-add` and `data-allow-delete` to false.

By default, the user is allowed to delete items that they have created when `data-allow-delete` is false. This behaviour is also disableable using `data-allow-delete-new`.

## Handling CollectionTypes within CollectionTypes

To handle CollectionTypes within CollectionTypes, you must first make the CollectionTypes' prototype names different. Symfony uses the `prototype_name` option as a placeholder in the prototype which automatically gets replaced with a number identifying that element in the collection. By default, the prototype name is `__name__` - set one of the CollectionTypes' prototype names to something other than this. Ensure your new name won't be confused with any other parts of the prototype string by surrounding it with double underscores or another similarly unambiguous character.

For the script, set `data-prototype-name` to match the `prototype_name`.

## Custom form themes or layouts

By default, the script selects children by looking for `div` elements within the collection. If you have `div` elements which are not children, or your children are not `div` elements, you can set `data-item-selector` to change this behaviour. 

Make sure that your chosen CSS selector can also select your prototype: if you are creating your child elements manually, then you may have to also create your prototype manually in the same way.

## Integrating other scripts

If you'd like to integrate other scripts with this manager, e.g. to update another script when an item gets added or send updates to an API automatically via AJAX, you can listen to the collection element's events `collection_add` and `collection_delete`.

## Future plans

### Greater flexibility

At present, the plugin currently assumes that the `data-prototype` attribute is on the immediate parent of a set of child elements matching the child selector, each of which represents an item in the CollectionType. This means that if you deviate from this, the plugin may behave in unexpected ways.

## Notes

This plugin uses the two class names `collection_adder` and `collection_deleter` to identify existing add and delete buttons, which you should avoid using within the parent element. This applies even when you use custom button prototypes.

However, if you would like to manually add add/delete buttons with these classes, you can use `$(this).collectionManager('addButtonClick')` and `$(this).collectionManager('deleteButtonClick')` within their click listeners in order to still make use of the plugin.
