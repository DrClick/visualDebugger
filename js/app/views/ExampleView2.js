define(function(require, exports, module) {
	"use strict";
	var View 		= require("famous/core/View");
	var Surface 	= require("famous/core/Surface");
	var Modifier 	= require("famous/core/Modifier");
	var Transform	= require("famous/core/Transform");
	var Timer		= require("famous/utilities/Timer");

	var SubView 	= require("app/views/SubView");

	function ExampleView2 () {
    	View.apply(this, arguments);
	    _create.call(this);
	    _handleEvents.call(this);
	}
	ExampleView2.prototype = Object.create( View.prototype );
	ExampleView2.prototype.constructor = ExampleView2;
	ExampleView2.DEFAULT_OPTIONS = {
		visible:true
	};

	function _create(){
		var header_surface = new Surface({
			size: [100,80],
			content: "<h1>Event Piping</h1>"
		});

		var surfProps = {
			backgroundColor: "pink", 
			borderRadius: "100px", 
			paddingTop: "70px", 
			textAlign: "center"
		};

		this.surface_1 = new Surface({
			size: [200,200],
			properties: surfProps,
			content: "<p>Click Me</p>"
		});

		this.surface_2 = new Surface({
			size: [200,200],
			properties: surfProps,
			content: "<p>Click Me</p>"
		});


		//add them to the render node
		this._add(new Modifier({origin:[.5,0]})).add(header_surface);
		this._add(new Modifier({origin:[.5,.5], transform: Transform.translate(-200,0,0)}))
			.add(this.surface_1);
		this._add(this.surface_2);//added without a modifier

		//pipe events
		this.surface_1.pipe(this._eventOutput);
		//surface_2.pipe(this._eventOutput);

		this.surface_1.on("click", function(){console.log("clicked on surface 1")});
		this.surface_2.on("click", function surface2ClickHandler(){console.log("clicked on surface 2")});
	}

	function _handleEvents(){
		this.on("click", function(event){
			this.surface_2.emit("click", event)
		});
	}

	

	module.exports = ExampleView2;
});