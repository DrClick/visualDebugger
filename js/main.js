define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Surface = require('famous/core/Surface');
        var Modifier = require("famous/core/Modifier");
        var Transform = require("famous/core/Transform");
        var Timer = require("famous/utilities/Timer");

        var TestView = require("app/views/TestView");


        var mainContext = Engine.createContext({debug:true});


        Timer.setClockSpeed(.1);
        Timer.pause();


        mainContext.on("debug.renderTree", function(renderTree){
                //Here we can monitor the render tree
                //console.log(renderTree);
        });


        var stepSurface = new Surface({
                content: "Skip 200ms",
                size: [100,50],
                properties: {backgroundColor:"orange"}
        });
        stepSurface.on("click", function(){
                Timer.resume();
                Engine.setOptions({runLoop: true});
        });


        var modifier = new Modifier({
        	origin:[.5,.5],
        	transform: Transform.rotate(.6,.2,.2)
        });


        var testView = new TestView();

        
        mainContext.setPerspective(3000);
        mainContext.add(new Modifier({
                origin:[.5,.5],
                transform: Transform.translate(0,0,2000)
        })).add(stepSurface);
        mainContext.add(modifier).add(testView);
        

        modifier.setTransform(Transform.rotate(0,0,0), {duration: 3000});
});
