define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Surface = require('famous/core/Surface');
        var Modifier = require("famous/core/Modifier");
        var Transform = require("famous/core/Transform");
        var Clock = require("famous/utilities/Clock");

        //required for debugging
        var Debugger = require("famous/utilities/Debugger");


        var TestView = require("app/views/TestView");


        var mainContext = Engine.createContext({debug:true});
        var famousDebugger = new Debugger(mainContext);

        //slow things down
        Clock.setClockSpeed(4);


        var modifier = new Modifier({
        	origin:[.5,.5],
        	transform: Transform.rotate(.6,.2,.2)
        });


        var testView = new TestView();

        
        mainContext.setPerspective(3000);
        mainContext.add(modifier).add(testView);
        


        //animate the entire scene
        modifier.setTransform(Transform.rotate(0,0,0), {duration: 30000});



        //pause the scene
        var isPaused = false;
        Engine.on("click", function(){
                isPaused = !isPaused;
                if(!isPaused) {Engine.unpause()}
                        else {Engine.pause()}


                });
});
