//www/
//    index.html
//    css/
//    images/
//    js/
//        app/
//            models/
//                  person.js
//                  student.js
//                  models.js //--->collect all the models
//            utils/
//                  constants.js
//                  math.js
//                  inheritUtil.js
//                  utils.js //--->collect all the utils
//            main.js //--->collect sub moules.
//        lib/
//            jquery.js
//            require.js
//        entry_main.js

// load modules comply with baseUrl+paths regulation.
define(["jquery",
       "app/utils/constants"], function(
	   $, 
	   constants){
	
    "use strict";
		   
	function math(){
		//var h2 = $("h2");
	}
	
	math.prototype.add = function(){
		console.log("Add: " + arguments.length + " numbers");

		var len = arguments.length;
		if(len <= 0) return 0;		

		var sum = arguments[0];
		for(var i=1;i<len;i++){
			sum += arguments[i];
		}
		return sum;
	};
	
	math.prototype.getPI = function(){
		return constants.PI;
	};
	
	return new math();
});