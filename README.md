# CollectionType Manager
JQuery plugin to handle addition to and removal from Symfony CollectionTypes with minimal effort.

## Installation and usage

The easiest way to get started with the CollectionType Manager is to simply include the script in the page containing your form. It will automatically insert 'add' and 'delete' buttons into any form fragment containing either a `data-prototype` or the attribute `data-allow-remove="true"`.

## Features

- Create custom add and delete buttons by setting `data-adder-prototype` and `data-deleter-prototype`.  
  ***NOTE:** The default is simply a button saying 'add' or 'delete'.*
- Change how items are identified using the `data-item-selector` tag.  
  ***NOTE:** The default is 'div', which works for the default form template.*
- Listen to `collection_add` and `collection_delete` events to react to user actions in other scripts.
- Fine-tune whether to allow addition or deletion using the boolean attributes `data-allow-add` and `data-allow-delete`.
- Change the prototype name using `data-prototype-name` to allow for subprototypes.

## Future plans

### data-allow-delete-new

How could someone be able to add new items and be able to undo those additions before submission, whilst not being able to delete old committed items? For this I propose the boolean attribute `data-allow-delete-new`, which, when true - which it will be by default - will cause the plugin to add delete buttons to newly created items, even when `data-allow-delete` is false.

### Greater flexibility

At present, the plugin currently assumes that the `data-prototype` attribute is on the immediate parent of a set of child elements matching the child selector, each of which represents an item in the CollectionType. This means that if you deviate from this, the plugin may behave in unexpected ways.

## Notes

This plugin uses the two class names `collection_adder` and `collection_deleter` to identify existing add and delete buttons, which you should avoid using within the parent element. This applies even when you use custom button prototypes.

However, if you would like to manually add add/delete buttons with these classes, you can use `$(this).collectionManager('addButtonClick')` and `$(this).collectionManager('deleteButtonClick')` within their click listeners in order to still make use of the plugin.
