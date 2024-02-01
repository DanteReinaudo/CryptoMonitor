const assert = require("assert");
const {describe} = require("mocha");
import {Constant} from '../classes/values/constant';

describe("constant",function(){

    it("should be a not null after create it", function() {
        const constant = new Constant(10);
        assert.notDeepEqual(constant, null);
    });

    it("should store string", function() {
        const constant = new Constant("Hola");
        assert.deepEqual(constant.getValue(), "Hola");
    });

    it("should store bool", function() {
        const constant = new Constant(true);
        assert.deepEqual(constant.getValue(), true);
    });

    it("should store number", function() {
        const constant= new Constant(10);
        assert.deepEqual(constant.getValue(), 10);
    });

    it("should return error if has different type", function() {
        assert.throws(()=> {new Constant(new Date())}, Error, 'Constant must have a string, bool or number type.');
    });

    it("should return constan type", function() {
        const constant = new Constant(10);
        assert.deepEqual(constant.type, "CONSTANT");
    });

    it("should convert number value to JSON", function() {
        const constant = new Constant(10);
        assert.deepEqual(constant.toJSON(), '{ "type":"CONSTANT","value":10 }');
    });

    it("should convert string value to JSON", function() {
        const constant = new Constant("Hola");
        assert.deepEqual(constant.toJSON(), '{ "type":"CONSTANT","value":"Hola" }');
    });


    it("should execute with string", function() {
        const constant = new Constant("Hola");
        assert.deepEqual(constant.execute(), "Hola");
    });

    it("should execute with number", function() {
        const constant = new Constant(15);
        assert.deepEqual(constant.execute(), 15);
    });

    it("should execute with string", function() {
        const constant = new Constant(true);
        assert.deepEqual(constant.execute(), true);
    });

})