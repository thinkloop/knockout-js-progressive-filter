KOPro
=====

KOPro is a Knockout JS observable array extender that progressively filters and displays items of your array. 
It was developed to filter and render thousands of complex display items on [OppositeOfOpposite.com](http://www.oppositeofopposite.com/).

It works by processing small, minimally-blocking chunks of data at a time, then updating the UI as soon as each chunk is complete.
This way the user is presented with results almost immediately, even though the rest of the list is still processing in the "background".

