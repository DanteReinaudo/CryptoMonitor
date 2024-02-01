const assert = require("assert");
const {describe} = require("mocha");
import { Coin } from '../classes/context/coin';
import { Operation } from '../classes/utils/comparer';
import { State } from '../classes/utils/comparer';
import { Comparer } from '../classes/utils/comparer';
import { Wallet } from '../classes/context/wallet';

describe("comparer",function(){

    it("should be a not null after create it", function() {
        const comparer = new Comparer();
        assert.notDeepEqual(comparer, null);
    });

    it("should return Not Operable for a coin that dont is on Wallet", function() {
        const comparer = new Comparer();
        const wallet = new Wallet();
        assert.deepEqual(comparer.compareAmountCoinValueOnWallet("crypto",wallet,10), Operation.NotOperable);
    });

    it("should return Not Operable for a coin that his amount on wallet is less than value", function() {
        const comparer = new Comparer();
        const wallet = new Wallet();
        wallet.addAmount("crypto",6)
        assert.deepEqual(comparer.compareAmountCoinValueOnWallet("crypto",wallet,10), Operation.NotOperable);
    });

    it("should return Not Operable for a coin that his amount on wallet is equal than value", function() {
        const comparer = new Comparer();
        const wallet = new Wallet();
        wallet.addAmount("crypto",5)
        assert.deepEqual(comparer.compareAmountCoinValueOnWallet("crypto",wallet,5), Operation.NotOperable);
    });

    it("should return Operable for a coin that his amount on wallet is greater than value", function() {
        const comparer = new Comparer();
        const wallet = new Wallet();
        wallet.addAmount("crypto",15)
        assert.deepEqual(comparer.compareAmountCoinValueOnWallet("crypto",wallet,10), Operation.Operable);
    });

    it("should return Not Operable for a coin that dont has value on Market", function() {
        const comparer = new Comparer();
        let coin = new Coin("Crypto");
        assert.deepEqual(comparer.compareCoinValueOnMarket(coin,10), Operation.NotOperable);
    });

    it("should return Not Operable for a coin that his value on market is less than value", function() {
        const comparer = new Comparer();
        let coin = new Coin("Crypto");
        let date = new Date();
        coin.addValue(10,date)
        assert.deepEqual(comparer.compareCoinValueOnMarket(coin,15), Operation.NotOperable);
    });

    it("should return Not Operable for a coin that his value on market is equal than value", function() {
        const comparer = new Comparer();
        let coin = new Coin("Crypto");
        let date = new Date();
        coin.addValue(10,date)
        assert.deepEqual(comparer.compareCoinValueOnMarket(coin,10), Operation.NotOperable);
    });

    it("should return Operable for a coin  that his value on market is greater than value", function() {
        const comparer = new Comparer();
        let coin = new Coin("Crypto");
        let date = new Date();
        coin.addValue(15,date)
        assert.deepEqual(comparer.compareCoinValueOnMarket(coin,10), Operation.Operable);
    });


    it("should return Operable for a coin  that his value is greater than other coin value", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        let date1 = new Date();
        coin1.addValue(25,date1)

        let coin2 = new Coin("Ethereum");
        let date2 = new Date();
        coin2.addValue(20,date2)
        assert.deepEqual(comparer.isOperable(coin1,coin2), Operation.Operable);
    });

    it("should return NotOperable for a coin  that his value is greater than other coin value", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        let date1 = new Date();
        coin1.addValue(25,date1)

        let coin2 = new Coin("Ethereum");
        let date2 = new Date();
        coin2.addValue(50,date2)
        assert.deepEqual(comparer.isOperable(coin1,coin2), Operation.NotOperable);
    });

    it("should return NotOperable for a coin  that his value is equal than other coin value", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        let date1 = new Date();
        coin1.addValue(50,date1)

        let coin2 = new Coin("Ethereum");
        let date2 = new Date();
        coin2.addValue(50,date2)
        assert.deepEqual(comparer.isOperable(coin1,coin2), Operation.NotOperable);
    });

    it("should return stable for a two coin with no values", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        let coin2 = new Coin("Ethereum");
        assert.deepEqual(comparer.compareCoinStates(coin1,coin2), State.Stable);
    });

    it("should return Rising from compare a coin with values and another with no values", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        let date1 = new Date();
        coin1.addValue(50,date1)
        let coin2 = new Coin("Ethereum");
        assert.deepEqual(comparer.compareCoinStates(coin1,coin2), State.Rising);
    });

    it("should return Falling from compare a coin with no values and another with values", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        
        let coin2 = new Coin("Ethereum");
        let date2 = new Date();
        coin2.addValue(50,date2)
        assert.deepEqual(comparer.compareCoinStates(coin1,coin2), State.Falling);
    });

    it("should return Stable", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        coin1.addValue(100,new Date())
        coin1.addValue(50,new Date())
        let coin2 = new Coin("Ethereum");
        coin2.addValue(200,new Date())
        coin2.addValue(50,new Date())
        assert.deepEqual(comparer.compareCoinStates(coin1,coin2), State.Stable);
    });

    it("should return Rising", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        coin1.addValue(100,new Date())
        coin1.addValue(1500,new Date())
        let coin2 = new Coin("Ethereum");
        coin2.addValue(200,new Date())
        coin2.addValue(50,new Date())
        assert.deepEqual(comparer.compareCoinStates(coin1,coin2), State.Rising);
    });

    it("should return Rising", function() {
        const comparer = new Comparer();
        let coin1 = new Coin("Crypto");
        coin1.addValue(200,new Date())
        coin1.addValue(5,new Date())
        let coin2 = new Coin("Ethereum");
        coin2.addValue(5,new Date())
        coin2.addValue(10,new Date())
        assert.deepEqual(comparer.compareCoinStates(coin1,coin2), State.Falling);
    });

})