import _class_call_check from "@swc/helpers/src/_class_call_check.mjs";
import _extends from "@swc/helpers/src/_extends.mjs";
import _inherits from "@swc/helpers/src/_inherits.mjs";
import _create_super from "@swc/helpers/src/_create_super.mjs";
var React = require("react"), Opt = function(_Component) {
    "use strict";
    _inherits(Opt, _Component);
    var _super = _create_super(Opt);
    function Opt() {
        return _class_call_check(this, Opt), _super.apply(this, arguments);
    }
    return Opt.prototype.render = function() {
        return React.createElement("div", null, "Hello");
    }, Opt;
}(React.Component), obj1 = {
    x: 2
};
_extends({}, {}, {
    x: 3
}), _extends({}, obj1, {
    x: "Hi"
}), _extends({}, obj1, {
    x: 3
});
