const assert = require("assert");
const {describe} = require("mocha");

import {Call} from '../classes/values/call';
import { Constant } from '../classes/values/constant';
import { Variable } from '../classes/values/variable';
import { WalletType } from '../classes/values/wallet';
import { Data } from '../classes/values/data';
import { ValueFactory } from '../classes/values/value_factory';


describe("value factory",function(){

    it("should be a not null after create it", function() {
        const factory = new ValueFactory();
        assert.notDeepEqual(factory, null);
    });

    it("should return error if type is undefined ", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should create a number constant", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "CONSTANT", "value":10 }')
        assert.deepEqual(factory.createValue(parsed), new Constant(10));
    });

    it("should create a string constant", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "CONSTANT", "value":"Hola" }')
        assert.deepEqual(factory.createValue(parsed), new Constant("Hola"));
    });

    it("should create a boolean constant", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "CONSTANT", "value":true }')
        assert.deepEqual(factory.createValue(parsed), new Constant(true));
    });

    it("should return error if constant type is not bool,string or number", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "CONSTANT", "value": [] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if constant has no value defined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "CONSTANT" }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should create a variable", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "VARIABLE", "name":"BTC" }')
        assert.deepEqual(factory.createValue(parsed), new Variable("BTC"));
    });

    it("should return error if variable name is not defined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "VARIABLE" }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if variable name is not a string", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "VARIABLE", "name":10 }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should create a wallet type", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "WALLET", "symbol":"BTC" }')
        assert.deepEqual(factory.createValue(parsed), new WalletType("BTC"));
    });

    it("should return error if wallet symbol is not defined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "WALLET" }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if wallet symbol is not a string", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "WALLET", "symbol":10 }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should create a wallet type", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "WALLET", "symbol":"BTC" }')
        assert.deepEqual(factory.createValue(parsed), new WalletType("BTC"));
    });

    it("should return error if wallet symbol is not defined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "WALLET" }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if wallet symbol is not a string", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type" : "WALLET", "symbol":10 }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should create a data type", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","symbol":"BTC","from":50,"until":20,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.deepEqual(factory.createValue(parsed), new Data("BTC",50,20,[new Constant(40),new Constant(50)]))
    });

    it("should return error if data symbol is not a string", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","symbol":10,"from":50,"until":20,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if data symbol is undefined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","from":50,"until":20,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if data from is undefined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","symbol":"BTC","until":20,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if data until is undefined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","symbol":"BTC","from":50,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if data from is not a number", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","symbol":"BTC","from":"Hola","until":20,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if data until is not a number", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"DATA","symbol":"BTC","from":50,"until":"S0","default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    

    it("should create a call type", function() {
        const factory = new ValueFactory();
        let arg1 = [new Constant(true),new Constant(false)]
        const call1 = new Call("==",arg1);
        let arg2 = [call1,new Constant(true)]
        const call2 = new Call("DISTINCT",arg2);
        let parsed = JSON.parse('{ "type":"CALL","name":"DISTINCT","arguments":[{ "type":"CALL","name":"==","arguments":[{ "type":"CONSTANT","value":true },{ "type":"CONSTANT","value":false }] },{ "type":"CONSTANT","value":true }] }')
        assert.deepEqual(factory.createValue(parsed), call2)
    });

    it("should return error if call name is undefined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"CALL","arguments":[{ "type":"CALL","name":"==","arguments":[{ "type":"CONSTANT","value":true },{ "type":"CONSTANT","value":false }] },{ "type":"CONSTANT","value":true }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if call name is not a string", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"CALL","name":10,"arguments":[{ "type":"CALL","name":"==","arguments":[{ "type":"CONSTANT","value":true },{ "type":"CONSTANT","value":false }] },{ "type":"CONSTANT","value":true }] }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });

    it("should return error if call arguments are undefined", function() {
        const factory = new ValueFactory();
        let parsed = JSON.parse('{ "type":"CALL","name":"DISTINCT" }')
        assert.throws(()=> {factory.createValue(parsed)}, Error);
    });
    

})