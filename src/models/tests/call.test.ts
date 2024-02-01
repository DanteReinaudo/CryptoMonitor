const assert = require("assert");
const {describe} = require("mocha");
import { deepEqual } from 'assert';
import { Market } from '../classes/context/market';
import {Call} from '../classes/values/call';
import { Constant } from '../classes/values/constant';
import { Value } from '../classes/values/value';
import { Variable } from '../classes/values/variable';
import { Variables } from '../classes/context/variables';
import { Wallet } from '../classes/context/wallet';

describe("call",function(){

    it("should be a not null after create it", function() {
        let arg = [new Constant(10),new Constant(20)]
        const call = new Call("<",arg);
        assert.notDeepEqual(call, null);
    });

    it("should trow error if arguments is empty", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg: Array<Value> = []
        const call = new Call("==",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should trow error invalid operator", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg: Array<Value> = []
        const call = new Call("XD",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute == with numbers and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20)]
        const call = new Call("==",arg);
        assert.deepEqual(call.execute(variables,market,wallet), false);
    });

    it("should execute == with numbers and be true", function() {
        let variables = new Variables();
        variables.setVariable("BTC",20)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(20),new Constant(20),new Variable("BTC")]
        const call = new Call("==",arg);
        assert.deepEqual(call.execute(variables,market,wallet), true);
    });

    it("should execute == with booleans and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true),new Constant(false)]
        const call = new Call("==",arg);
        assert.deepEqual(call.execute(variables,market,wallet), false);
    });

    it("should execute == with booleans and be true", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false),new Constant(false),new Variable("False")]
        const call = new Call("==",arg);
        assert.deepEqual(call.execute(variables,market,wallet), true);
    });

    it("should execute == and return error if the values arent boolean[] or number []", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Constant(10),new Variable("False")]
        const call = new Call("==",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute == and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola")]
        const call = new Call("==",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });


    it("should execute DISTINCT with numbers and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20)]
        const call = new Call("DISTINCT",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute DISTINCT with numbers and be true", function() {
        let variables = new Variables();
        variables.setVariable("BTC",20)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(20),new Constant(20),new Variable("BTC")]
        const call = new Call("DISTINCT",arg);
        assert.deepEqual(call.execute(variables,market,wallet), false);
    });

    it("should execute DISTINCT with booleans and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true),new Constant(false)]
        const call = new Call("DISTINCT",arg);
        assert.deepEqual(call.execute(variables,market,wallet), true);
    });

    it("should execute DISTINCT with values and be true", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false),new Constant(false),new Variable("False")]
        const call = new Call("DISTINCT",arg);
        assert.deepEqual(call.execute(variables,market,wallet), false);
    });

    it("should execute DISTINCT and return error if the values arent boolean[] or number []", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Constant(10),new Variable("False")]
        const call = new Call("DISTINCT",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute DISTINCT and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola")]
        const call = new Call("DISTINCT",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute < with numbers and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20),new Constant(10)]
        const call = new Call("<",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute < with numbers and be true", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20),new Constant(30)]
        const call = new Call("<",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute < and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("<",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute < and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call("<",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute <= with numbers and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20),new Constant(10)]
        const call = new Call("<=",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute <= with numbers and be true", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20),new Constant(20)]
        const call = new Call("<=",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });


    it("should execute <= and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("<=",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute <= and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call("<=",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });


    it("should execute > with numbers and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20),new Constant(10)]
        const call = new Call(">",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute > with numbers and be true", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(50),new Constant(20),new Constant(10)]
        const call = new Call(">",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute > and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call(">",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute > and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call(">",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute >= with numbers and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20),new Constant(10)]
        const call = new Call(">=",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute >= with numbers and be true", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(50),new Constant(20),new Constant(20)]
        const call = new Call(">=",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute >= and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call(">=",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute >= and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call(">=",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute NEGATE with positive number", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10)]
        const call = new Call("NEGATE",arg);
        assert.deepEqual(call.execute(variables,market,wallet),-10);
    });

    it("should execute NEGATE with negative number", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(-50)]
        const call = new Call("NEGATE",arg);
        assert.deepEqual(call.execute(variables,market,wallet),50);
    });

    it("should execute NEGATE and return error if the value isnt a number", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola")]
        const call = new Call("NEGATE",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute NEGATE and return error if the values has length greater than 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1),new Constant(2)]
        const call = new Call("NEGATE",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute NOT with true", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true)]
        const call = new Call("NOT",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute NOT with false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false)]
        const call = new Call("NOT",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute NOT and return error if the value isnt a bool", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola")]
        const call = new Call("NOT",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute NOT and return error if the values has length greater than 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true),new Constant(false)]
        const call = new Call("NOT",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute - and be negative ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20)]
        const call = new Call("-",arg);
        assert.deepEqual(call.execute(variables,market,wallet),-10);
    });

    it("should execute - and be positve", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(50),new Constant(20)]
        const call = new Call("-",arg);
        assert.deepEqual(call.execute(variables,market,wallet),30);
    });

    it("should execute - and be 0", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(10)]
        const call = new Call("-",arg);
        assert.deepEqual(call.execute(variables,market,wallet),0);
    });

    it("should execute - and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("-",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute - and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call("-",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute - and return error if the values has length > 2", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1),new Constant(1),new Constant(3)]
        const call = new Call("-",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute / and be greater than 1 ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(20),new Constant(10)]
        const call = new Call("/",arg);
        assert.deepEqual(call.execute(variables,market,wallet),2);
    });

    it("should execute / and be lower than 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(20)]
        const call = new Call("/",arg);
        assert.deepEqual(call.execute(variables,market,wallet),0.5);
    });

    it("should execute / and be 0", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(0),new Constant(10)]
        const call = new Call("/",arg);
        assert.deepEqual(call.execute(variables,market,wallet),0);
    });

    it("should execute / and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("/",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute / and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call("/",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute / and return error if the values has length > 2", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1),new Constant(1),new Constant(3)]
        const call = new Call("/",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute / and return error if the divisor is 0", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1),new Constant(0)]
        const call = new Call("/",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute + and be negative ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(-20),new Constant(-10)]
        const call = new Call("+",arg);
        assert.deepEqual(call.execute(variables,market,wallet),-20);
    });

    it("should execute + and be positve", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(50),new Constant(20)]
        const call = new Call("+",arg);
        assert.deepEqual(call.execute(variables,market,wallet),70);
    });

    it("should execute + and be 0", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(-10),new Constant(10)]
        const call = new Call("+",arg);
        assert.deepEqual(call.execute(variables,market,wallet),0);
    });

    it("should execute + and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("+",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute + and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call("+",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute * and be negative ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(10),new Constant(-2),new Constant(10)]
        const call = new Call("*",arg);
        assert.deepEqual(call.execute(variables,market,wallet),-200);
    });

    it("should execute * and be positve", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(5),new Constant(20)]
        const call = new Call("*",arg);
        assert.deepEqual(call.execute(variables,market,wallet),100);
    });

    it("should execute * and be 0", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(0),new Constant(10)]
        const call = new Call("*",arg);
        assert.deepEqual(call.execute(variables,market,wallet),0);
    });

    it("should execute * and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("*",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute * and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(1)]
        const call = new Call("*",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute MIN", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(150),new Constant(0),new Constant(10)]
        const call = new Call("MIN",arg);
        assert.deepEqual(call.execute(variables,market,wallet),0);
    });

    it("should execute MIN and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("MIN",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute MAX", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(150),new Constant(0),new Constant(10)]
        const call = new Call("MAX",arg);
        assert.deepEqual(call.execute(variables,market,wallet),150);
    });

    it("should execute MAX and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("MAX",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute FIRST", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(150),new Constant(0),new Constant(10)]
        const call = new Call("FIRST",arg);
        assert.deepEqual(call.execute(variables,market,wallet),150);
    });

    it("should execute FIRST and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("FIRST",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute LAST", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(150),new Constant(0),new Constant(10)]
        const call = new Call("LAST",arg);
        assert.deepEqual(call.execute(variables,market,wallet),10);
    });

    it("should execute LAST and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("LAST",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute AVERAGE", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(150),new Constant(100),new Constant(200)]
        const call = new Call("AVERAGE",arg);
        assert.deepEqual(call.execute(variables,market,wallet),150);
    });

    it("should execute AVERAGE with 1 value", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(200)]
        const call = new Call("AVERAGE",arg);
        assert.deepEqual(call.execute(variables,market,wallet),200);
    });

    it("should execute AVERAGE and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("AVERAGE",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute STDDEV", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(150),new Constant(100),new Constant(200)]
        const call = new Call("STDDEV",arg);
        assert.deepEqual(call.execute(variables,market,wallet),40.824829046386306);
    });

    it("should execute STDDEV with 1 value and return error ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(200)]
        const call = new Call("STDDEV",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute STDDEV and return error if the values arent number[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("STDDEV",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute AND and be true ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true),new Constant(true),new Constant(true)]
        const call = new Call("AND",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute AND and be false I", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false),new Constant(true),new Constant(true)]
        const call = new Call("AND",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute AND and be false II", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false),new Constant(false),new Constant(false)]
        const call = new Call("AND",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute AND and return error if the values arent boolean[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("AND",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute AND and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true)]
        const call = new Call("AND",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute OR and be true I", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true),new Constant(true),new Constant(true)]
        const call = new Call("OR",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute OR and be true II", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false),new Constant(true),new Constant(false)]
        const call = new Call("OR",arg);
        assert.deepEqual(call.execute(variables,market,wallet),true);
    });

    it("should execute OR and be false", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(false),new Constant(false),new Constant(false)]
        const call = new Call("OR",arg);
        assert.deepEqual(call.execute(variables,market,wallet),false);
    });

    it("should execute OR and return error if the values arent boolean[]", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant("Hola"),new Variable("False")]
        const call = new Call("OR",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should execute OR and return error if the values has length 1", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let arg = [new Constant(true)]
        const call = new Call("OR",arg);
        assert.throws(()=> {call.execute(variables,market,wallet)}, Error);
    });

    it("should convert to JSON", function() {
        let arg1 = [new Constant(true),new Constant(false)]
        const call1 = new Call("==",arg1);
        let arg2 = [call1,new Constant(true)]
        const call2 = new Call("DISTINCT",arg2);
        assert.deepEqual(call2.toJSON(),'{ "type":"CALL","name":"DISTINCT","arguments":[{ "type":"CALL","name":"==","arguments":[{ "type":"CONSTANT","value":true },{ "type":"CONSTANT","value":false }] },{ "type":"CONSTANT","value":true }] }')
    });


})