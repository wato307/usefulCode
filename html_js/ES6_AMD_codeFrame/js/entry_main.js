//www/
//    index.html
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

require.config({

	//By default load any module IDs from js/lib
	//-------------
	//if baseUrl is not defined, the default load directory will be 
	//its HTML location. if added "data-main" property in the HTML,
	//then the data-main directory will be the default location.
	baseUrl: "js/lib",
	
	//except, if the module ID starts with "app",
    //load it from the js/app directory. paths
    //config is relative to the baseUrl, and
    //never includes a ".js" extension since
    //the paths config could be for a directory.
	paths:{
		app: "../app"
	}	

	//Generally use baseUrl + paths to config module location.
	//But if you don't want use this regulation, see below:(not recommended)
	//special module load regulation if the module 
	//complies with one of following rules:
    //	- start with "/", OR
    //  - end with ".js", OR
	//  - contain URL protocal as "http:" or "https:"
	//those modules will load from the location relative to its html page	
	
});

require(["jquery",  //load jquery.js from baseUrl("js/lib/jquery.js")
        //--------------------------------
		//"app/models/student", //load student.js from app("app/models/student.js")
		//"app/utils/math",  //load math.js from app("app/utils/math.js")
		"app/main", //load all modules in app together
		//------------------------------
		"js/a.js"], //load a.js from the location relative to its html page.("js/a.js")
	function($, /*student, math*/ app, a){
		var m={k1:1,k2:2,k3:3,k4:[1,2]};
		var n = {};
		$.extend(n,m);
		n.k2=4;
		n.k4.push(3);
		console.log(m.k2 + " " + m.k4);
		
		var student = app.models.student;
		var math = app.utils.math;
		
		var h2 = $("h2");
	    var s = new student("xiaojun", 28, "Shanghai Jiaotong Universory");
		s.getName();
		s.getSchool();		
		console.log(math.add(3,5,7), math.getPI());
		alert("modules loaded successfully");
		
		$(document).ready(function () {
			new a();
			//notRecommendedFunction();			
		})
	});