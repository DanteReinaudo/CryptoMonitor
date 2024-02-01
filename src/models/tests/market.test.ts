const assert = require("assert");
const {describe} = require("mocha");
import { Coin } from '../classes/context/coin';
import {Market} from '../classes/context/market';

describe("market",function(){

    it("should be not null after create it", function() {
        const market = new Market();
        assert.notDeepEqual(market, null);
    });

    it("should be empty after create it", function() {
        const market = new Market();
        assert.deepEqual(market.isEmpty(), true);
    });

    it("should be not empty after adding a variable", function() {
        const market = new Market();
        market.setCoin("BTC/USDT", new Coin("BTC/USDT"));
        assert.deepEqual(market.isEmpty(), false);
    });

    it("should return the value of a variable", function() {
        const market = new Market();
        let coin = new Coin("BTC/USDT");
        market.setCoin("BTC/USDT", coin )
        assert.deepEqual(market.getCoin("BTC/USDT"), coin);
    });

    it("should store coins", function() {
        const market = new Market();
        let coin1 = new Coin("BTC/USDT");
        let coin2 = new Coin("ETH/USDT");
        market.setCoin("BTC/USDT", coin1 )
        market.setCoin("ETH/USDT", coin2 )
        assert.deepEqual(market.getCoin("BTC/USDT"), coin1);
        assert.deepEqual(market.getCoin("ETH/USDT"), coin2);
    });


    it("should return undefined for a COIN that dont know", function() {
        const market = new Market();
        assert.deepEqual(market.getCoin("BTC/USDT"), undefined);
    });

    it("should return undefined for a coin that is deleted", function() {
        const market = new Market();
        let coin = new Coin("BTC/USDT");
        market.setCoin("BTC/USDT",coin);
        market.deleteCoin("BTC/USDT");
        assert.deepEqual(market.getCoin("BTC/USDT"), undefined);
    });

    it("should return the coin reference", function() {
        const market = new Market();
        let coin1 = new Coin("BTC/USDT");
        market.setCoin("BTC/USDT",coin1);
        let coin2 = market.getCoin("BTC/USDT")
        let date = new Date()
        coin2.addValue(10,date);
        assert.deepEqual(market.getCoin("BTC/USDT").getCurrentValue(), 10);
    });

    it("should convert to JSON when is empty", function() {
        const market = new Market();
        assert.deepEqual(market.toJSON(), "[]");
    });


    it("should convert to JSON with empty coin", function() {
        const market = new Market();
        let coin1 = new Coin("BTC/USDT");
        let coin2 = new Coin("ETH/USDT");
        market.setCoin("BTC/USDT", coin1 )
        market.setCoin("ETH/USDT", coin2 )

        assert.deepEqual(market.toJSON(),'[ { "name":"BTC/USDT","values":[] },{ "name":"ETH/USDT","values":[] } ]'
        );
    });

    it("should convert to JSON with coin with values", function() {
        const market = new Market();
        let coin1 = new Coin("BTC/USD");
        let coin2 = new Coin("ETH/USD");
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        coin1.addValue(10,date1);
        coin2.addValue(15,date2);

        market.setCoin("BTC/USDT", coin1 )
        market.setCoin("ETH/USDT", coin2 )

        let expected =  '[ '.concat(coin1.toJSON(),",",coin2.toJSON(), " ]")
        
        assert.deepEqual(market.toJSON(),expected);



    });

});