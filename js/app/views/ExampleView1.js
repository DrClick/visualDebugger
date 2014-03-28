define(function(require, exports, module) {
	"use strict";
	var View 		= require("famous/core/View");
	var Surface 	= require("famous/core/Surface");
	var Modifier 	= require("famous/core/Modifier");
	var Transform	= require("famous/core/Transform");
	var Timer		= require("famous/utilities/Timer");

	var FamousTile 	= require("app/views/FamousTile");

	function ExampleView1 () {
    	View.apply(this, arguments);
	    _create.call(this);
	}
	ExampleView1.prototype = Object.create( View.prototype );
	ExampleView1.prototype.constructor = ExampleView1;
	ExampleView1.DEFAULT_OPTIONS = {
		visible:true
	};

	function _create(){
		

		var colors = ["rgba(137,232,144,1)", "#975db5", "#89bbff", "#ea5d45", "#e7dd00"];

		for (var i = 150 - 1; i >= 0; i--) {
			Timer.setTimeout(function(){
				var tile = new FamousTile();
			
				this._add(tile);
				tile.flyIn();
			}.bind(this), i * 100);
		}



	}//end ceate



	module.exports = ExampleView1;
});



