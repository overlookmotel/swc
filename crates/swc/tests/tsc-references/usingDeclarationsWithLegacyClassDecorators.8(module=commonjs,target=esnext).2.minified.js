//// [usingDeclarationsWithLegacyClassDecorators.8.ts]
Object.defineProperty(exports, "__esModule", {
    value: !0
}), Object.defineProperty(exports, "C", {
    enumerable: !0,
    get: function() {
        return _C;
    }
});
const _ts_decorate = require("@swc/helpers/_/_ts_decorate"), _dispose = require("@swc/helpers/_/_dispose"), _using = require("@swc/helpers/_/_using");
try {
    var _C, _stack = [];
    class C {
    }
    _C = C, C = _ts_decorate._([
        dec
    ], C), _using._(_stack, null);
} catch (_) {
    var _error = _, _hasError = !0;
} finally{
    _dispose._(_stack, _error, _hasError);
}
