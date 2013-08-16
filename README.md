KOPro
=====

KOPro is a Knockout JS observable array extender that progressively filters and displays items of an array. 
It was developed to filter and render thousands of complex display items on [OppositeOfOpposite.com](http://www.oppositeofopposite.com/).

It works by processing small, minimally-blocking chunks of data at a time, then updating the UI as soon as each chunk is complete.
This way the UI is updated almost immediately with useful information, even though the rest of the list may still be processing in the "background".

Take a look at this example fiddle of [filter-as-you-type](http://jsfiddle.net/thinkloop/Mkg72/). 
