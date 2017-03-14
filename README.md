# CollectionType Manager
JQuery plugin to handle addition to and removal from Symfony CollectionTypes with minimal effort.

## Installation and usage

The easiest way to get started with the CollectionType Manager is to simply include the script in the page containing your form. It will automatically insert 'add' and 'delete' buttons into any form fragment containing either a `data-prototype` or the attribute `data-allow-remove="true"`.

## Features

- Create custom add and delete buttons by setting `data-adder-prototype` and `data-deleter-prototype`.  
  ***NOTE:** The default is simply a button saying 'add' or 'delete'.*
- Change the child tag using `data-child-tag`. The default is 'div'.
  ***NOTE:** The default is 'div', which works for the default form template.*
- Listen to `collection_add` and `collection_delete` events to react to user actions in other scripts.
- Fine-tune whether to allow addition or deletion using the boolean attributes `data-allow-add` and `data-allow-delete`.

## Future plans

### Greater flexibility

At present, the plugin currently assumes that the `data-prototype` attribute is on the immediate parent of a set of child elements, each of which represents an item in the CollectionType. This means that if you deviate from this, or have non-collection item elements within the parent element, the plugin may behave in unexpected ways.

## Notes

This plugin uses the two class names `collection_add` and `collection_delete` to identify existing add and delete buttons, which you should avoid using within the parent element. This applies even when you use custom button prototypes.
