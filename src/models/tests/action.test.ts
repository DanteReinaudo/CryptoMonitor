const assert = require("assert");
const { describe } = require("mocha");
import { Coin } from '../classes/context/coin';
import { Market } from '../classes/context/market';
import { Variables } from '../classes/context/variables';
import { Wallet } from '../classes/context/wallet';
import { ActionBuyMarket, ActionSellMarket, ActionSetVariable } from '../classes/rules/action';
import { Call } from '../classes/values/call';
import { Constant } from '../classes/values/constant';
import { Variable } from '../classes/values/variable';

describe("action set variable", function () {
    it("should be a not null after create it", function() {
        const action = new ActionSetVariable("BTS",new Constant(10));
        assert.notDeepEqual(action, null);
    });

    it("should return TYPE", function() {
        const action = new ActionSetVariable("BTS",new Constant(10));
        assert.deepEqual(action.type, "SET_VARIABLE");
    });

    it("should retur name", function() {
        const action = new ActionSetVariable("BTS",new Constant(10));
        assert.deepEqual(action.name, "BTS");
    });

    it("should initialize", function() {
        const action = new ActionSetVariable("BTS",new Constant(10));
        assert.deepEqual(action.value, new Constant(10));
    });

    it("should convert to JSON", function() {
        const action = new ActionSetVariable("BTS",new Constant(10));
        assert.deepEqual(action.toJSON(), '{ "type":"SET_VARIABLE","name":"BTS","value":{ "type":"CONSTANT","value":10 } }');
    });

    it("should execute", function() {
        let variables = new Variables();
        variables.setVariable("False",false)
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        market.setCoin(coin.getName(),coin)
        let arg = [new Constant(true),new Variable("False")]
        const call = new Call("OR",arg);
        const action = new ActionSetVariable("BTS",call);   
        action.execute(variables,market,wallet)
        assert.deepEqual(variables.getValue("BTS"), true);
    });

})

describe("action buy market", function () {
    it("should be a not null after create it", function() {
        const action = new ActionBuyMarket("BTS",new Constant(10));
        assert.notDeepEqual(action, null);
    });

    it("should return TYPE", function() {
        const action = new ActionBuyMarket("BTS",new Constant(10));
        assert.deepEqual(action.type, "BUY_MARKET");
    });

    it("should return name", function() {
        const action = new ActionBuyMarket("BTS",new Constant(10));
        assert.deepEqual(action.symbol, "BTS");
    });

    it("should initialize", function() {
        const action = new ActionBuyMarket("BTS",new Constant(10));
        assert.deepEqual(action.amount, new Constant(10));
    });

    it("should convert to JSON", function() {
        const action = new ActionBuyMarket("BTS",new Constant(10));
        assert.deepEqual(action.toJSON(), '{ "type":"BUY_MARKET","symbol":"BTS","amount":{ "type":"CONSTANT","value":10 } }');
    });

    it("should execute to usd ", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        wallet.addAmount("USDT",200)
        let coin = new Coin("BTC");
        coin.addValue(2,new Date())
        market.setCoin(coin.getName(),coin)
        const action = new ActionBuyMarket("BTC/USDT",new Constant(100));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 600);
        assert.deepEqual(wallet.getCoinAmount("USDT"), 0);
    });

    it("should execute to other coin", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        wallet.addAmount("USDT",200)
        wallet.addAmount("ETH",200)

        let coin1 = new Coin("BTC");
        coin1.addValue(4,new Date())

        let coin2 = new Coin("ETH");
        coin2.addValue(2,new Date())

        market.setCoin(coin1.getName(),coin1)
        market.setCoin(coin2.getName(),coin2)
        const action = new ActionBuyMarket("BTC/ETH",new Constant(50));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 550);
        assert.deepEqual(wallet.getCoinAmount("USDT"), 200);
        assert.deepEqual(wallet.getCoinAmount("ETH"), 175);
    });

    it("should not execute if not sufficient amount", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        wallet.addAmount("USDT",50)
        let coin = new Coin("BTC");
        coin.addValue(2,new Date())
        market.setCoin(coin.getName(),coin)
        const action = new ActionBuyMarket("BTC/USDT",new Constant(150));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 500);
        assert.deepEqual(wallet.getCoinAmount("USDT"), 50);
    });

    it("should not execute if not compared value", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        let coin = new Coin("BTC");
        coin.addValue(2,new Date())
        const action = new ActionBuyMarket("BTC/USDT",new Constant(150));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 500);
    });


})

describe("action sell market", function () {

    it("should be a not null after create it", function() {
        const action = new ActionSellMarket("BTS",new Constant(10));
        assert.notDeepEqual(action, null);
    });

    it("should return TYPE", function() {
        const action = new ActionSellMarket("BTS",new Constant(10));
        assert.deepEqual(action.type, "SELL_MARKET");
    });

    it("should retur name", function() {
        const action = new ActionSellMarket("BTS",new Constant(10));
        assert.deepEqual(action.symbol, "BTS");
    });

    it("should initialize", function() {
        const action = new ActionSellMarket("BTS",new Constant(10));
        assert.deepEqual(action.amount, new Constant(10));
    });

    it("should convert to JSON", function() {
        const action = new ActionSellMarket("BTS",new Constant(10));
        assert.deepEqual(action.toJSON(), '{ "type":"SELL_MARKET","symbol":"BTS","amount":{ "type":"CONSTANT","value":10 } }');
    });

    it("should execute", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        wallet.addAmount("USDT",200)
        let coin = new Coin("BTC");
        coin.addValue(2,new Date())
        market.setCoin(coin.getName(),coin)
        const action = new ActionSellMarket("BTC/USDT",new Constant(150));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 350);
        assert.deepEqual(wallet.getCoinAmount("USDT"), 500);
    });

    it("should not execute if not sufficient amount", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",50)
        wallet.addAmount("USDT",500)
        let coin = new Coin("BTC");
        coin.addValue(2,new Date())
        market.setCoin(coin.getName(),coin)
        const action = new ActionSellMarket("BTC/USDT",new Constant(150));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 50);
        assert.deepEqual(wallet.getCoinAmount("USDT"), 500);
    });

    it("should not execute if not compared value", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        let coin = new Coin("BTC");
        coin.addValue(2,new Date())
        market.setCoin(coin.getName(),coin)
        const action = new ActionSellMarket("USD/BTC",new Constant(150));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 500);
    });

    it("should execute to other coin", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",500)
        wallet.addAmount("USDT",200)
        wallet.addAmount("ETH",200)

        let coin1 = new Coin("BTC");
        coin1.addValue(4,new Date())

        let coin2 = new Coin("ETH");
        coin2.addValue(2,new Date())

        market.setCoin(coin1.getName(),coin1)
        market.setCoin(coin2.getName(),coin2)
        const action = new ActionSellMarket("BTC/ETH",new Constant(50));   
        action.execute(variables,market,wallet)

        assert.deepEqual(wallet.getCoinAmount("BTC"), 450);
        assert.deepEqual(wallet.getCoinAmount("USDT"), 200);
        assert.deepEqual(wallet.getCoinAmount("ETH"), 225);
    });

})