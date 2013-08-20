(function (factory) {
	// Module systems magic dance.

	if (typeof require === "function" && typeof exports === "object" && typeof module === "object") {
		// CommonJS or Node: hard-coded dependency on "knockout"
		factory(require("knockout"), exports);
	} else if (typeof define === "function" && define["amd"]) {
		// AMD anonymous module with hard-coded dependency on "knockout"
		define(["knockout", "exports"], factory);
	} else {
		// <script> tag: use the global `ko` object
		factory(ko, {});
	}
}(function (ko, exports) {
	ko.extenders.progressivefilter = function(target, args) {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
			currentCount = 0,
			args = args || {},
			props = {};

		target.progressivefilter = props;

		props.unfilteredCollection = [];
		props.unfilteredCollectionIndex = 0;
		props.isFiltering = false;
		props.filterFunction = args.filterFunction;
		props.batchSize = args.batchSize || 1;

		props.add = args.addFunction || function(item) { target().push(item) };
        props.clear = args.clearFunction || function() { target([]) };

		target.isFiltered = function(item) {
			return !props.filterFunction || props.filterFunction(item);
		};

		target.filter = function(unfilteredCollection) {
			var filteredCollection = [];
			for (var i = 0; i < unfilteredCollection.length; i++) {
				if (target.isFiltered(unfilteredCollection[i])) {
					filteredCollection.push(unfilteredCollection[i]);
				}
			}
			props.clear();
			target(filteredCollection);
		};

		target.filterProgressive = function(unfilteredCollection) {
			props.unfilteredCollection = unfilteredCollection;
			props.unfilteredCollectionIndex = 0;
			props.clear();
			if (!props.isFiltering) {
				props.isFiltering = true;
				requestAnimationFrame(doFilter);
			}
		};

		function doFilter() {
			var item;

			for (props.unfilteredCollectionIndex; props.unfilteredCollectionIndex < props.unfilteredCollection.length; props.unfilteredCollectionIndex++) {
				item = props.unfilteredCollection[props.unfilteredCollectionIndex];
				if (item && target.isFiltered(item)) {
					props.add(item);
					break;
				}
			}

			props.unfilteredCollectionIndex++;
			if (props.unfilteredCollectionIndex < props.unfilteredCollection.length) {
				if (currentCount > props.batchSize) {
					target.valueHasMutated();
					currentCount = 0;
					requestAnimationFrame(doFilter);
				}
				else {
					currentCount++;
					doFilter();
				}
				return;
			}
			else {
                target.valueHasMutated();
				props.unfilteredCollectionIndex = 0;
				props.isFiltering = false;
			}
		}
	}
}))