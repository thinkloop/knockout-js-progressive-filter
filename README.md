Knockout JS (KO) Progressive Filter
=====

This is a KnockoutJS extender that progressively filters and displays items of an observable array. It was developed to filter and render various long lists of complex display items on [OppositeofOpposite.com](http://www.oppositeofopposite.com/), such as the main items list, the friends list and the categories list.

It works by processing small, minimally-blocking chunks of data at a time, rendering them in the UI as soon as they are processed, then moving on to the next chunk. This allows fresh data to be in front of the user as soon as possible, even while the rest of the set continues to process in the "background".

###Example Fiddle: http://jsfiddle.net/thinkloop/Mkg72/###
Take a look at this example fiddle of [filter-as-you-type](http://jsfiddle.net/thinkloop/Mkg72/). It progressively loads 10,000 random "folders" on startup (notice that scrolling and the UI remain smooth). If you type some characters into the input box below the title, you will see the results filter down gradually and without blocking.

###Basic Usage###
```html
var viewModel = {
  self.filteredItems = ko.observableArray();
  self.filteredItems.extend({progressivefilter: {}});
}
```

###Common Usage###
```html
var viewModel = {
  self.filteredItems = ko.observableArray();
  self.filteredItems.extend({progressivefilter: { batchSize: 3, filterFunction: isItemFiltered }});
}
function isItemFiltered(item) {
  return item > 3;
}
```

###Advanced Usage###
```html
var viewModel = {
  self.filteredItems = ko.observableArray();
  self.filteredItems.extend({progressivefilter: {
    batchSize: 3,
    filterFunction: isItemFiltered,
    addFunction: addFunction,
    clearFunction: clearFunction }
  });
}
function isItemFiltered(item) {
  return item > 3;
}
function addFunction(item) {
  self.filteredItems.push(item);
}
function clearFunction() {
  self.filteredItems.removeAll();
}
```
