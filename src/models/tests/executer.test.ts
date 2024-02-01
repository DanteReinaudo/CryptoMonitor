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
import { Executer } from '../classes/utils/executer';
import { WalletType } from '../classes/values/wallet';
import { Data } from '../classes/values/data';
import { Coin } from '../classes/context/coin';


describe("executer",function(){

    it("should be a not null after create it", function() {
        const executer = new Executer();
        assert.notDeepEqual(executer, null);
    });

    it("should execute a number constant", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        const executer = new Executer();
        let constant = new Constant(10)
        assert.deepEqual(executer.execute(constant,variables,market,wallet), 10);
    });

    it("should execute a string constant", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        const executer = new Executer();
        let constant = new Constant("BTC")
        assert.deepEqual(executer.execute(constant,variables,market,wallet), "BTC");
    });

    it("should execute a boolean constant", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        const executer = new Executer();
        let constant = new Constant(true)
        assert.deepEqual(executer.execute(constant,variables,market,wallet), true);
    });

    it("should execute a number variable", function() {
        let variables = new Variables();
        variables.setVariable("BTC",100)
        let market = new Market();
        let wallet = new Wallet();
        const executer = new Executer();
        let variable = new Variable("BTC")
        assert.deepEqual(executer.execute(variable,variables,market,wallet), 100);
    });

    it("should execute a string variable", function() {
        let variables = new Variables();
        variables.setVariable("ETH","Falling")
        let market = new Market();
        let wallet = new Wallet();
        const executer = new Executer();
        let variable = new Variable("ETH")
        assert.deepEqual(executer.execute(variable,variables,market,wallet), "Falling");
    });

    it("should execute a boolean variable", function() {
        let variables = new Variables();
        variables.setVariable("TRUE",true)
        let market = new Market();
        let wallet = new Wallet();
        const executer = new Executer();
        let variable = new Variable("TRUE")
        assert.deepEqual(executer.execute(variable,variables,market,wallet), true);
    });

    it("should execute a wallet type", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",100)
        const wallet_type = new WalletType("BTC");
        const executer = new Executer();
        assert.deepEqual(executer.execute(wallet_type,variables,market,wallet), 100);
    });

    it("should execute a data and return default if has no history", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        let constants = [new Constant(40),new Constant(50)]
        market.setCoin("BTC",coin)
        const data = new Data("BTC",50,20,constants);
        const executer = new Executer();
        assert.deepEqual(executer.execute(data,variables,market,wallet),[40,50])

    });

    it("should execute a DATA and return the history I", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        let actual_date = new Date();
        let date1 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 7200, actual_date.getSeconds())
        let date2 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 5000, actual_date.getSeconds()) 
        let date3 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 300, actual_date.getSeconds())  
        coin.addValue(100,date1)
        coin.addValue(250,date2)
        coin.addValue(400,date3)
        market.setCoin("BTC",coin)
        let constants = [new Constant(40),new Constant(50)]
        const data = new Data("BTC",8500,4500,constants);
        const executer = new Executer();
        assert.deepEqual(executer.execute(data,variables,market,wallet),[100,250])
    });

    it("should excute a DATA and return the history II", function() {
        let variables = new Variables();
        variables.setVariable("50",50)
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        let actual_date = new Date();
        let date1 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 7200, actual_date.getSeconds())
        let date2 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 5000, actual_date.getSeconds()) 
        let date3 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 300, actual_date.getSeconds())  
        coin.addValue(100,date1)
        coin.addValue(250,date2)
        coin.addValue(400,date3)
        market.setCoin("BTC",coin)
        let constants = [new Constant(40),new Variable("50")]
        const data = new Data("BTC",6500,0,constants);
        const executer = new Executer();
        assert.deepEqual(executer.execute(data,variables,market,wallet),[250,400])
    });

    it("should execute a DATA and return the history III", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        let actual_date = new Date();
        let date1 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 7200, actual_date.getSeconds())
        let date2 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 5000, actual_date.getSeconds()) 
        let date3 = new Date(actual_date.getFullYear(), actual_date.getMonth(), actual_date.getDate(), actual_date.getHours(), actual_date.getMinutes() - 300, actual_date.getSeconds())  
        coin.addValue(100,date1)
        coin.addValue(250,date2)
        coin.addValue(400,date3)
        market.setCoin("BTC",coin)
        variables.setVariable("20",20)
        let constants = [new Constant(40),new Variable("20")]
        const data = new Data("BTC",250,10,constants);
        const executer = new Executer();
        assert.deepEqual(executer.execute(data,variables,market,wallet),[40,20])
    });

    it("should execute a call", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
    
        let args = [new Constant(true),new Constant(true)]
        const call = new Call("==",args)

        const executer = new Executer();
        assert.deepEqual(executer.execute(call,variables,market,wallet), true);
    });

    it("should execute a nested call", function() {
        let variables = new Variables();
        variables.setVariable("TEN",10)
        variables.setVariable("TRUE",true)
        let market = new Market();
        let wallet = new Wallet();
        wallet.addAmount("BTC",100)
        let args1 = [new Constant(1), new Constant(5)]
        const call1 = new Call("*",args1);
        let args2 = [new WalletType("BTC"),new Variable("TEN"),call1]
        const call2 = new Call(">",args2);
        let args3 = [new Variable("TRUE"),new Constant(true),call2]
        const call3 = new Call("AND",args3)

        const executer = new Executer();
        assert.deepEqual(executer.execute(call3,variables,market,wallet), true);
    });

})