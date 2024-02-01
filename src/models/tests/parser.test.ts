const assert = require("assert");
const fs = require("fs");
const { describe } = require("mocha");
import { parse } from 'path';
import { Coin } from '../classes/context/coin';
import { Market } from '../classes/context/market';
import { Variables } from '../classes/context/variables';
import { Wallet } from '../classes/context/wallet';
import { Action, ActionBuyMarket, ActionSellMarket, ActionSetVariable } from '../classes/rules/action';
import { Rules } from '../classes/rules/rules';
import { Parser } from '../classes/utils/parser';
import { Call } from '../classes/values/call';
import { Constant } from '../classes/values/constant';
import { Data } from '../classes/values/data';
import { Variable } from '../classes/values/variable';
import { WalletType } from '../classes/values/wallet';

describe("parser", function () {

	it("should be not null after create it", function () {
		const parser = new Parser();
        assert.notDeepEqual(parser, null);
	});

    it("should parse a rule ", function () {
		const parser = new Parser();
        let parsed_rule = parser.readRuleFromPath("src/models/tests/json/rule1.json")

        let required = [ "LIMIT_VALUE_BTC/USDT","MAX_VALUE_BTC/USDT"];
        let name = "Escape"
        let condition = new Call("<",[new Call( "LAST", [new Data("BTC/USDT",3600,0,[new Variable("LIMIT_VALUE_BTC/USDT")])]),new Variable("LIMIT_VALUE_BTC/USDT")])
        let action = new ActionSellMarket("BTC/USDT", new WalletType("BTC"))


        let rule = new Rules(required,name,condition,[action])
        assert.deepEqual(parsed_rule, rule);
	});

    it("should parse another rule", function () {
		const parser = new Parser();
        let parsed_rule = parser.readRuleFromPath("src/models/tests/json/rule2.json")

        let required = [ "LAST_SELL_VALUE_BTC/USDT"];
        let name = "Vender si sube 15%"
        let condition = new Call(">",[new Call("*",[new Constant(1.15),new Variable("LAST_SELL_VALUE_BTC/USDT")]),new Call( "LAST", [new Data("BTC/USDT",3600,0,[])])])
        let action1 = new ActionSellMarket("BTC/USDT", new Constant(0.1))
        let action2 = new ActionSetVariable("LAST_SELL_VALUE_BTC/USDT", new Call( "LAST", [new Data("BTC/USDT",3600,0,[])]))

        let rule = new Rules(required,name,condition,[action1,action2])

        assert.deepEqual(parsed_rule, rule);
	});


    it("should parse another rule then conver to json an parse again", function () {
		const parser = new Parser();
        let parsed_rule = parser.readRuleFromPath("src/models/tests/json/rule2.json")

        let required = [ "LAST_SELL_VALUE_BTC/USDT"];
        let name = "Vender si sube 15%"
        let condition = new Call(">",[new Call("*",[new Constant(1.15),new Variable("LAST_SELL_VALUE_BTC/USDT")]),new Call( "LAST", [new Data("BTC/USDT",3600,0,[])])])
        let action1 = new ActionSellMarket("BTC/USDT", new Constant(0.1))
        let action2 = new ActionSetVariable("LAST_SELL_VALUE_BTC/USDT", new Call( "LAST", [new Data("BTC/USDT",3600,0,[])]))
        let rule = new Rules(required,name,condition,[action1,action2])
        let new_json = rule.toJSON()
        let new_rule = parser.convertJsonToRule(new_json)

        
        assert.deepEqual(parsed_rule, new_rule);
	});

    it("should parse variables", function () {
		const parser = new Parser();
        const variable = new Variables();
        variable.setVariable("BTC", 1)
        variable.setVariable("ETH", false)
        variable.setVariable("USD", "YES")
        let json = variable.toJSON()
        let parsed_var = parser.convertJsonToVariables(json)
        assert.deepEqual(parsed_var, variable);
	});

    it("should parse empty variables", function () {
		const parser = new Parser();
        const variable = new Variables();
        let json = variable.toJSON()
        let parsed_var = parser.convertJsonToVariables(json)
        assert.deepEqual(parsed_var, variable);
	});

    it("should parse wallet", function () {
		const parser = new Parser();
        const wallet = new Wallet();
        wallet.addAmount("BTC", 100)
        wallet.addAmount("ETH", 200)
        wallet.addAmount("USD", 150)
        let json = wallet.toJSON()
        let parsed_wallet = parser.convertJsonToWallet(json)
        assert.deepEqual(parsed_wallet, wallet);
	});

    it("should parse empty wallet", function () {
		const parser = new Parser();
        const wallet = new Wallet();
        let json = wallet.toJSON()
        let parsed_var = parser.convertJsonToWallet(json)
        assert.deepEqual(parsed_var, wallet);
	});

    it("should parse market", function () {
		const parser = new Parser();
        const market = new Market();
        let coin1 = new Coin("BTC/USD");
        let coin2 = new Coin("ETH/USD");
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        coin1.addValue(10,date1);
        coin2.addValue(15,date2);

        market.setCoin("BTC/USD", coin1 )
        market.setCoin("ETH/USD", coin2 )
        let json = market.toJSON()
        let parsed_mar = parser.convertJsonToMarket(json)
        assert.deepEqual(parsed_mar, market);
	});

    it("should parse empty market", function () {
		const parser = new Parser();
        const market = new Market();
        let json = market.toJSON()
        let parsed_mar = parser.convertJsonToMarket(json)
        assert.deepEqual(parsed_mar, market);
	});

    it("should validate String", function () {
		const parser = new Parser();
        const type = "string"
        const value = "string"
        assert.deepEqual(parser.validateType(type,value), true);
	});

    it("should validate Boolean true", function () {
		const parser = new Parser();
        const type = "boolean"
        const value = "true"
        assert.deepEqual(parser.validateType(type,value), true);
	});

    it("should validate Boolean false", function () {
		const parser = new Parser();
        const type = "boolean"
        const value = "False"
        assert.deepEqual(parser.validateType(type,value), true);
	});

    it("should validate Number", function () {
		const parser = new Parser();
        const type = "number"
        const value = "10.5"
        assert.deepEqual(parser.validateType(type,value), true);
	});

    it("should not validate string type number", function () {
		const parser = new Parser();
        const type = "number"
        const value = "eskere"
        assert.deepEqual(parser.validateType(type,value), false);
	});

    
})