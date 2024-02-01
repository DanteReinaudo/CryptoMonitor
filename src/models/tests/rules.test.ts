const assert = require("assert");
const { describe } = require("mocha");
import { Rules } from '../classes/rules/rules';
import { Action, ActionSellMarket, ActionBuyMarket, ActionSetVariable } from '../classes/rules/action';
import { Coin } from '../classes/context/coin';
import { Wallet } from '../classes/context/wallet';
import { Constant } from '../classes/values/constant';
import { WalletType } from '../classes/values/wallet';
import { Variables } from '../classes/context/variables';
import { Market } from '../classes/context/market';

describe("rules", function () {

	it("should be not null after create a rule", function () {
		let name = "Vender si sube 15%";
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		const action = new ActionSellMarket("BTC/USDT", new Constant(50) )
		let actions: Action[] = []
		actions.push(action)
		const rules = new Rules(requiredVariable,name, condition, actions);
		assert.notDeepEqual(rules, null);
	});

	it("should store name", function () {
		let name = "Vender si sube 15%";
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		const action = new ActionSellMarket("BTC/USDT", new Constant(50) )
		let actions: Action[] = []
		actions.push(action)
		const rules = new Rules(requiredVariable,name, condition, actions);
		assert.deepEqual(rules.name, name);
	});

	it("should store required variable", function () {
		let name = "Vender si sube 15%";
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		const action = new ActionSellMarket("BTC/USDT", new Constant(50) )
		let actions: Action[] = []
		actions.push(action)
		const rules = new Rules(requiredVariable,name, condition, actions);
		assert.deepEqual(rules.requiredVariables, requiredVariable);
	});

	it("should store condition", function () {
		let name = "Vender si sube 15%";
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		const action = new ActionSellMarket("BTC/USDT", new Constant(50) )
		let actions: Action[] = []
		actions.push(action)
		const rules = new Rules(requiredVariable,name, condition, actions);
		assert.deepEqual(rules.condition, condition);
	});

	it("should store action", function () {
		let name = "Vender si sube 15%";
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		const action = new ActionSellMarket("BTC/USDT", new Constant(50) )
		let actions: Action[] = []
		actions.push(action)
		const rules = new Rules(requiredVariable,name, condition, actions);
		assert.deepEqual(rules.actions, actions);
	});

	it("should return error if has no actions", function () {
		let name = "Vender si sube 15%";
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		let actions: Action[] = []
		assert.throws(()=> {new Rules(requiredVariable,name, condition, actions)}, Error);
	});

	it("should execute", function () {
		let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
		wallet.addAmount("BTC",100)
		let coin = new Coin("BTC")
		coin.addValue(1,new Date())
		market.setCoin("BTC",coin)
		let name = "Vender todo el bitcoin";	
		let requiredVariable: string[] = []
		let condition = new Constant(true)
		let actions: Action[] = [new ActionSellMarket("BTC/USDT",new WalletType("BTC"))]
		let rule = new Rules(requiredVariable,name, condition, actions);
		rule.apply(variables,market,wallet)
		
		assert.deepEqual(wallet.getCoinAmount("BTC"),0 );
		assert.deepEqual(wallet.getCoinAmount("USDT"),100 );

	});

	/*

	it("Check if a rule is applied with a given action", function () {
		const tdd_coin = new Coin("TDD");
		const wallet = new Wallet();
		wallet.addAmount("USDT", 10)
		let name = "Comprar 12 TDD/USDT siempre";
		let condition = { type: "CONSTANT", value: true }
		const action = [new ActionBuyMarket("TDD/USDT", { type: "CONSTANT", value: 12 })]
		const rules = new Rules(name, condition, action);
		assert.deepEqual(rules.itsApplied(wallet, tdd_coin), true);
	});


	it("Check if a wallet reduces its amount when a rule is applied with a given action", function () {
		const tdd_coin = new Coin("TDD");
		const wallet = new Wallet();
		wallet.addAmount("USDT", 10)
		let name = "Comprar 12 TDD/USDT siempre";
		let condition = { type: "CONSTANT", value: true }
		const action = [new ActionBuyMarket("TDD/USDT", { type: "CONSTANT", value: 12 })]
		const rules = new Rules(name, condition, action);
		assert.deepEqual(wallet.getCoinAmount("USDT"), 10);
	});

	it("Check if a rule is applied with a given action of sell", function () {
		const tdd_coin = new Coin("TDD");
		let date = new Date("2022-03-18");
		tdd_coin.addValue(10, date);
		const wallet = new Wallet();
		wallet.addAmount("TDD", 10)
		let name = "Vender 10 TDD/USDT siempre";
		let condition = { type: "CONSTANT", value: true }
		const action = [new ActionSellMarket("TDD/USDT", { type: "CONSTANT", value: 10 })]
		const rules = new Rules(name, condition, action);
		assert.deepEqual(rules.itsApplied(wallet, tdd_coin), true);
	});

	it("Should return a new value coin", function () {
		const usdt_coin = new Coin("USDT");
		let date = new Date("2022-03-18");
		usdt_coin.addValue(10, date);
		const wallet = new Wallet();
		wallet.addAmount("TDD", 10)
		let name = "Vender 10 TDD/USDT siempre";
		let condition = { type: "CONSTANT", value: true }
		const action = [new ActionSellMarket("TDD/USDT", { type: "CONSTANT", value: 10 })]
		const rules = new Rules(name, condition, action);
		rules.itsApplied(wallet, usdt_coin);
		assert.deepEqual(wallet.getCoinAmount("USDT"), 100);
	});

	it("A rule should not apply if not enough credit to buy", function () {
		const tdd_coin = new Coin("TDD");
		let date = new Date("2022-03-18");
		tdd_coin.addValue(10, date);
		const wallet = new Wallet();
		wallet.addAmount("USDT", 10);
		let name = "Comprar 12 TDD/USDT siempre";
		let condition = { type: "CONSTANT", value: true }
		const action = [new ActionBuyMarket("TDD/USDT", { type: "CONSTANT", value: 12 })]
		const rules = new Rules(name, condition, action);
		assert.deepEqual(rules.itsApplied(wallet, tdd_coin), false);
	});

	it("An error should be thrown when trying to operate with an invalid operator", function () {
		const value = {
			type: "CALL",
			name: "|",
			arguments: [
				{
					type: "CONSTANT",
					value: 1.15
				},
				{
					type: "CONSTANT",
					value: 23
				}
			]
		}
		const action = new ActionSetVariable("LAST_SELL_VALUE_BTC/USDT", value);
		assert.throws(() => { action.implement_call() }, Error, 'Invalid operator');
	});

	it("Should return the vector's sum when using +", function () {
		const value = {
			type: "CALL",
			name: "+",
			arguments: [
				{
					type: "CONSTANT",
					value: 25
				},
				{
					type: "CONSTANT",
					value: 23
				}
			]
		}
		const action = new ActionSetVariable("LAST_SELL_VALUE_BTC/USDT", value);
		assert.deepEqual(action.implement_call(), 48);
	});

	it("An error should be thrown when trying to operate with another type", function () {
		const value = {
			type: "WALLET",
			name: "|",
			arguments: [
				{
					type: "CONSTANT",
					value: 1.15
				},
				{
					type: "CONSTANT",
					value: 23
				}
			]
		}
		const action = new ActionSetVariable("LAST_SELL_VALUE_BTC/USDT", value);
		assert.throws(() => { action.implement_call() }, Error, 'Not valid operation');
	});
*/
})