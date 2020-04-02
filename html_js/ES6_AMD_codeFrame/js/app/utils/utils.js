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

define(["app/utils/math", 
    "app/utils/constants",
	"app/utils/inheritUtil",],function(
    math, 
	constants,
	inheritUtil){
		"use strict"
		
		var utils={};
		utils.math=math;
		utils.constants = constants;
		utils.inheritUtil = inheritUtil;
		
		return utils;
	});