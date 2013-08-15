define([], function() {
	ko.extenders.progressiveFilter = function(target, filterFunction) {
		target.progressiveFilter = {};
		target.progressiveFilter.unfilteredCollection = [];
		target.progressiveFilter.unfilteredCollectionIndex = 0;
		target.progressiveFilter.isFiltering = false;
		target.filterFunction = filterFunction;

		target.isFiltered = function(item) {
			return target.filterFunction(item);
		};

		target.filter = function(unfilteredCollection) {
			var filteredCollection = [];
			for (var i = 0; i < unfilteredCollection.length; i++) {
				if (target.filterFunction(unfilteredCollection[i])) {
					filteredCollection.push(unfilteredCollection[i]);
				}
			}
			target.clear();
			target(filteredCollection);
		};

		target.filterProgressive = function(unfilteredCollection) {
			target.progressiveFilter.unfilteredCollection = unfilteredCollection;
			target.progressiveFilter.unfilteredCollectionIndex = 0;
			target.clear();
			if (!target.progressiveFilter.isFiltering) {
				target.progressiveFilter.isFiltering = true;
				doFilter();
			}
		};

		function doFilter(currentCount) {
			var item,
				currentCount = currentCount || 1;

			for (target.progressiveFilter.unfilteredCollectionIndex; target.progressiveFilter.unfilteredCollectionIndex < target.progressiveFilter.unfilteredCollection.length; target.progressiveFilter.unfilteredCollectionIndex++) {
				item = target.progressiveFilter.unfilteredCollection[target.progressiveFilter.unfilteredCollectionIndex];
				if (item && target.filterFunction(item)) {
					target.add(item);
					break;
				}
			}

			target.progressiveFilter.unfilteredCollectionIndex++;
			if (target.progressiveFilter.unfilteredCollectionIndex < target.progressiveFilter.unfilteredCollection.length) {
				if (currentCount >= 2) {
					setTimeout(function() { doFilter(1) }, 0);
				}
				else {
					doFilter(currentCount + 1);
				}
				return;
			}
			else {
				target.progressiveFilter.unfilteredCollectionIndex = 0;
				target.progressiveFilter.isFiltering = false;
			}
		}
	}
});

function addProgressive(allItems, filteredItems, currentCount) {
	var currentCount = currentCount || 0;
	if (allItems.length < currentCount) {
		filteredItems.push(allItems[currentCount]);
		setTimeout(function(allItems, filteredItems, currentCount) { addProgressive(allItems, filteredItems, currentCount) }, 0, allItems, filteredItems, currentCount++);
	}

	for (target.progressiveFilter.unfilteredCollectionIndex; target.progressiveFilter.unfilteredCollectionIndex < target.progressiveFilter.unfilteredCollection.length; target.progressiveFilter.unfilteredCollectionIndex++) {
		item = target.progressiveFilter.unfilteredCollection[target.progressiveFilter.unfilteredCollectionIndex];
		if (item && target.filterFunction(item)) {
			target.add(item);
			break;
		}
	}

	target.progressiveFilter.unfilteredCollectionIndex++;
	if (target.progressiveFilter.unfilteredCollectionIndex < target.progressiveFilter.unfilteredCollection.length) {
		if (currentCount >= 2) {
			setTimeout(function() { doFilter(1) }, 0);
		}
		else {
			doFilter(currentCount + 1);
		}
		return;
	}
	else {
		target.progressiveFilter.unfilteredCollectionIndex = 0;
		target.progressiveFilter.isFiltering = false;
	}
}