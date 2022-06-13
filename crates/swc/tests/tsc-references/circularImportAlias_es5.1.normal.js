import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
import _inherits from "@swc/helpers/src/_inherits.mjs";
import _create_super from "@swc/helpers/src/_create_super.mjs";
// expected no error
var B;
(function(B1) {
    var a = A;
    B1.a = a;
    var D = /*#__PURE__*/ function(_C) {
        "use strict";
        _inherits(D, _C);
        var _super = _create_super(D);
        function D() {
            _class_call_check(this, D);
            return _super.apply(this, arguments);
        }
        return D;
    }(a.C);
    B1.D = D;
})(B || (B = {}));
var A;
(function(A1) {
    var C = function C() {
        "use strict";
        _class_call_check(this, C);
    };
    A1.C = C;
    var b = B;
    A1.b = b;
})(A || (A = {}));
var c;
var c = new B.a.C();
