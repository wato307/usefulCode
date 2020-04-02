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

define(["app/models/person", 
    "app/models/student"],function(
    person, 
	student){
		
		"use strict"
		
		var models={};
		models.person=person;
		models.student=student;
		
		return models;
	});