import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
import _tagged_template_literal from "@swc/helpers/src/_tagged_template_literal.mjs";
function _templateObject() {
    var data = _tagged_template_literal([
        "test"
    ]);
    return _templateObject = function _templateObject() {
        return data;
    }, data;
}
function _templateObject1() {
    var data = _tagged_template_literal([
        "test"
    ]);
    return _templateObject1 = function _templateObject1() {
        return data;
    }, data;
}
var Foo = function() {
    "use strict";
    function Foo() {
        _class_call_check(this, Foo);
    }
    return Foo.m = function(strings) {
        return new this();
    }, Foo;
}();
Foo.m(_templateObject()), Foo.m(_templateObject1());
