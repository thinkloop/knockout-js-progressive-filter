KO Pro(gressive) Simple Pseudo-Threading For Knockout JS
=====

KOPro is a KnockoutJS observable array extender that progressively filters and displays items of an array. It was developed to filter and render various long lists of complex display items on [OppositeOfOpposite.com](http://www.oppositeofopposite.com/), such as the friends list, the items list and the categories list.

It works by processing small, minimally-blocking chunks of data at a time, rendering them in the UI as soon as they are processed, then moving on to the next chunk. This allows fresh data to be in front of the user as soon as possible, even while the rest of the set continues processing in the "background".

Take a look at this example fiddle of [progressive filter-as-you-type](http://jsfiddle.net/thinkloop/Mkg72/). It progressively loads 10,000 random "folders" on startup (notice that scrolling and the ui remain smooth). You will see an input box beneath the title, type some characters into it and notice the results filter gradually without blocking the UI.
