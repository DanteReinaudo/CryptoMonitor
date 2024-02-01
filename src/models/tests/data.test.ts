const assert = require("assert");
const {describe} = require("mocha");
import { Coin } from '../classes/context/coin';
import { Market } from '../classes/context/market';
import { Constant } from '../classes/values/constant';
import {Data} from '../classes/values/data';
import { Variable } from '../classes/values/variable';
import { Variables } from '../classes/context/variables';
import { Wallet } from '../classes/context/wallet';

describe("data",function(){

    it("should be a not null after create it", function() {
        const data = new Data("BTC",50,20,[new Constant(40)]);
        assert.notDeepEqual(data, null);
    });

    it("should return error if from is negative", function() {
        assert.throws(()=> {new Data("BTC",-10,20,[new Constant(40)])}, Error, "Value from must be positive");
    });

    it("should return error if until is negative", function() {
        assert.throws(()=> {new Data("BTC",10,-20,[new Constant(40)])}, Error, "Value until must be positive");
    });

    it("should return error if from is greater than until", function() {
        assert.throws(()=> {new Data("BTC",10,20,[new Constant(40)])}, Error, "Value from must be lower than until.");
    });

    it("should return Data type", function() {
        const data = new Data("BTC",50,20,[new Constant(40)]);
        assert.deepEqual(data.type, "DATA");
    });

    it("should convert number value to JSON", function() {
        const data = new Data("BTC",50,20,[new Constant(40),new Constant(50)]);
        assert.deepEqual(data.toJSON(), '{ "type":"DATA","symbol":"BTC","from":50,"until":20,"default":[{ "type":"CONSTANT","value":40 },{ "type":"CONSTANT","value":50 }] }');
    });

    it("should convert number value to JSON II", function() {
        const data = new Data("BTC",50,20,[]);
        assert.deepEqual(data.toJSON(), '{ "type":"DATA","symbol":"BTC","from":50,"until":20,"default":[] }');
    });

    it("should return error on execute if has no history and no default", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        market.setCoin("BTC",coin)
        const data = new Data("BTC",50,20,[]);
        assert.throws(()=> {data.execute(variables,market,wallet)}, Error);
    });

    it("should return default if has no history", function() {
        let variables = new Variables();
        let market = new Market();
        let wallet = new Wallet();
        let coin = new Coin("BTC")
        let constants = [new Constant(40),new Constant(50)]
        market.setCoin("BTC",coin)
        const data = new Data("BTC",50,20,constants);
        assert.deepEqual(data.execute(variables,market,wallet),[40,50])
    });

    it("should return the history I", function() {
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
        assert.deepEqual(data.execute(variables,market,wallet),[100,250])
    });

    it("should return the history II", function() {
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
        assert.deepEqual(data.execute(variables,market,wallet),[250,400])
    });

    it("should return the history III", function() {
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
        assert.deepEqual(data.execute(variables,market,wallet),[40,20])
    });


})