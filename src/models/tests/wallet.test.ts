const assert = require("assert");
const {describe} = require("mocha");
import {Wallet} from '../classes/context/wallet';

describe("wallet",function(){

    it("should be a not null after create it", function() {
        const wallet = new Wallet();
        assert.notDeepEqual(wallet, null);
    });

    it("should be empty after create it", function() {
        const wallet = new Wallet();
        assert.deepEqual(wallet.isEmpty(), true);
    });

    it("should return undefined amount for coin i dont have", function() {
        const wallet = new Wallet();
        assert.deepEqual(wallet.getCoinAmount("Crypto"), undefined);
    });

    it("should be not empty after create it and add amount of currency", function() {
        const wallet = new Wallet();
        wallet.addAmount("Crypto",10)
        assert.deepEqual(wallet.isEmpty(), false);
    });

    it("should be empty after add amount of currency and remove it", function() {
        const wallet = new Wallet();
        wallet.addAmount("Crypto",1)
        wallet.reduceAmount("Crypto",2)
        assert.deepEqual(wallet.isEmpty(), true);
    });

    it("should be not empty after add amount of currency and remove less", function() {
        const wallet = new Wallet();
        wallet.addAmount("Crypto",2)
        wallet.reduceAmount("Crypto",1)
        assert.deepEqual(wallet.isEmpty(), false);
    });

    it("should be return the amount after add amount several times", function() {
        const wallet = new Wallet();
        wallet.addAmount("Crypto",10)
        wallet.addAmount("Crypto",1)
        assert.deepEqual(wallet.getCoinAmount("Crypto"), 11);
    });

    it("should be return the amount after add amount of currency and remove less", function() {
        const wallet = new Wallet();
        wallet.addAmount("Crypto",22)
        wallet.addAmount("Crypto",1)
        wallet.reduceAmount("Crypto",1)
        assert.deepEqual(wallet.getCoinAmount("Crypto"), 22);
    });

    it("should convert to JSON when is empty", function() {
        const wallet = new Wallet();
        assert.deepEqual(wallet.toJSON(), "[]");
    });

    it("should convert to JSON", function() {
        const wallet = new Wallet();
        wallet.addAmount("Crypto",22)
        wallet.addAmount("Eth",1)
        assert.deepEqual(wallet.toJSON(), '[ {"symbol":"Crypto","amount":22},{"symbol":"Eth","amount":1} ]');
    });

})

export {};