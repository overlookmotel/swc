import * as swcHelpers from "@swc/helpers";
var _ref, _method = new WeakSet(), C = function() {
    "use strict";
    swcHelpers.classCallCheck(this, C), swcHelpers.classPrivateMethodInit(this, _method);
};
function method() {
    return 42;
}
C.s = swcHelpers.classPrivateMethodGet(_ref = new C(), _method, method).call(_ref), console.log(C.s);
