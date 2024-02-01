const assert = require("assert");
const {describe} = require("mocha");
import {Variable} from '../classes/values/variable';
import { Variables } from '../classes/context/variables';

describe("variable",function(){

    it("should be a not null after create it", function() {
        const variable = new Variable("Variable");
        assert.notDeepEqual(variable, null);
    });

    it("should store string", function() {
        const variable = new Variable("Hola");
        assert.deepEqual(variable.getName(), "Hola");
    });

    it("should return variable type", function() {
        const variable = new Variable("BTC");
        assert.deepEqual(variable.type, "VARIABLE");
    });

    it("should convert to JSON", function() {
        const variable= new Variable("btc");
        assert.deepEqual(variable.toJSON(), '{ "type":"VARIABLE","name":"btc" }');
    });

    it("should execute", function() {
        let variables = new Variables()
        variables.setVariable("BTC",10)
        const variable = new Variable("BTC");
        assert.deepEqual(variable.execute(variables), 10);
    });

    it("should return error if the variable not found in dict", function() {
        let variables = new Variables()
        variables.setVariable("ETH",10)
        const variable = new Variable("BTC");
        assert.throws(()=> {variable.execute(variables)}, Error, 'Variable: ETH not found.');
    });


})