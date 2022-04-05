// @target: es5
var bin1 = 0b11010;
var bin2 = 0B11010;
var bin3 = 0B11111111111111111111111111111111111111111111111101001010100000010111110001111111111;
var bin4 = Infinity;
var obj1 = {
    0b11010: "Hello",
    a: bin1,
    bin1: bin1,
    b: 0b11010,
    Infinity: true
};
var obj2 = {
    0B11010: "World",
    a: bin2,
    bin2: bin2,
    b: 0B11010,
    0B11111111111111111111111111111111111111111111111101001010100000010111110001111111111: false
};
obj1[0b11010]; // string
obj1[26]; // string
obj1["26"]; // string
obj1["0b11010"]; // any
obj1["a"]; // number
obj1["b"]; // number
obj1["bin1"]; // number
obj1["Infinity"]; // boolean
obj2[0B11010]; // string
obj2[26]; // string
obj2["26"]; // string
obj2["0B11010"]; // any
obj2["a"]; // number
obj2["b"]; // number
obj2["bin2"]; // number
obj2[9.671406556917009e+24]; // boolean
obj2["9.671406556917009e+24"]; // boolean
obj2["Infinity"]; // any
