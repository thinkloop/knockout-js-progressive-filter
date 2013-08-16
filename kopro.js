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
	ko.extenders.koPro = function(target, args) {
		var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame,
			currentCount = 0,
			args = args || {};

		target.koPro = {};
		target.koPro.unfilteredCollection = [];
		target.koPro.unfilteredCollectionIndex = 0;
		target.koPro.isFiltering = false;
		target.koPro.filterFunction = args.filterFunction;
		target.koPro.batchSize = args.batchSize || 1;

		target.koPro.add = target.add || function(item) { target().push(item) };
        target.koPro.clear = target.clear || function() { target([]) };

		target.isFiltered = function(item) {
			return !target.koPro.filterFunction || target.koPro.filterFunction(item);
		};

		target.filter = function(unfilteredCollection) {
			var filteredCollection = [];
			for (var i = 0; i < unfilteredCollection.length; i++) {
				if (target.isFiltered(unfilteredCollection[i])) {
					filteredCollection.push(unfilteredCollection[i]);
				}
			}
			target.koPro.clear();
			target(filteredCollection);
		};

		target.filterProgressive = function(unfilteredCollection) {
			target.koPro.unfilteredCollection = unfilteredCollection;
			target.koPro.unfilteredCollectionIndex = 0;
			target.koPro.clear();
			if (!target.koPro.isFiltering) {
				target.koPro.isFiltering = true;
				requestAnimationFrame(doFilter);
			}
		};

		function doFilter() {
			var item;

			for (target.koPro.unfilteredCollectionIndex; target.koPro.unfilteredCollectionIndex < target.koPro.unfilteredCollection.length; target.koPro.unfilteredCollectionIndex++) {
				item = target.koPro.unfilteredCollection[target.koPro.unfilteredCollectionIndex];
				if (item && target.isFiltered(item)) {
					target.koPro.add(item);
					break;
				}
			}

			target.koPro.unfilteredCollectionIndex++;
			if (target.koPro.unfilteredCollectionIndex < target.koPro.unfilteredCollection.length) {
				if (currentCount > target.koPro.batchSize) {
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
				target.koPro.unfilteredCollectionIndex = 0;
				target.koPro.isFiltering = false;
			}
		}
	}
}))