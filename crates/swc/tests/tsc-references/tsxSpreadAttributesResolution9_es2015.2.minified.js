import _extends from "@swc/helpers/src/_extends.mjs";
let React = require('react');
class Opt extends React.Component {
    render() {
        return React.createElement("div", null, "Hello");
    }
}
let obj1 = {
    x: 2
};
_extends({}, {}), _extends({}, obj1), _extends({}, obj1, {
    y: !0
});
