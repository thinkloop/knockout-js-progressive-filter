Knockout JS (KO) Progressive Filter
=====

This is a KnockoutJS extender that progressively filters and displays items of an observable array. It was developed to filter and render various long lists of complex display items on [OppositeofOpposite.com](http://www.oppositeofopposite.com/), such as the main items list, the friends list and the categories list.

It works by processing small, minimally-blocking chunks of data at a time, rendering them in the UI as soon as they are processed, then moving on to the next chunk. This keeps the UI as current as possible allowing the user to proceed, while the rest of the data continues to process in the "background".

###Example Fiddle: http://jsfiddle.net/thinkloop/Mkg72/###
The example fiddle progressively loads 10,000 random "folders" on startup - notice that scrolling and the UI remain smooth. If you type some characters into the input box below the title, you will see the results filter down gradually and without blocking.

###Basic Usage###
Progressively load all items in a collection, one-by-one.
```html
var viewModel = {
  // main collection
  self.items = ko.observableArray([1,2,3,4,5,6,7,8,9]);
  
  // filtered items collection
  self.filteredItems = ko.observableArray();
  self.filteredItems.extend({progressivefilter: {}});
  
  // progressively load all items into filteredItems
  self.filteredItems.filterProgressive(self.items());
}
```

###Common Usage###
Progressively load items that match provided filter function, in batches (rather than one at a time). 
```html
var viewModel = {
  self.items = ko.observableArray([1,2,3,4,5,6,7,8,9]);
  
  self.filteredItems = ko.observableArray();
  self.filteredItems.extend({progressivefilter: { 
    // batch size
    batchSize: 3,
    
    // filter function
    filterFunction: function isItemFiltered(item) {
      return item > 5;
    } 
  }});
  
  self.filteredItems.filterProgressive(self.items.peek());
}
```

###Advanced Usage###
Use custom function for how an item gets added to collection. Use custom function for how collection is cleared.
```html
var viewModel = {
  self.items = ko.observableArray([1,2,3,4,5,6,7,8,9]);
  
  self.filteredItems = ko.observableArray();
  self.filteredItems.extend({progressivefilter: {
    batchSize: 3,
    filterFunction: isItemFiltered,
    
    // custom add function
    addFunction: addFunction,
    
    // custom clear function
    clearFunction: clearFunction }
  });
  
  self.filteredItems.filterProgressive(self.items.peek());
}
function isItemFiltered(item) {
  return item > 5;
}
function addFunction(item) {
  self.filteredItems.push(item);
}
function clearFunction() {
  self.filteredItems.removeAll();
}
```
