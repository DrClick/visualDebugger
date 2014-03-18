define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Surface = require('famous/core/Surface');
        var Modifier = require("famous/core/Modifier");
        var Transform = require("famous/core/Transform");
        var Clock = require("famous/core/Clock");

        var TestView = require("app/views/TestView");
        var RenderTreeVisualizer = require("app/RenderTreeVisualizer");


        var mainContext = Engine.createContext({debug:true});


        var isPaused = false;

        //slow things down
        Clock.setClockSpeed(.5);


        mainContext.on("debug.renderTree", function(renderTree){
                //Here we can monitor the render tree
                //debugger
                //var renderTreeVisualizer = new RenderTreeVisualizer(renderTree);
                //console.log(renderTreeVisualizer.getTree());
                //console.log(renderTree);
        });


        var modifier = new Modifier({
        	origin:[.5,.5],
        	transform: Transform.rotate(.6,.2,.2)
        });


        var testView = new TestView();

        
        mainContext.setPerspective(3000);
        mainContext.add(modifier).add(testView);
        


        //animate the entire scene
        modifier.setTransform(Transform.rotate(0,0,0), {duration: 3000});



        Engine.on("click", function(){
                if(isPaused) {Engine.unpause()}
                else {Engine.pause()}

                isPaused = !isPaused;
        });

        window.Famous = mainContext;
});
