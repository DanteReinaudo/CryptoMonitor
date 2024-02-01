const assert = require("assert");
const {describe} = require("mocha");


import { ActionBuyMarket, ActionSellMarket, ActionSetVariable } from '../classes/rules/action';
import { ActionFactory } from '../classes/rules/action_factory';
import { Constant } from '../classes/values/constant';

describe("action factory",function(){

    it("should be a not null after create it", function() {
        const factory = new ActionFactory();
        assert.notDeepEqual(factory, null);
    });

    it("should return error if type is undefined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    });

    it("should return error if type is not recognized", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type" : "CONSTANT", "value":10  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should create action Buy Market", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"BUY_MARKET","symbol":"TDD/USDT","amount":{"type":"CONSTANT","value":12}  }')
        assert.deepEqual(factory.createAction(parsed), new ActionBuyMarket("TDD/USDT",new Constant(12)));
    })

    it("should return error if Buy Market symbol is not defined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"BUY_MARKET","amount":{"type":"CONSTANT","value":12}  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should return error if Buy Market amount is not defined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"BUY_MARKET","symbol":"TDD/USDT"  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should return error if Buy Market symbol is not string", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"BUY_MARKET","symbol":20,"amount":{"type":"CONSTANT","value":12}  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should create action Sell Market", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SELL_MARKET","symbol":"TDD/USDT","amount":{"type":"CONSTANT","value":12}  }')
        assert.deepEqual(factory.createAction(parsed), new ActionSellMarket("TDD/USDT",new Constant(12)));

    })

    it("should return error if Sell Market symbol is not defined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SELL_MARKET","amount":{"type":"CONSTANT","value":12}  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should return error if Sell Market amount is not defined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SELL_MARKET","symbol":"TDD/USDT"  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should return error if Sell Market symbol is not string", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SELL_MARKET","symbol":20,"amount":{"type":"CONSTANT","value":12}  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should create action Set Variable", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SET_VARIABLE","name":"ValorMinimoTDD","value":{"type":"CONSTANT","value":12}  }')
        assert.deepEqual(factory.createAction(parsed), new ActionSetVariable("ValorMinimoTDD",new Constant(12)));

    })

    it("should return error if Set Variable name is not defined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SET_VARIABLE","value":{"type":"CONSTANT","value":12}  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should return error if Set Variable value is not defined", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SET_VARIABLE","name":"TDD/USDT"  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })

    it("should return error if Set Variable symbol is not string", function() {
        const factory = new ActionFactory();
        let parsed = JSON.parse('{ "type":"SET_VARIABLE","name":20,"value":{"type":"CONSTANT","value":12}  }')
        assert.throws(()=> {factory.createAction(parsed)}, Error);
    })
})