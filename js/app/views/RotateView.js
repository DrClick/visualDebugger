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
		var modX = new Modifier({
			transform: Transform.rotate(0,rotateX.get(), 0),
			origin: [.5,.5],
			size:[400,400]
		});
		var modY = new Modifier({
			transform: Transform.rotate(0,0,rotateY.get()),
			origin: [.5,.5],
			size:[400,400]
		});
		var modZ = new Modifier({
			transform: Transform.rotate(rotateZ.get(),0, 0),
			origin: [.5,.5],
			size:[400,400]
		});


			
		this._add(modX).add(modY).add(modZ).add(subView);


		Timer.setInterval(function(){
			rotateX.set(rotateX.get() + .1);
			rotateY.set(rotateY.get() + .1);
			rotateZ.set(rotateZ.get() + .1);

			modX.setTransform(Transform.rotate(0, rotateX.get(), 0), {duration: 100});
			modY.setTransform(Transform.rotate(0, 0, rotateY.get()), {duration: 100});
			modZ.setTransform(Transform.rotate(rotateZ.get(), 0, 0), {duration: 100});
		}, 100);

		

	}//end ceate



	module.exports = RotateView;
});