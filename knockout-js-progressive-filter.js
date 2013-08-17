(function (factory) {
	// Module systems magic dance.

	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		// CommonJS or Node: hard-coded dependency on "knockout"
		factory(require("knockout"), exports);
	} else if (typeof define === "function" && define["amd"]) {
		// AMD anonymous module with hard-coded dependency on "knockout"
		define(["knockout", "exports"], factory);
	} else {
		// <script> tag: use the global `ko` object, attaching a `mapping` property
		factory(ko, ko.mapping = {});
	}
}(function (ko, exports) {
	ko.extenders.koProgressiveFilter = function(target, args) {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
			currentCount = 0,
			args = args || {};

		target.koProgressiveFilter = {};
		target.koProgressiveFilter.unfilteredCollection = [];
		target.koProgressiveFilter.unfilteredCollectionIndex = 0;
		target.koProgressiveFilter.isFiltering = false;
		target.koProgressiveFilter.filterFunction = args.filterFunction;
		target.koProgressiveFilter.batchSize = args.batchSize || 1;

		target.koProgressiveFilter.add = args.addFunction || function(item) { target().push(item) };
        target.koProgressiveFilter.clear = args.clearFunction || function() { target([]) };

		target.isFiltered = function(item) {
			return !target.koProgressiveFilter.filterFunction || target.koProgressiveFilter.filterFunction(item);
		};

		target.filter = function(unfilteredCollection) {
			var filteredCollection = [];
			for (var i = 0; i < unfilteredCollection.length; i++) {
				if (target.isFiltered(unfilteredCollection[i])) {
					filteredCollection.push(unfilteredCollection[i]);
				}
			}
			target.koProgressiveFilter.clear();
			target(filteredCollection);
		};

		target.filterProgressive = function(unfilteredCollection) {
			target.koProgressiveFilter.unfilteredCollection = unfilteredCollection;
			target.koProgressiveFilter.unfilteredCollectionIndex = 0;
			target.koProgressiveFilter.clear();
			if (!target.koProgressiveFilter.isFiltering) {
				target.koProgressiveFilter.isFiltering = true;
				requestAnimationFrame(doFilter);
			}
		};

		function doFilter() {
			var item;

			for (target.koProgressiveFilter.unfilteredCollectionIndex; target.koProgressiveFilter.unfilteredCollectionIndex < target.koProgressiveFilter.unfilteredCollection.length; target.koProgressiveFilter.unfilteredCollectionIndex++) {
				item = target.koProgressiveFilter.unfilteredCollection[target.koProgressiveFilter.unfilteredCollectionIndex];
				if (item && target.isFiltered(item)) {
					target.koProgressiveFilter.add(item);
					break;
				}
			}

			target.koProgressiveFilter.unfilteredCollectionIndex++;
			if (target.koProgressiveFilter.unfilteredCollectionIndex < target.koProgressiveFilter.unfilteredCollection.length) {
				if (currentCount > target.koProgressiveFilter.batchSize) {
					target.valueHasMutated();
					currentCount = 0;
					requestAnimationFrame(doFilter)
				}
				else {
					currentCount++;
					doFilter();
				}
				return;
			}
			else {
                target.valueHasMutated();
				target.koProgressiveFilter.unfilteredCollectionIndex = 0;
				target.koProgressiveFilter.isFiltering = false;
			}
		}
	}
}))