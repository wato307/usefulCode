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

define(["app/models/models",
    "app/utils/utils"], function(
	models, 
	utils){
		"use strict"
		
		return {
			models:models,
			utils:utils
		}
	});