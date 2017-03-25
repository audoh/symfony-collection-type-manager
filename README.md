# CollectionType Manager
JQuery plugin to handle addition to and removal from Symfony CollectionTypes with minimal effort.

## Installation and usage

The easiest way to get started with the CollectionType Manager is to simply include the script in the page containing your form. It will automatically insert 'add' and 'delete' buttons into any form fragment containing either a `data-prototype` or the attribute `data-allow-remove="true"`.

## Overriding the default buttons

Use `data-adder-prototype` and `data-deleter-prototype` to override the default buttons. You can set these to an empty string if you would like to manually create the buttons yourself (e.g. to place them elsewhere). When doing so, call the manager methods in your custom buttons' click listeners:  
  `$(collectionElement).collectionManager('addCollectionItem')`
  `$(collectionElement).collectionManager('deleteCollectionItem', itemToDelete)`.

If you would like to disable addition and/or deletion entirely, don't set the prototypes to the empty string. Instead set `data-allow-add` and `data-allow-delete` to false.

By default, the user is always allowed to delete items that they have just created, even when `data-allow-delete` is false. This behaviour is also disableable using `data-allow-delete-new`.

## Handling CollectionTypes within CollectionTypes

To handle CollectionTypes within CollectionTypes, you must first make the CollectionTypes' prototype names different. Symfony uses the `prototype_name` option as a placeholder in the prototype, which automatically gets replaced with a number identifying that element in the collection.

By default, the prototype name is `__name__` - set one of the CollectionTypes' prototype names to something other than this. Ensure your new name won't be confused with any other parts of the prototype string by surrounding it with double underscores or another similarly unambiguous character.

To configure the script, set `data-prototype-name` to match the corresponding `prototype_name`.

## Custom form themes or layouts

By default, the script selects children by looking for `div` elements within the collection. If you have `div` elements which are not children, or your children are not `div` elements, you can set `data-item-selector` to change this behaviour. 

Make sure that your chosen CSS selector can also select your prototype: if you are creating your child elements manually, then you may have to also create your prototype manually in the same way.

## AJAX, custom deletion confirmation messages, overriding add/delete, etc.

To allow you to react to item creation and deletion, CollectionTypeManager provides you with four events, one before and one after each action. These are:

- **collection.preInsert**
- **collection.postInsert** 
- **collection.preDelete** 
- **collection.postDelete**

In both preInsert and preDelete, you can call `event.preventDefault()` to stop the action from happening. This means you can, for example, change the delete prompt, or have a live-updated AJAX list which accurately reflects failed insertion attempts.

With the exception of preInsert, the event object also includes the newly created item or item being deleted, which you can access via `event.item`.

## Notes

### Item insertion

The plugin currently has three simple strategies it uses to insert new items:
 - **Insert after last item:** only when collection has items
 - **Insert before `.collection_adder`:** when collection is empty but has an add button
 - **Append to collection:** when collection is empty and has no add button

### Special 'reserved' classes

This plugin uses the two class names `collection_adder` and `collection_deleter` to identify existing add and delete buttons, which you should avoid using within the parent element for anything except add and delete buttons.

## Roadmap to v1.0.0

### Improving the insertion strategy

The current insertion strategy works for many cases, but is ultimately automatic. It will be confused if your collection is empty, doesn't contain an add button and you've got a div that you want to always be at the end of the collection element. In this instance, it will append new items to the collection element, after that div.

The attribute `data-insert-after` perhaps makes little sense, as by default new items are added at the end. Perhaps another strategy will be added, which will be tried before any others: insert items before the first element matched by the selector `data-insert-before`.
