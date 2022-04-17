'use strict';

// Imports
const { Node, EnumValue, Box, Vec, Custom } = require('../kinds.js');

// Exports

module.exports = {
    TsTypeAssertion: Node({}), // TODO
    TsConstAssertion: Node({}), // TODO
    TsNonNullExpression: Node({}), // TODO
    TsAsExpression: Node({}), // TODO
    TsInstantiation: Node({}), // TODO
    TsTypeAnnotation: Node({ typeAnnotation: Box('TsType') }), // TODO Needs tests
    TsInterfaceDeclaration: Node({}), // TODO
    TsTypeAliasDeclaration: Node({}), // TODO
    TsEnumDeclaration: Node({}), // TODO
    TsModuleDeclaration: Node({}), // TODO
    TsImportEqualsDeclaration: Node({}), // TODO
    TsExportAssignment: Node({}), // TODO
    TsNamespaceExportDeclaration: Node({}), // TODO
    TsTypeParamDeclaration: Node({ parameters: Vec('TsTypeParameter') }),
    TsTypeParameterInstantiation: Node({ params: Vec(Box('TsType')) }),
    TsExpressionWithTypeArg: Node({}), // TODO
    TsIndexSignature: Node({}), // TODO
    TsParamProp: Node({}), // TODO

    TsTypeParameterDeclaration: Node({ parameters: Vec('TsTypeParameter') }),
    TsTypeParameterInstantiation: Node({ params: Vec(Box('TsType')) }),
    TsTypeParameter: Node({}), // TODO

    TsType: Node({}), // TODO

    Accessibility: EnumValue(['public', 'protected', 'private'], { length: 1 }), // TODO Needs tests
    OptionAccessibility: Custom({ // TODO Needs tests
        deserialize(buff, pos) {
            const opt = buff.readUInt8(pos);
            if (opt === 1) return deserializeAccessibility(buff, pos + 1);
            assert(opt === 0);
            return null;
        },
        dependencies: ['Accessibility'],
        length: 2
    })
};
