Knockout JS (KO) Progressive Filter
=====

This is a KnockoutJS extender that progressively filters and displays items of a specified observable array. It was developed to filter and render various long lists of complex display items on [OppositeOfOpposite.com](http://www.oppositeofopposite.com/), such as the items list, the friends list and the categories list.

It works by processing small, minimally-blocking chunks of data at a time, rendering them in the UI as soon as they are processed, then moving on to the next chunk. This allows fresh data to be in front of the user as soon as possible, even while the rest of the set continues processing in the "background".

Take a look at this example fiddle of [progressive filter-as-you-type](http://jsfiddle.net/thinkloop/Mkg72/). It progressively loads 10,000 random "folders" on startup (notice that scrolling and the UI remain smooth). There is an input box below the title. Type some characters into it to see results filter gradually and without blocking the UI.
