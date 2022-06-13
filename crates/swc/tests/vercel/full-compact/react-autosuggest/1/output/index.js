"use strict";import e from"@swc/helpers/src/_instanceof.mjs";Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var d=function(a){if(a&&a.__esModule)return a;if(null===a||"object"!==g(a)&&"function"!=typeof a)return{default:a};var b=f();if(b&&b.has(a))return b.get(a);var c={},h=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var d in a)if(Object.prototype.hasOwnProperty.call(a,d)){var e=h?Object.getOwnPropertyDescriptor(a,d):null;e&&(e.get||e.set)?Object.defineProperty(c,d,e):c[d]=a[d]}return c.default=a,b&&b.set(a,c),c}(require("react")),a=function(a){return a&&a.__esModule?a:{default:a}}(require("prop-types"));function f(){if("function"!=typeof WeakMap)return null;var a=new WeakMap;return f=function(){return a},a}function g(a){return(g="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(a){return typeof a}:function(a){return a&&"function"==typeof Symbol&&a.constructor===Symbol&&a!==Symbol.prototype?"symbol":typeof a})(a)}function h(){return(h=Object.assign||function(d){for(var a=1;a<arguments.length;a++){var b=arguments[a];for(var c in b)Object.prototype.hasOwnProperty.call(b,c)&&(d[c]=b[c])}return d}).apply(this,arguments)}function i(c,d){var a=Object.keys(c);if(Object.getOwnPropertySymbols){var b=Object.getOwnPropertySymbols(c);d&&(b=b.filter(function(a){return Object.getOwnPropertyDescriptor(c,a).enumerable})),a.push.apply(a,b)}return a}function j(d,c){for(var b=0;b<c.length;b++){var a=c[b];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(d,a.key,a)}}function k(a){if(void 0===a)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return a}function l(a){return(l=Object.setPrototypeOf?Object.getPrototypeOf:function(a){return a.__proto__||Object.getPrototypeOf(a)})(a)}function m(a,b){return(m=Object.setPrototypeOf||function(a,b){return a.__proto__=b,a})(a,b)}function c(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}var b=function(o){!function(b,a){if("function"!=typeof a&&null!==a)throw TypeError("Super expression must either be null or a function");b.prototype=Object.create(a&&a.prototype,{constructor:{value:b,writable:!0,configurable:!0}}),a&&m(b,a)}(n,o);var p,a,b,f,q=(p=n,function(){var c,a,b,d=l(p);if(function a(){if("undefined"==typeof Reflect||!Reflect.construct||Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Date.prototype.toString.call(Reflect.construct(Date,[],function(){})),!0}catch(b){return!1}}()){var e=l(this).constructor;b=Reflect.construct(d,arguments,e)}else b=d.apply(this,arguments);return c=this,a=b,a&&("object"===g(a)||"function"==typeof a)?a:k(c)});function n(){!function(a,b){if(!e(a,b))throw TypeError("Cannot call a class as a function")}(this,n);for(var b,c=arguments.length,d=Array(c),a=0;a<c;a++)d[a]=arguments[a];return!function(a,b,c){return b in a?Object.defineProperty(a,b,{value:c,enumerable:!0,configurable:!0,writable:!0}):a[b]=c,a}(function(a){if(void 0===a)throw ReferenceError("this hasn't been initialised - super() hasn't been called");return a}(b=q.call.apply(q,[this].concat(d))),"storeHighlightedItemReference",function(a){b.props.onHighlightedItemChange(null===a?null:a.item)}),b}return a=n,b=[{key:"shouldComponentUpdate",value:function(a){return(0,_compareObjects.default)(a,this.props,["itemProps",])}},{key:"render",value:function(){var l=this,a=this.props,f=a.items,g=a.itemProps,m=a.renderItem,n=a.renderItemData,b=a.sectionIndex,o=a.highlightedItemIndex,p=a.getItemId,j=a.theme,e=a.keyPrefix,k=null===b?e:"".concat(e,"section-").concat(b,"-"),q="function"==typeof g;return d.default.createElement("ul",h({role:"listbox"},j("".concat(k,"items-list"),"itemsList")),f.map(function(r,a){var e=a===o,s="".concat(k,"item-").concat(a),t=q?g({sectionIndex:b,itemIndex:a}):g,f=function(b){for(var e=arguments,d=function(a){var d=null!=e[a]?e[a]:{};a%2?i(Object(d),!0).forEach(function(a){c(b,a,d[a])}):Object.getOwnPropertyDescriptors?Object.defineProperties(b,Object.getOwnPropertyDescriptors(d)):i(Object(d)).forEach(function(a){Object.defineProperty(b,a,Object.getOwnPropertyDescriptor(d,a))})},a=1;a<arguments.length;a++)d(a);return b}({id:p(b,a),"aria-selected":e},j(s,"item",0===a&&"itemFirst",e&&"itemHighlighted"),{},t);return e&&(f.ref=l.storeHighlightedItemReference),d.default.createElement(_Item.default,h({},f,{sectionIndex:b,isHighlighted:e,itemIndex:a,item:r,renderItem:m,renderItemData:n}))}))}},],j(a.prototype,b),f&&j(a,f),n}(d.Component);exports.default=b,c(b,"propTypes",{items:a.default.array.isRequired,itemProps:a.default.oneOfType([a.default.object,a.default.func,]),renderItem:a.default.func.isRequired,renderItemData:a.default.object.isRequired,sectionIndex:a.default.number,highlightedItemIndex:a.default.number,onHighlightedItemChange:a.default.func.isRequired,getItemId:a.default.func.isRequired,theme:a.default.func.isRequired,keyPrefix:a.default.string.isRequired}),c(b,"defaultProps",{sectionIndex:null}),new b
