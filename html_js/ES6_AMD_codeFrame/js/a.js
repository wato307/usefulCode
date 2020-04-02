//strongly recommended to define module.
define(function(){
	function notRecommendedFunction(){
		
		var person = require("app/models/person"); //import other module
		var p= new person();
		p.setName("jianwei")
		p.getName();
		
        console.log("this is not a recommended module");	
	}
	
	return notRecommendedFunction;
});

//------------------------------------------------
// below code also can work, but all of them are public, 
// which will cause namespace pollution.

//function notRecommendedFunction(){
//    console.log("this is not a recommended module");	
//}
