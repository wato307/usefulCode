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

define(["app/models/person"], function(
    person){
	
	"use strict"
	
	function student(name, age, school){
		person.call(this, name, age);
		
		this.school = school || "Beijing Universory";
	}	
	
	//---------
	//inherit
	//var createObject = function(baseProto){
	//	if(!Object.create){
	//		Object.create = function(obj){
	//			function T(){};
	//			T.prototype = obj;
	//			return new T();
	//		}
	//	}
	//	return Object.create(baseProto);
	//};
	//student.prototype = createObject(person.prototype);
	//student.prototype.constructor = student;	
	//-----------------
	person.inheritBy(student);
	
	student.prototype.getSchool = function(){
		console.log(this.school);
		return this.school;
	}
	
	return student;
});