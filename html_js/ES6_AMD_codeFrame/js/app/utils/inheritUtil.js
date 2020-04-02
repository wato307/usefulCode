define([], function(){
	"use strict"
	
	//inherit
    var createObject = function (baseProto) {
        if (!Object.create) {
            Object.create = function (obj) {
                function T() { };
                T.prototype = obj;
                return new T();
            }
        }
        return Object.create(baseProto);
    };

    var inheritInternal = function (derived, base) {
        derived.prototype = createObject(base.prototype);
        derived.prototype.constructor = derived;
    };

    return {
        inherit: inheritInternal
    };
});