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

		for (var i = 3 - 1; i >= 0; i--) {
			var surface = new Surface({
				size: [80,80],
				classes: ['dot'],
				properties: {
					backgroundColor: colors[Math.round(Math.random()*4)]
				}
			});

			var x = Math.random()* 2 * window.innerWidth - window.innerWidth;
			var y = Math.random()* 2 * window.innerHeight - window.innerHeight;
			var z = Math.random()* 100 - 50;

			var modifier = new Modifier({
				transform: Transform.translate(x,y,z),
				origin: [.5,.5],
				size: [80, 80]
			});


			var m2 = new Modifier({
				transform: Transform.rotate(0,Math.PI * Math.random(),0),
				origin: [.5,.5]
			});
			
			this._add(m2).add(modifier).add(surface);
		}

	}//end ceate

	// SubView.prototype.render = function(){
	// 	var spec = [];

	// 	return spec;
	// }



	module.exports = SubView;
});