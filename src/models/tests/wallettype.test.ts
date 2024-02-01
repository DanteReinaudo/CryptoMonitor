const assert = require("assert");
const {describe} = require("mocha");
import {WalletType} from '../classes/values/wallet';
import { Wallet } from '../classes/context/wallet';


describe("wallet type ",function(){

    it("should be a not null after create it", function() {
        const wallet = new WalletType("BTC");
        assert.notDeepEqual(wallet, null);
    });

    it("should store symbol", function() {
        const wallet = new WalletType("BTC");
        assert.deepEqual(wallet.getSymbol(), "BTC");
    });

    it("should return wallet type", function() {
        const wallet = new WalletType("BTC");
        assert.deepEqual(wallet.type, "WALLET");
    });

    it("should convert to JSON", function() {
        const wallet = new WalletType("btc");
        assert.deepEqual(wallet.toJSON(), '{ "type":"WALLET","symbol":"btc" }');
    });

    it("should execute", function() {
        let wallet = new Wallet()
        wallet.addAmount("BTC",10)
        const wallet_type = new WalletType("BTC");
        assert.deepEqual(wallet_type.execute(wallet), 10);
    });

    it("should return 0 if the variable not found in wallet", function() {
        let wallet = new Wallet()
        wallet.addAmount("ETH",10)
        const wallet_type = new WalletType("BTC");
        assert.deepEqual(wallet_type.execute(wallet), 0);
    });


})