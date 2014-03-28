define(function(require, exports, module) {
	"use strict";
	var View 		= require("famous/core/View");
	var Surface 	= require("famous/core/Surface");
	var Modifier 	= require("famous/core/Modifier");
	var Transform	= require("famous/core/Transform");
	var Timer		= require("famous/utilities/Timer");

	function Magic8BallView () {
    	View.apply(this, arguments);
	    _create.call(this);
	}
	Magic8BallView.prototype = Object.create( View.prototype );
	Magic8BallView.prototype.constructor = Magic8BallView;
	Magic8BallView.DEFAULT_OPTIONS = {
		visible:true
	};

	var pi = Math.PI;

	function _create(){
			var coordinates = [
			[0, 	0,		87,		0,			0,			0],
			[0, 	0,		-87,	pi,			0,			0],
			[87, 	0,		0,		0,			pi/2,		0],
			[-87, 	0,		0,		0,			-pi/2,		0],

			
			[0, 	87,		0,		-pi/2,		0,			-pi/2],
			[0, 	-87,	0,		pi/2,		0,			-pi/2],
			[0, 	87,		0,		-pi/2,		0,			-pi/2],
			[0, 	-87,	0,		pi/2,		0,			-pi/2]
		];


		var phrases = ["Obviously", "All signs point to yes", "YES!", 
		"Outlook Good", "Unicorns", "Hella good idea"];


		for (var i = 4- 1; i >= 0; i--) {
			var surface = new Surface({
				classes: ['triangle'],
				content: phrases[i],
				size: [174,174]
			});

			var position = coordinates[i].slice(0,3);
			var rotation = coordinates[i].slice(3,6);

			var modifier = new Modifier({
				transform: Transform.multiply(
					Transform.translate(position[0], position[1], position[2]),
					Transform.rotate(rotation[0], rotation[1], rotation[2])),
				origin: [.5,.5],
				name: "Position Modifier"
			});

			this._add(modifier).add(surface);
		}
	}//end ceate

	
	module.exports = Magic8BallView;
});