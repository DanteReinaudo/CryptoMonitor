const assert = require("assert");
const {describe} = require("mocha");
import {Variables} from '../classes/context/variables';

describe("variables",function(){

    it("should be not null after create it", function() {
        const vars = new Variables();
        assert.notDeepEqual(vars, null);
    });

    it("should be empty after create it", function() {
        const vars = new Variables();
        assert.deepEqual(vars.isEmpty(), true);
    });

    it("should be not empty after adding a variable", function() {
        const vars = new Variables();
        vars.setVariable("Minimo",2);
        assert.deepEqual(vars.isEmpty(), false);
    });

    it("should return the value of a variable", function() {
        const vars = new Variables();
        vars.setVariable("Minimo",2);
        assert.deepEqual(vars.getValue("Minimo"), 2);
    });

    it("should store numbers", function() {
        const vars = new Variables();
        vars.setVariable("Minimo",2);
        vars.setVariable("Maximo",10);
        assert.deepEqual(vars.getValue("Minimo"), 2);
        assert.deepEqual(vars.getValue("Maximo"), 10);
    });

    it("should store strings", function() {
        const vars = new Variables();
        vars.setVariable("Saludo","Hola");
        vars.setVariable("Despido","Chau");
        assert.deepEqual(vars.getValue("Saludo"), "Hola");
        assert.deepEqual(vars.getValue("Despido"), "Chau");
    });

    it("should store booleans", function() {
        const vars = new Variables();
        vars.setVariable("Verdadero",true);
        vars.setVariable("Falso",false);
        assert.deepEqual(vars.getValue("Verdadero"), true);
        assert.deepEqual(vars.getValue("Falso"), false);
    });

    it("should return error if the type is not a bool, number or string", function() {
        const vars = new Variables();
        assert.throws(()=> {vars.setVariable("Hola",new Date())}, Error, 'Variable must have a string, bool or number type.');
    });

    it("should store different value types", function() {
        const vars = new Variables();
        vars.setVariable("Verdadero",true);
        vars.setVariable("Despido","Chau");
        vars.setVariable("Maximo",10);
        assert.deepEqual(vars.getValue("Despido"), "Chau");
        assert.deepEqual(vars.getValue("Verdadero"), true);;
        assert.deepEqual(vars.getValue("Maximo"), 10);
    });

    it("should return undefined for a variable that dont know", function() {
        const vars = new Variables();
        assert.deepEqual(vars.getValue("Despido"), undefined);
    });

    it("should return undefined for a variable that is deleted", function() {
        const vars = new Variables();
        vars.setVariable("Maximo",10);
        vars.deleteVariable("Maximo")
        assert.deepEqual(vars.getValue("Maximo"), undefined);
    });

    it("should convert to JSON when is empty", function() {
        const variable = new Variables();
        assert.deepEqual(variable.toJSON(), "[]");
    });

    it("should convert to JSON with booleans", function() {
        const variable = new Variables();
        variable.setVariable("BTC", true)
        assert.deepEqual(variable.toJSON(), '[ {"name":"BTC","value":true} ]');
    });

    it("should convert to JSON with strings", function() {
        const variable = new Variables();
        variable.setVariable("BTC", "true")
        assert.deepEqual(variable.toJSON(), '[ {"name":"BTC","value":"true"} ]');
    });

    it("should convert to JSON with numbers", function() {
        const variable = new Variables();
        variable.setVariable("BTC", 1)
        assert.deepEqual(variable.toJSON(), '[ {"name":"BTC","value":1} ]');
    });


    it("should convert to JSON with different types", function() {
        const variable = new Variables();
        variable.setVariable("BTC", 1)
        variable.setVariable("ETH", false)
        variable.setVariable("USD", "YES")
        assert.deepEqual(variable.toJSON(), '[ {"name":"BTC","value":1},{"name":"ETH","value":false},{"name":"USD","value":"YES"} ]');
    });

});