define(function(require, exports, module) {
	"use strict";
	var View 		= require("famous/core/View");
	var Surface 	= require("famous/core/Surface");
	var Modifier 	= require("famous/core/Modifier");
	var Transform	= require("famous/core/Transform");
	var Timer		= require("famous/utilities/Timer");

	var SubView 	= require("app/views/SubView");

	function TestView () {
    	View.apply(this, arguments);
	    _create.call(this);
	}
	TestView.prototype = Object.create( View.prototype );
	TestView.prototype.constructor = TestView;
	TestView.DEFAULT_OPTIONS = {
		visible:true
	};

	function _create(){
		



		for (var i = 10 - 1; i >= 0; i--) {
			var surface = new Surface({
				content: "<img src='../assets/famous_symbol_transparent.png'/>",
				size: [300,200]
			});

			var x = Math.random()* 2 * window.innerWidth - window.innerWidth;
			var y = Math.random()* 2 * window.innerHeight - window.innerHeight;
			var z = Math.random()* 100 - 50;

			var modifier = new Modifier({
				transform: Transform.translate(x,y,z),
				origin: [.5,.5]
			});


			var subView = new SubView();
			
			this._add(modifier).add(surface);
			this._add(subView);
		}

	}//end ceate



	module.exports = TestView;
});