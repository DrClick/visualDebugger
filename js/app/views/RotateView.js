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




		//create the modifiers
		var sizeMod = new Modifier({
			size:[400, 400],
			name: "size mod"
		});
		var originMod = new Modifier({
			origin:[.5,.5],
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


			
		this._add(originMod).add(sizeMod).add(modZ).add(subView);


		Timer.setInterval(function(){
			rotateX.set(rotateX.get() + .1);
			rotateY.set(rotateY.get() + .1);
			rotateZ.set(rotateZ.get() + .1);

			//modX.setTransform(Transform.rotate(0, rotateX.get(), 0), {duration: 100});
			modZ.setTransform(Transform.rotateZ(rotateZ.get()), {duration: 100});
			//modZ.setTransform(Transform.rotateZ(rotateZ.get()));
			//modZ.setTransform(Transform.rotate(rotateZ.get(), 0, 0), {duration: 100});
		}, 100);

		

	}//end ceate



	module.exports = RotateView;
});