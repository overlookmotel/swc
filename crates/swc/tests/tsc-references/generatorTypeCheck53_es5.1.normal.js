import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
import regeneratorRuntime from "regenerator-runtime";
var _marked = regeneratorRuntime.mark(g);
//@target: ES6
var Foo = function Foo() {
    "use strict";
    _class_call_check(this, Foo);
};
var Baz = function Baz() {
    "use strict";
    _class_call_check(this, Baz);
};
function g() {
    return regeneratorRuntime.wrap(function g$(_ctx) {
        while(1)switch(_ctx.prev = _ctx.next){
            case 0:
                _ctx.next = 2;
                return new Foo;
            case 2:
                return _ctx.delegateYield([
                    new Baz
                ], "t0", 3);
            case 3:
            case "end":
                return _ctx.stop();
        }
    }, _marked);
}
