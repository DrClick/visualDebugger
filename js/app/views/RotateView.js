define(function(require, exports, module) {
	"use strict";
	var View 			= require("famous/core/View");
	var Surface 		= require("famous/core/Surface");
	var Modifier 		= require("famous/core/Modifier");
	var Transform		= require("famous/core/Transform");
	var Timer			= require("famous/utilities/Timer");
	var Transitionable 	= require("famous/transitions/Transitionable");

	//views
	var SubView 	= require("app/views/SubView");

	function RotateView () {
    	View.apply(this, arguments);
	    _create.call(this);
	}
	RotateView.prototype = Object.create( View.prototype );
	RotateView.prototype.constructor = RotateView;
	RotateView.DEFAULT_OPTIONS = {
		visible:true
	};

	function _create(){
		
		var rotateX = new Transitionable(0);
		var rotateY = new Transitionable(0);
		var rotateZ = new Transitionable(0);


		var subView = new SubView();




		//create the modifierse mod"
		var originMod = new Modifier({
			origin:[.5,.5],
			size: [0.00001, 1],
			name: "origin mod"
		});

		var modX = new Modifier({
			name: "rotate X mod"
		});
		var modY = new Modifier({
			name: "rotate y mod"
		});
		var modZ = new Modifier({
			name: "rotate z mod"
		});


			
		this._add(originMod).add(modX).add(modY).add(modZ).add(subView);


		Timer.setInterval(function(){
			rotateX.set(rotateX.get() + .001);
			rotateY.set(rotateY.get() + .01);
			rotateZ.set(rotateZ.get() + .05);

			modX.setTransform(Transform.rotateX(rotateX.get()));
			modY.setTransform(Transform.rotateY(rotateY.get()));
			modZ.setTransform(Transform.rotateZ(rotateZ.get()));
		}, 8);

		

	}//end ceate



	module.exports = RotateView;
});