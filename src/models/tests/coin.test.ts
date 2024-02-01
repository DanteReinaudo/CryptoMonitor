const assert = require("assert");
const {describe} = require("mocha");
import {Coin} from '../classes/context/coin';

describe("coin",function(){

    it("should be a not null after create it", function() {
        const coin = new Coin("Crypto");
        assert.notDeepEqual(coin, null);
    });

    it("should be empty after create it", function() {
        const coin = new Coin("Crypto");
        assert.deepEqual(coin.isEmpty(), true);
    });

    it("should return 0 length after create it", function() {
        const coin = new Coin("Crypto");
        assert.deepEqual(coin.getValuesLength(), 0);
    });

    it("should return the name after create it", function() {
        const coin = new Coin("Crypto");
        assert.deepEqual(coin.getName(), "Crypto");
    });

    it("should return undefined from getCurrentValue if has no values", function() {
        const coin = new Coin("Crypto");
        let value = coin.getCurrentValue();
        assert.deepEqual(value, undefined);
    });

    it("should not be empty after adding a value", function() {
        const coin = new Coin("Crypto");
        coin.addValue(10,new Date())
        assert.deepEqual(coin.isEmpty(), false);
    });

    it("should not allow adding negative values", function() {
        const coin = new Coin("Crypto");
        assert.throws(() => {coin.addValue(-10,new Date()), Error, 'Coin value must be positive.'});
    });

    it("should return the value after adding a value", function() {
        const coin = new Coin("Crypto");
        let date = new Date();
        coin.addValue(10,date)
        assert.deepEqual(coin.getCurrentValue(), 10);
    });

    it("should return the date after adding a value", function() {
        const coin = new Coin("Crypto");
        let date = new Date();
        coin.addValue(10,date)
        assert.deepEqual(coin.getCurrentValueDate(), date);
    });

    it("should return the length after adding a value", function() {
        const coin = new Coin("Crypto");
        let date = new Date();
        coin.addValue(10,date)
        assert.deepEqual(coin.getValuesLength(), 1);
    });

    it("should return the lerngth after adding several values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(10,date1)
        coin.addValue(15,date2)
        coin.addValue(20,date3)
        assert.deepEqual(coin.getValuesLength(), 3);
    });

    it("should return the last value after adding several values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(10,date1)
        coin.addValue(15,date2)
        coin.addValue(20,date3)
        assert.deepEqual(coin.getCurrentValue(), 20);
    });

    it("should return the last date after adding several values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("1995-12-17T03:24:00");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(10,date1)
        coin.addValue(15,date2)
        coin.addValue(20,date3)
        assert.deepEqual(coin.getCurrentValueDate(), date3);
    });

    it("should return the min value after adding several values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(100,date1)
        coin.addValue(1000,date2)
        coin.addValue(205,date3)
        assert.deepEqual(coin.getMinValue(), 100);
    });

    it("should return the max value after adding several values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(100,date1)
        coin.addValue(15,date2)
        coin.addValue(20,date3)
        assert.deepEqual(coin.getMaxValue(), 100);
    });

    it("should return the mean after adding several values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(100,date1)
        coin.addValue(150,date2)
        coin.addValue(200,date3)
        assert.deepEqual(coin.getMeanValue(), 150);
    });

    it("should return undefined for a value in a Date with no values", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        coin.addValue(100,date1)
        assert.deepEqual(coin.getValueByDate(date2), undefined);
    });

    it("should return the value for a Date", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(100,date1)
        coin.addValue(150,date2)
        coin.addValue(200,date3)
        assert.deepEqual(coin.getValueByDate(date2), 150);
    });

    it("should return the max value for a range of dates", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        let date4 = new Date("2022-04-19");
        let date5 = new Date("2022-05-20");
        coin.addValue(100,date1)
        coin.addValue(10,date2)
        coin.addValue(20,date3)
        coin.addValue(50,date4)
        coin.addValue(200,date5)
        assert.deepEqual(coin.getMaxValueByDates(date2,date4), 50);
    });

    it("should return the min value for a range of dates", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        let date4 = new Date("2022-04-19");
        let date5 = new Date("2022-05-20");
        coin.addValue(100,date1)
        coin.addValue(10,date2)
        coin.addValue(20,date3)
        coin.addValue(50,date4)
        coin.addValue(200,date5)
        assert.deepEqual(coin.getMinValueByDates(date1,date2), 10);
    });

    it("should return the mean value for a range of dates", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-20");
        let date4 = new Date("2022-04-19");
        let date5 = new Date("2022-05-20");
        let date6 = new Date("2022-03-19");
        let date7 = new Date("2022-07-20");
        coin.addValue(100,date1)
        coin.addValue(10,date2)
        coin.addValue(250,date3)
        coin.addValue(150,date4)
        coin.addValue(200,date5)
        assert.deepEqual(coin.getMeanValueByDates(date6,date7), 200);
    });

    it("should return the mean value for the last 2 days", function() {
        const coin = new Coin("Crypto");
        let date1 = new Date("2022-03-16");
        let date2 = new Date("2022-03-17");
        let date3 = new Date("2022-03-18");
        coin.addValue(100,date1)
        coin.addValue(102,date1)
        coin.addValue(150,date2)
        coin.addValue(160,date2)
        coin.addValue(200,date3)
        coin.addValue(210,date3)
        coin.addValue(220,date3)
        assert.deepEqual(coin.getMeanValuesFromTheLastXDays(3,date3),[101,155,210]);
    });

    it("should return error if Days Ago is negative", function() {
        const coin = new Coin("Crypto");
        assert.throws(() => {coin.getMeanValuesFromTheLastXDays(-3,new Date()), Error, 'Days Ago value must be positive.'});
        
    });

    it("should return the mean value from 2 coins for the last 60 min", function() {
        const coin_1 = new Coin("Crypto1");
        const coin_2 = new Coin("Crypto2");

        //toma otro time zone, las 15 son las 18
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2022-09-19T15:15:00");
        let date3 = new Date("2022-09-19T15:34:00");
        let minutes = 60;

        //actual time tiene 19hs en vez de 16 porque toma otro time zone
        let actual_date = new Date("2022-09-19T16:00:00");
        coin_1.addValue(100,date1)
        coin_1.addValue(102,date2)
        coin_2.addValue(150,date1)
        coin_2.addValue(160,date3)

        assert.deepEqual(coin_1.getMeanValueFromOtherCoin(coin_2, minutes, actual_date), 8);
    });

    it("should return the mean value from 2 coins for the last 60 min but there is not enough values", function() {
        const coin_1 = new Coin("Crypto1");
        const coin_2 = new Coin("Crypto2");

        //toma otro time zone, las 15 son las 18
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2022-09-19T15:15:00");
        let minutes = 60;

        //actual time tiene 19hs en vez de 16 porque toma otro time zone
        let actual_date = new Date("2022-09-19T16:00:00");
        coin_1.addValue(100,date1)
        coin_2.addValue(150,date2)


        assert.throws(()=> {coin_1.getMeanValueFromOtherCoin(coin_2, minutes, actual_date)}, Error, 'Not enough values.');
    });


    it("should return error if the min_date is greater than the max_day on getMaxValuesByDate", function() {
        const coin = new Coin("Crypto1");
        //toma otro time zone, las 15 son las 18
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        assert.throws(()=> {coin.getMaxValueByDates(date2,date1)}, Error, 'Min date must be minor than Max Date.');
    });

    it("should return error if the min_date is greater than the max_day on getMinValuesByDate", function() {
        const coin = new Coin("Crypto1");
        //toma otro time zone, las 15 son las 18
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        assert.throws(()=> {coin.getMinValueByDates(date2,date1)}, Error, 'Min date must be minor than Max Date.');
    });

    it("should return error if the min_date is greater than the max_day on getMeanValuesByDate", function() {
        const coin = new Coin("Crypto1");
        //toma otro time zone, las 15 son las 18
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        assert.throws(()=> {coin.getMeanValueByDates(date2,date1)}, Error, 'Min date must be minor than Max Date.');
    });

    it("should not store values with lower significant change I", function() {
        const coin = new Coin("Crypto1");
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        coin.addValue(10,date1);
        coin.addValue(10,date2);
        assert.deepEqual(coin.getValuesLength(),1);
    });

    it("should not store values with lower significant change II", function() {
        const coin = new Coin("Crypto1");
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        coin.addValue(10,date1);
        coin.addValue(10,date2);
        assert.deepEqual(coin.getCurrentValueDate(),date1);
    });

    it("should convert to JSON  when is empty", function() {
        const coin = new Coin("Crypto")
        assert.deepEqual(coin.toJSON(),'{ "name":"Crypto","values":[] }');
    });

    it("should convert to JSON  when is full", function() {
        const coin = new Coin("Crypto")
        let date1 = new Date("2022-09-19T15:00:00");
        let date2 = new Date("2023-09-19T15:15:00");
        coin.addValue(10,date1);
        coin.addValue(15,date2);
        let expected = '{ "name":"Crypto","values":[{"value":10,"date":"'.concat(date1.toISOString(),'"},{"value":15,"date":"',date2.toISOString(),'"}] }')
        assert.deepEqual(coin.toJSON(),expected);
    
    });

    it("should set coin", function() {
        const coin = new Coin("Crypto")
        let date = [new Date("2022-09-19T15:00:00")];
        let value = [10];
        coin.dates = date
        coin.values= value
    
    });

})