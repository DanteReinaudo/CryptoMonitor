import { Executer } from "../utils/executer";
import { Market } from "../context/market";
import { Variables } from "../context/variables";
import { Wallet } from "../context/wallet";
import { Value } from "./value";
import { Coin } from "../context/coin";
const MarketSchema = require('../schemas/market')

const TYPE = "DATA"
export class Data implements Value{
    type : string;
    private symbol : string; 
    private from : number; 
    private until: number;  
    private default: Value[];


    private validatePositive(value:number,where:string){
        if (value < 0){
            throw new Error('Value '.concat(where," must be positive"))
        }
    }

    private validateNumbers(from:number,until:number){
        this.validatePositive(from,"from")
        this.validatePositive(until,"until")
        if (from < until){
            throw new Error("Value from must be greater than until.")
        }
    }

    constructor(symbol: string,from:number,until:number,def: Value[]){
        this.type = TYPE
        this.symbol = symbol;
        this.validateNumbers(from,until)
        this.from = from;
        this.until = until;
        this.default = def;
    }

    toJSON(){
        let def = '"default":[';
        this.default.forEach((value : any, index : any) => {
            let final_symbol = ","
            if (index == this.default.length -1 ){
                final_symbol = "]";
            }
            def = def.concat(value.toJSON() ,final_symbol);
        });
        if (this.default.length == 0){
            def = '"default":[]'
        }
        return '{ "type":"'.concat(this.type,'","symbol":"',this.symbol,'","from":',this.from.toString(),',"until":',this.until.toString(),",",def, " }")
    }

    execute(variables:Variables, market: Market,wallet : Wallet){
        let coin = market.getCoin(this.symbol)
        if (coin == undefined){
            throw new Error('Coin: .'.concat(this.symbol, " not found on Market."))
        }

        let date = new Date()
        let from = coin.createTimeSince(this.from,date);
        let until = coin.createTimeSince(this.until,date);
        let values = coin.valuesByDateRange(from,until);

        if (values.length == 0 && this.default.length == 0){
            throw new Error("Data type has no value history and no default value. ")
        }

        if (values.length == 0){
            return this.execute_default(variables,market,wallet)
        } else  {
            return values
        }
    }

    execute_default(variables:Variables, market: Market,wallet : Wallet){
        let def: any[] =[];
        this.default.forEach((value : any, index : any) => {
            let executer = new Executer()
            def.push(executer.execute(value,variables,market,wallet))
        });
        return def 
    }

    async executeFromDataBase( userId:string){
        let coinSchema = await MarketSchema.findOne({coin: this.symbol, userId:userId}).lean()
        if (coinSchema){
            let coin = new Coin(coinSchema.coin)
            let date = new Date()
            coin.values = coinSchema.value
            coin.dates = coinSchema.date
            let from = coin.createTimeSince(this.from,date);
            let until = coin.createTimeSince(this.until,date);
            let values = coin.valuesByDateRange(from,until);

            if (values.length == 0 && this.default.length == 0){
                throw new Error("Data type has no value history and no default value. ")
            }
            if (values.length == 0){
                return await this.executeDefaultFromDataBase(userId)
            } else  {
                return values
            }
        } else {
            throw new Error('Coin: .'.concat(this.symbol, " not found on Market."))
        }
    }

    executeDefaultFromDataBase(userId:string){
        let def: any[] =[];
        this.default.forEach(async (value : any) => {
            await def.push(value.executeFromDataBase(userId))
        });
        return def 
    }
}