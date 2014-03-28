
define(function(require, exports, module) {
	"use strict";
	var Engine			= require("famous/core/Engine");
	var View 			= require("famous/core/View");
	var Surface 		= require("famous/core/Surface");
	var Modifier 		= require("famous/core/Modifier");
	var Transform		= require("famous/core/Transform");
	var Timer			= require("famous/utilities/Timer");
	var Transitionable 	= require("famous/transitions/Transitionable");

	var Magic8BallView 	= require("app/views/Magic8BallView");

	function ExampleView3 () {
    	View.apply(this, arguments);
	    _create.call(this);
	}
	ExampleView3.prototype = Object.create( View.prototype );
	ExampleView3.prototype.constructor = ExampleView3;
	ExampleView3.DEFAULT_OPTIONS = {
		visible:true
	};

	function _create(){


		var rotateX = new Transitionable(0);
		var rotateY = new Transitionable(0);
		var rotateZ = new Transitionable(0);


		var magic8BallView = new Magic8BallView();




		//create the modifierse mod"
		var originMod = new Modifier({
			origin:[.5,.5, -1],
			size: [0.0001, 0.0001],
			name: "origin mod"
		});

		var modX = new Modifier({
			origin:[.5,.5],
			transform: Transform.rotate(0,Math.PI/4,0),
			name: "rotate X mod"
		});
		var modY = new Modifier({
			origin:[.5,.5],
			name: "rotate y mod"
		});
		var modZ = new Modifier({
			origin:[.5,.5],
			name: "rotate z mod"
		});

		


		this._add(originMod).add(modX).add(modY).add(modZ).add(magic8BallView);


		var shake = false;
		var numTicks = 0
		window.addEventListener('shake', function(){
			shake = true;
			numTicks = 0;
		});

		//rotate it
		Engine.on("prerender", function(){

			if(!shake) return;

			numTicks++;

			if(numTicks < 800){

				rotateX.set(rotateX.get() + .1 * 5/numTicks/.2);
				rotateY.set(rotateY.get() + .1 * 5/numTicks/.2);
				rotateZ.set(rotateZ.get() + .1 * 5/numTicks/.2);

				modX.setTransform(Transform.rotateX(rotateX.get()));
				modY.setTransform(Transform.rotateY(rotateY.get()));
				modZ.setTransform(Transform.rotateZ(rotateZ.get()));
			}
			else{
				modX.setTransform(Transform.rotateX(0), {duration:2000});
				modY.setTransform(Transform.rotateY(2*Math.PI), {duration:2000});
				modZ.setTransform(Transform.rotateZ(0), {duration:2000});
				originMod.setTransform(Transform.translate(0,0,20), {duration:1000});

			}


		});


		

		_createMurkyEffect.call(this);

		var surface = new Surface({
				size: [500, 500],
				properties: {
					backgroundImage: "url(/assets/8Ball.png)",
				}
			});

		this._add(new Modifier(
			{
				origin: [.5,.5],
				transform: Transform.translate(0,0,200)

			}
		)).add(surface);

	}//end ceate


	function _createMurkyEffect(){
		for (var i = 0; i < 20; i++) {
			var surface = new Surface({
				size: [undefined, undefined],
				properties: {
					backgroundColor: "rgba(0,0,0," + (.005 * Math.pow(i,1.3)) + ")"
				}
			});

			this._add(new Modifier(
				{
					transform: Transform.translate(0,0,100 - i)

				}
			)).add(surface);
		};

	}







	module.exports = ExampleView3;
});