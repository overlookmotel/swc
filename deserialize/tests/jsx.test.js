"use strict";

// Imports
const { itParsesAndPrints } = require("./utils.js");

// Tests

describe("JSX", () => {
    describe("JSX elements", () => {
        describe("self-closing", () => {
            itParsesAndPrints("with no attributes", { jsx: true }, [
                "<div />",
                "<tag_name_longer_than_7_chars />",
                "<Foo />",
                "<Tag_name_longer_than_7_chars />",

                "<ns:Foo />",
                "<namespace_name_longer_than_7_chars:Tag_name_longer_than_7_chars />",

                "<Foo.Bar />",
                "<Tag_name_longer_than_7_chars.prop_name_longer_than_7_chars />",
                "<Foo.Bar.Qux />",
                "<Tag_name_longer_than_7_chars.prop_name_longer_than_7_chars.prop_name_longer_than_7_chars2 />"
            ]);

            itParsesAndPrints("with attributes", { jsx: true }, [
                "<Foo x={a} />",
                "<Foo x={1} />",
                "<Foo x={'a'} />",
                "<Foo x={() => {}} />",
                "<Foo x={<Bar />} />",
                "<Foo x={<Bar y={1} />} />",
                "<Foo x={<Bar>y</Bar>} />",
                "<Foo x={<>a</>} />",
                '<Foo x="a" />',
                "<Foo x=<Bar /> />",
                "<Foo x=<Bar y={1} /> />",
                "<Foo x=<Bar>y</Bar> />",
                "<Foo x=<>a</> />",
                "<Foo prop_name_longer_than_7_chars={var_name_longer_than_7_chars} />",
                '<Foo prop_name_longer_than_7_chars="str_longer_than_7_chars" />',

                "<Foo ns:x={a} />",
                "<Foo ns:x={1} />",
                "<Foo ns:x={'a'} />",
                "<Foo ns:x={() => {}} />",
                "<Foo ns:x={<Bar />} />",
                "<Foo ns:x={<Bar ns:y={1} />} />",
                "<Foo ns:x={<Bar>y</Bar>} />",
                "<Foo ns:x={<>a</>} />",
                '<Foo ns:x="a" />',
                "<Foo ns:x=<Bar /> />",
                "<Foo ns:x=<Bar ns:y={1} /> />",
                "<Foo ns:x=<Bar>y</Bar> />",
                "<Foo ns:x=<>a</> />",
                "<Foo namespace_name_longer_than_7_chars:x={a} />",
                "<Foo namespace_name_longer_than_7_chars:prop_name_longer_than_7_chars={a} />",
                "<Foo namespace_name_longer_than_7_chars:prop_name_longer_than_7_chars={var_name_longer_than_7_chars} />",
                '<Foo namespace_name_longer_than_7_chars:prop_name_longer_than_7_chars="str_longer_than_7_chars" />',

                "<Foo {...a} />",
                "<Foo {...var_name_longer_than_7_chars} />",
                "<Foo {...a.b.c} />",

                "<Foo x={a} y={b} z={c} />",
                "<Foo x={1} y={2} z={3} />",
                "<Foo x={'a'} y={'b'} z={'c'} />",
                "<Foo x={() => 1} y={() => 2} z={() => 3} />",
                "<Foo x={<Bar />} y={<Qux>a</Qux>} z={<Roo q={1}>b</Roo>} />",
                "<Foo x={<></>} y={<>a</>} z={<><>b</></>} />",
                '<Foo x="a" y="b" z="c" />',
                "<Foo x=<Bar /> y=<Qux>a</Qux> z=<Roo q={1}>b</Roo> />",
                "<Foo x=<></> y=<>a</> z=<><>b</></> />",

                "<Foo ns:x={a} ns:y={b} ns:z={c} />",
                "<Foo ns:x={1} ns:y={2} ns:z={3} />",
                "<Foo ns:x={'a'} ns:y={'b'} ns:z={'c'} />",
                "<Foo ns:x={() => 1} ns:y={() => 2} ns:z={() => 3} />",
                "<Foo ns:x={<Bar />} ns:y={<Qux>a</Qux>} z={<Roo ns:q={1}>b</Roo>} />",
                "<Foo ns:x={<></>} ns:y={<>a</>} ns:z={<><>b</></>} />",
                '<Foo ns:x="a" ns:y="b" ns:z="c" />',
                "<Foo ns:x=<Bar /> ns:y=<Qux>a</Qux> z=<Roo ns:q={1}>b</Roo> />",
                "<Foo ns:x=<></> ns:y=<>a</> ns:z=<><>b</></> />",

                "<Foo {...a} {...b} {...c} />",
                "<Foo {...a.b.c} {...d.e.f} {...g.h.i} />",

                '<Foo {...a} x={b} {...c} y={1} {...d} {...e} z="f" {...g} />',
                `<Foo
                    {...var_name_longer_than_7_chars}
                    prop_name_longer_than_7_chars={var_name_longer_than_7_chars2}
                    {...var_name_longer_than_7_chars3}
                    prop_name_longer_than_7_chars2={var_name_longer_than_7_chars4}
                    {...var_name_longer_than_7_chars5}
                    {...var_name_longer_than_7_chars6}
                    prop_name_longer_than_7_char3={var_name_longer_than_7_chars7}
                    {...var_name_longer_than_7_chars8}
                />`
            ]);
        });

        describe("with closing tag", () => {
            describe("no children", () => {
                itParsesAndPrints("with no attributes", { jsx: true }, [
                    "<div></div>",
                    "<tag_name_longer_than_7_chars></tag_name_longer_than_7_chars>",
                    "<Foo></Foo>",
                    "<Tag_name_longer_than_7_chars></Tag_name_longer_than_7_chars>",

                    "<ns:Foo></ns:Foo>",
                    "<namespace_name_longer_than_7_chars:Tag_name_longer_than_7_chars></namespace_name_longer_than_7_chars:Tag_name_longer_than_7_chars>",

                    "<Foo.Bar></Foo.Bar>",
                    "<Tag_name_longer_than_7_chars.prop_name_longer_than_7_chars></Tag_name_longer_than_7_chars.prop_name_longer_than_7_chars>",
                    "<Foo.Bar.Qux></Foo.Bar.Qux>",
                    "<Tag_name_longer_than_7_chars.prop_name_longer_than_7_chars.prop_name_longer_than_7_chars2></Tag_name_longer_than_7_chars.prop_name_longer_than_7_chars.prop_name_longer_than_7_chars2>"
                ]);

                itParsesAndPrints("with attributes", { jsx: true }, [
                    "<Foo x={a}></Foo>",
                    "<Foo x={1}></Foo>",
                    "<Foo x={'a'}></Foo>",
                    "<Foo x={() => {}}></Foo>",
                    "<Foo x={<Bar />}></Foo>",
                    "<Foo x={<Bar y={1} />}></Foo>",
                    "<Foo x={<Bar>y</Bar>}></Foo>",
                    "<Foo x={<>a</>}></Foo>",
                    '<Foo x="a"></Foo>',
                    "<Foo x=<Bar />></Foo>",
                    "<Foo x=<Bar y={1} />></Foo>",
                    "<Foo x=<Bar>y</Bar>></Foo>",
                    "<Foo x=<>a</>></Foo>",
                    "<Foo prop_name_longer_than_7_chars={var_name_longer_than_7_chars}></Foo>",
                    '<Foo prop_name_longer_than_7_chars="str_longer_than_7_chars"></Foo>',

                    "<Foo ns:x={a}></Foo>",
                    "<Foo ns:x={1}></Foo>",
                    "<Foo ns:x={'a'}></Foo>",
                    "<Foo ns:x={() => {}}></Foo>",
                    "<Foo ns:x={<Bar />}></Foo>",
                    "<Foo ns:x={<Bar ns:y={1} />}></Foo>",
                    "<Foo ns:x={<Bar>y</Bar>}></Foo>",
                    "<Foo ns:x={<>a</>}></Foo>",
                    '<Foo ns:x="a"></Foo>',
                    "<Foo ns:x=<Bar />></Foo>",
                    "<Foo ns:x=<Bar ns:y={1} />></Foo>",
                    "<Foo ns:x=<Bar>y</Bar>></Foo>",
                    "<Foo ns:x=<>a</>></Foo>",
                    "<Foo namespace_name_longer_than_7_chars:x={a}></Foo>",
                    "<Foo namespace_name_longer_than_7_chars:prop_name_longer_than_7_chars={a}></Foo>",
                    "<Foo namespace_name_longer_than_7_chars:prop_name_longer_than_7_chars={var_name_longer_than_7_chars}></Foo>",
                    '<Foo namespace_name_longer_than_7_chars:prop_name_longer_than_7_chars="str_longer_than_7_chars"></Foo>',

                    "<Foo {...a}></Foo>",
                    "<Foo {...var_name_longer_than_7_chars}></Foo>",
                    "<Foo {...a.b.c}></Foo>",

                    "<Foo x={a} y={b} z={c}></Foo>",
                    "<Foo x={1} y={2} z={3}></Foo>",
                    "<Foo x={'a'} y={'b'} z={'c'}></Foo>",
                    "<Foo x={() => 1} y={() => 2} z={() => 3}></Foo>",
                    "<Foo x={<Bar />} y={<Qux>a</Qux>} z={<Roo q={1}>b</Roo>}></Foo>",
                    "<Foo x={<></>} y={<>a</>} z={<><>b</></>}></Foo>",
                    '<Foo x="a" y="b" z="c"></Foo>',
                    "<Foo x=<Bar /> y=<Qux>a</Qux> z=<Roo q={1}>b</Roo>></Foo>",
                    "<Foo x=<></> y=<>a</> z=<><>b</></>></Foo>",

                    "<Foo ns:x={a} ns:y={b} ns:z={c}></Foo>",
                    "<Foo ns:x={1} ns:y={2} ns:z={3}></Foo>",
                    "<Foo ns:x={'a'} ns:y={'b'} ns:z={'c'}></Foo>",
                    "<Foo ns:x={() => 1} ns:y={() => 2} ns:z={() => 3}></Foo>",
                    "<Foo ns:x={<Bar />} ns:y={<Qux>a</Qux>} ns:z={<Roo ns:q={1}>b</Roo>}></Foo>",
                    "<Foo ns:x={<></>} ns:y={<>a</>} ns:z={<><>b</></>}></Foo>",
                    '<Foo ns:x="a" ns:y="b" ns:z="c"></Foo>',
                    "<Foo ns:x=<Bar /> ns:y=<Qux>a</Qux> ns:z=<Roo ns:q={1}>b</Roo>></Foo>",
                    "<Foo ns:x=<></> ns:y=<>a</> ns:z=<><>b</></>></Foo>",

                    "<Foo {...a} {...b} {...c}></Foo>",
                    "<Foo {...a.b.c} {...d.e.f} {...g.h.i}></Foo>",

                    '<Foo {...a} x={b} {...c} y={1} {...d} {...e} z="f" {...g}></Foo>',
                    `<Foo
                        {...var_name_longer_than_7_chars}
                        prop_name_longer_than_7_chars={var_name_longer_than_7_chars2}
                        {...var_name_longer_than_7_chars3}
                        prop_name_longer_than_7_chars2={var_name_longer_than_7_chars4}
                        {...var_name_longer_than_7_chars5}
                        {...var_name_longer_than_7_chars6}
                        prop_name_longer_than_7_char3={var_name_longer_than_7_chars7}
                        {...var_name_longer_than_7_chars8}
                    ></Foo>`
                ]);
            });

            itParsesAndPrints("with children", { jsx: true }, [
                "<div>Hello</div>",
                "<div>text longer than 7 chars</div>",
                "<div><span /></div>",
                "<div><span /><span /><span /></div>",
                "<div><h1>Hello <em>Burt</em></h1><div>And goodbye</div></div>",
                "<div>{greeting}</div>",
                "<div>Hello {name}</div>",
                "<div>{...spreadable}</div>",
                "<div>Hello {...spreadable}</div>",

                `<html>
                    <head>
                        <title>Hello</title>
                    </head>
                    <body style={{margin: 20, 'font-size': 24}}>
                        <h1 class="title">Hello {name}</h1>
                        <div class="body">Well Hello</div>
                    </body>
                </html>`,

                "<Greeting>Hello</Greeting>",
                "<Greeting>text longer than 7 chars</Greeting>",
                "<Outer><Inner /></Outer>",
                "<Outer><Inner /><Inner2 /><Inner3 /></Outer>",
                "<Outer><><Inner /><Inner2 /></></Outer>",
                "<Outer><Inner>Hello <Name>Burt</Name></Inner><Inner>And goodbye</Inner></Outer>",
                "<Greeting>{name}</Greeting>",
                "<Greeting>Hello {name}</Greeting>",
                "<Greeting>{...spreadable}</Greeting>",
                "<Greeting>Hello {...spreadable}</Greeting>",

                `<Outer x={xx} style={{font: 'Arial', 'font-size': 24}}>
                    <Inner1 >
                        <Nested1 />
                        <Nested2>Hello {name}</Nested2>
                    </Inner1>
                    <>
                        <Nested3 />
                        <Nested4>Goodbye {alias} and good riddance you {insult}!</Nested4>
                    </>
                </Outer>`
            ]);
        });
    });

    itParsesAndPrints("JSX fragments", { jsx: true }, [
        "<></>",
        "<><></><></><></></>",
        "<><div>a</div><div>b</div><div>c</div></>",
        `<>
            <>
                <Foo />
                <Bar>qux</Bar>
            </>
            <>
                <Qux />
                <></>
                <></>
            </>
        </>`
    ]);

    describe("JSX expressions", () => {
        itParsesAndPrints("JS expressions", { jsx: true }, [
            "<Foo>{a}</Foo>",
            "<Foo>{'a'}</Foo>",
            '<Foo>{"a"}</Foo>',
            "<Foo>{`a${x}b${y}c`}</Foo>",
            "<Foo>{a + 1}</Foo>",
            "<Foo>{a || 'none'}</Foo>",
            "<Foo>{a ? 'something' : 'nothing'}</Foo>",
            "<Foo>{() => 123}</Foo>",
            "<Foo>{function f() {}}</Foo>"
        ]);

        itParsesAndPrints("JSX expressions", { jsx: true }, [
            "<Foo>{<Bar />}</Foo>",
            "<Foo>{<Bar>x</Bar>}</Foo>",
            "<Foo>{<></>}</Foo>",
            "<Foo>{<>x</>}</Foo>"
        ]);

        itParsesAndPrints("spread", { jsx: true }, [
            "<Foo>{...x}</Foo>",
            "<Foo>{...[]}</Foo>",
            "<Foo>{...[x, y, z]}</Foo>"
        ]);

        itParsesAndPrints("empty", { jsx: true }, [
            "<Foo>{}</Foo>",
            "<Foo>{ /* bar */ }</Foo>"
        ]);
    });
});
