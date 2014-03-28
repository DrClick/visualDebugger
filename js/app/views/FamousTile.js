define(function(require, exports, module) {
	"use strict";
	var Engine			= require("famous/core/Engine");
	var View 			= require("famous/core/View");
	var Surface 		= require("famous/core/Surface");
	var Modifier 		= require("famous/core/Modifier");
	var Transform		= require("famous/core/Transform");
	var Timer			= require("famous/utilities/Timer");
	var Transitionable 	= require("famous/transitions/Transitionable");

	function FamousTile () {
    	View.apply(this, arguments);

	    _create.call(this);
	}

	FamousTile.prototype = Object.create( View.prototype );
	FamousTile.prototype.constructor = FamousTile;
	FamousTile.DEFAULT_OPTIONS = {
		visible:true,
		atRestOpacity: .8,
		atRestScale: .75,
		baseZ: -8000,
		maxZVisible: 1000
	};



	function _create(){

		var colors = ["rgba(137,232,144,1)", "#975db5", "#89bbff", "#ea5d45", "#e7dd00"];
		
		_setPosition.call(this);
		this.zPos 		= new Transitionable(this.options.baseZ);
		this.opacity 	= new Transitionable(.001);


		this.surface = new Surface({
			classes: ["dot", "icon-famous-logo"],
			size: [400,400],
			properties: {
				color: colors[Math.round(Math.random()*4)],
			}
		});

		this._add(this.surface);

		//fly out
		this.transition = {curve: "easeIn", duration: 1000};

		
	}//end ceate

	function _setPosition(){
		var maxX = 2 * window.innerWidth;
		var maxY = 2 * window.innerHeight;
		this.finalX = (Math.random() * maxX - maxX/2) * 3;
		this.finalY = (Math.random() * maxY - maxY/2) * 3;
	}


	FamousTile.prototype.flyIn = function(){
		this.opacity.set(this.options.atRestOpacity, this.transition);
		this.zPos.set(1001, {duration: 2500});
	}


	
	FamousTile.prototype.render = function(){
		var spec = [];
		if(this.zPos.get() >= this.options.maxZVisible){
			
			_setPosition.call(this);
			this.opacity.set(.001);
			this.zPos.set(this.options.baseZ);
			this.flyIn();
			
		}

		//check and see if anything has changed since last we rendered this
		if(this.options.visible){
			spec.push({
					transform : 
						Transform.translate(this.finalX, this.finalY, this.zPos.get()),
					target : this.surface.render(),
					opacity: this.opacity.get(),
					origin: [.5,.5]
			});
			//cache this spec
			this.spec = spec;
		}

		return spec;
	}

	module.exports = FamousTile;
});