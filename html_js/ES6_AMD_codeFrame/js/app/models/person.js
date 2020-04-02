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

// load modules comply with baseUrl+paths regulation.
define(["app/utils/constants", 
        "app/utils/math",
		"app/utils/inheritUtil"], function(
		constants,
		math,
		inheritUtil){
			
			"use strict";
			
			function person (name, age){
				this.name= name || "wato";
				this.age=age||30;
			}
			
			person.prototype.getName = function(){
				console.log(this.name);
				return this.name;
			};
			
			person.prototype.setName = function(name){
				this.name = name;
			};
			
			
			//base class static method
			person.inheritBy = function(derived){
				inheritUtil.inherit(derived, this);
			};
			
			return person;
		});