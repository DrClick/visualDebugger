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

		
		var surface_front = new Surface({
			classes: ['dot'],
			size: [400,400],
			properties: {
				backgroundColor: colors[Math.round(Math.random()*4)],
				webkitBackfaceVisibility: "visible",
				opacity: .9
			}
		});

		var modifier_front = new Modifier({
			origin: [.5,.5]
		});


		var surface_back = new Surface({
			classes: ['dot'],
			size: [400,400],
			properties: {
				backgroundColor: colors[Math.round(Math.random()*4)],
				webkitBackfaceVisibility: "visible",
				opacity: .9
			}
		});

		var modifier_back = new Modifier({
			transform: Transform.rotateX(Math.PI/2),
			origin: [.5,.5]
		});


		var surface_middle = new Surface({
			classes: ['dot'],
			size: [400,400],
			properties: {
				backgroundColor: colors[Math.round(Math.random()*4)],
				webkitBackfaceVisibility: "visible",
				opacity: .9
			}
		});

		var modifier_middle = new Modifier({
			transform: Transform.rotateY(Math.PI/2),
			origin: [.5,.5]
		});


		
		this._add(modifier_front).add(surface_front);
		this._add(modifier_back).add(surface_back);
		this._add(modifier_middle).add(surface_middle);


		//pipe the events
		

	}//end ceate

	// SubView.prototype.render = function(){
	// 	var spec = [];

	// 	return spec;
	// }



	module.exports = SubView;
});