define(function(require, exports, module) {
    var RenderTreeVisualizer = require('../app/RenderTreeVisualizer');

    var Spec =  function(){ 
    	describe("Render Tree Visualizer", function() {
		  	describe("Single Node", function() {
				it("should show modifier if modifier", function() {
					
					var tree = [
						{
							//single surface with modifier
							"transform":[1,0,0,0,0,1,0,0,0,0,1,0,0,0,2000,1],
							"opacity":1,
							"origin":[0.5,0.5],
							"target":0,
							"name": undefined
						},
						{
							"transform":[0.9605304970014402,0.2739099422887103,-0.04852327117534858,0,-0.19470917115432465,0.7865976938782437,0.5859628031315778,0,0.1986693307950598,-0.5533872166040844,0.8088838516750222,0,0,0,0,1],
							"opacity":1,
							"origin":[0.5,0.5],
							"name": "TestView"
							"target":[
								{
									"transform":[1,0,0,0,0,1,0,0,0,0,1,0,-896.9256506860256,18.373581464402378,6.341710384003818,1],
									"opacity":1,
									"origin":[0.5,0.5],
									"target":1
								},
								[
									{
										"transform":[-0.9738591721265752,0,-0.22715262020267035,0,0,1,0,0,0.22715262020267035,0,-0.9738591721265752,0,0,0,0,1],
										"opacity":1,
										"origin":[0.5,0.5],
										"target":{
											"transform":[1,0,0,0,0,1,0,0,0,0,1,0,-187.84121811389923,276.2047347119078,-18.7792562879622,1],
											"opacity":1,
											"origin":[0.5,0.5],
											"target":2
										}
									},
									{
										"transform":[0.4157249610953569,0,-0.9094903829740377,0,0,1,0,0,0.9094903829740377,0,0.4157249610953569,0,0,0,0,1],
										"opacity":1,
										"origin":[0.5,0.5],
										"target":{
											"transform":[1,0,0,0,0,1,0,0,0,0,1,0,-1353.00576120615,-670.0664033535868,38.59851039014757,1],
											"opacity":1,
											"origin":[0.5,0.5],
											"target":3
										}
									}
								]
							]
						}
					];



					var actual = NextSlide(3,5,true);
					var expected = 4;
					
					expect(actual).toBe(expected);
				});
				it("should show surface if surface", function() {
					//perform test
					var actual = false;
					var expected = true;
					
					expect(actual).toBe(expected);
				});
				it("should show object if object", function() {
					//perform test
					var actual = NextSlide(4,5,true);
					var expected = 0;
					
					expect(actual).toBe(expected);
				});
			});
		});//
	};//end spec

	module.exports = Spec; 
});