define(function(require, exports, module) {
	"use strict";
	var View 		= require("famous/core/View");
	var Surface 	= require("famous/core/Surface");
	var Modifier 	= require("famous/core/Modifier");
	var Transform	= require("famous/core/Transform");
	var Timer		= require("famous/utilities/Timer");

	function SubView () {
    	View.apply(this, arguments);
	    _create.call(this);
	}
	SubView.prototype = Object.create( View.prototype );
	SubView.prototype.constructor = SubView;
	SubView.DEFAULT_OPTIONS = {
		visible:true
	};

	function _create(){
		var colors = ["rgba(137,232,144,1)", "#975db5", "#89bbff", "#ea5d45", "#e7dd00"];

		
		var surface = new Surface({
			classes: ['dot'],
			size: [400,400],
			properties: {
				backgroundColor: colors[Math.round(Math.random()*4)]
			}
		});

		var modifier = new Modifier({
			transform: Transform.translate(0,0,0)
		});



		
		this._add(surface);
		

	}//end ceate

	// SubView.prototype.render = function(){
	// 	var spec = [];

	// 	return spec;
	// }



	module.exports = SubView;
});