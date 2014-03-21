define(function(require, exports, module) {
        var Engine = require('famous/core/Engine');
        var Surface = require('famous/core/Surface');
        var Modifier = require("famous/core/Modifier");
        var Transform = require("famous/core/Transform");
        var Clock = require("famous/utilities/Clock");

        

        //required for debugging
        var Debugger = require("famous/utilities/Debugger");


        var TestView = require("app/views/TestView");
        var RotateView = require("app/views/RotateView");


        var mainContext = Engine.createContext({debug:true});
        var famousDebugger = new Debugger(mainContext);

        //slow things down
        Clock.setClockSpeed(1);


        var modifier = new Modifier({
        	origin:[.5,.5],
        	transform: Transform.rotate(.6,.2,.2)
        });


        var testView = new TestView();
        var rotateView = new RotateView();

        
        mainContext.setPerspective(1000);

        
        ////Original Case
        //animate the entire scene
        //mainContext.add(modifier).add(testView);
        //modifier.setTransform(Transform.rotate(0,0,0), {duration: 30000});


        


        //rotate case
        mainContext.add(rotateView);
        


        




});
