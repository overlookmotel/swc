import _extends from "@swc/helpers/src/_extends.mjs";
let React = require('react');
export default function Component(props) {
    return React.createElement(AnotherComponent, _extends({}, props, {
        property2: !0,
        AnotherProperty1: "hi"
    }));
};
function AnotherComponent({ property1  }) {
    return React.createElement("span", null, property1);
}
